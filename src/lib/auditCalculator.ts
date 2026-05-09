import { ToolEntry } from './store';

/**
 * Financial Analysis Models for API pricing
 * Estimated monthly costs for API-based solutions
 */
const API_PRICING: Record<string, { baseCost: number; costPerUnit: number; description: string }> = {
  openai: { baseCost: 0, costPerUnit: 0.002, description: 'GPT-4 via API (~$0.002 per 1K tokens)' },
  anthropic: { baseCost: 0, costPerUnit: 0.003, description: 'Claude via API (~$0.003 per 1K tokens)' },
  generic_llm: { baseCost: 0, costPerUnit: 0.001, description: 'Generic LLM API (~$0.001 per 1K tokens)' },
};

/**
 * Categorization of tools by type for redundancy detection
 */
const TOOL_CATEGORIES: Record<string, string> = {
  'ChatGPT': 'ai_coding',
  'Claude': 'ai_coding',
  'Cursor': 'ai_coding',
  'Copilot': 'ai_coding',
  'GitHub Copilot': 'ai_coding',
  'Tabnine': 'ai_coding',
  'Codeium': 'ai_coding',
  'Replit': 'ai_coding',
  'Amazon Q': 'ai_coding',
  'JetBrains AI': 'ai_coding',
  'Mistral': 'ai_coding',
  'Gemini': 'ai_coding',
  'Claude API': 'api_access',
  'OpenAI API': 'api_access',
  'Anthropic': 'api_access',
};

/**
 * Team plan threshold (seats included in base price)
 */
const TEAM_PLAN_THRESHOLDS: Record<string, number> = {
  team: 3,
  enterprise: 10,
  organization: 5,
  starter: 1,
  pro: 1,
  premium: 1,
};

export interface OptimizationRecommendation {
  toolId: string;
  toolName: string;
  currentPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  savings: number;
  reasoning: string;
  recommendations: string[];
}

export interface AuditResult {
  currentSpend: number;
  optimizedSpend: number;
  totalSavings: number;
  savingsPercentage: number;
  toolBreakdown: OptimizationRecommendation[];
  redundancies: string[];
  seatEfficiencyIssues: string[];
  apiOptimizationOpportunities: string[];
  summary: string;
}

/**
 * Analyzes user data and provides financial optimization recommendations
 * @param userData - Array of tool entries with spend and configuration data
 * @param teamSize - Total team size for context
 * @param primaryUseCase - Primary use case for the tools
 * @returns Detailed audit with recommendations
 */
export function calculateAudit(
  userData: ToolEntry[],
  teamSize: number = 1,
  primaryUseCase: string = ''
): AuditResult {
  const toolBreakdown: OptimizationRecommendation[] = [];
  let currentSpend = 0;
  let optimizedSpend = 0;
  const redundancies: string[] = [];
  const seatEfficiencyIssues: string[] = [];
  const apiOptimizationOpportunities: string[] = [];

  // Track tools by category for redundancy detection
  const toolsByCategory: Record<string, ToolEntry[]> = {};

  // First pass: collect and categorize tools
  for (const tool of userData) {
    const category = TOOL_CATEGORIES[tool.tool] || 'other';
    if (!toolsByCategory[category]) {
      toolsByCategory[category] = [];
    }
    toolsByCategory[category].push(tool);
    currentSpend += tool.monthlySpend;
  }

  // Detect redundancies
  for (const [category, tools] of Object.entries(toolsByCategory)) {
    if (tools.length > 1) {
      const toolNames = tools.map(t => t.tool).join(', ');
      redundancies.push(
        `Redundancy detected in ${category}: paying for multiple tools (${toolNames})`
      );
    }
  }

  // Analyze each tool
  for (const tool of userData) {
    const analysis = analyzeTool(
      tool,
      teamSize,
      primaryUseCase,
      userData,
      redundancies.length > 0
    );

    toolBreakdown.push(analysis);
    optimizedSpend += analysis.optimizedSpend;
  }

  // Check for seat efficiency issues
  for (const tool of userData) {
    const seatAnalysis = analyzeSeatEfficiency(tool, teamSize);
    if (seatAnalysis.issue) {
      seatEfficiencyIssues.push(seatAnalysis.issue);
    }
  }

  // Check for API optimization opportunities
  for (const tool of userData) {
    if (primaryUseCase.toLowerCase().includes('coding') && tool.monthlySpend > 50) {
      const toolLower = tool.tool.toLowerCase();
      if (!toolLower.includes('api')) {
        apiOptimizationOpportunities.push(
          `${tool.tool} ($${tool.monthlySpend}/month): Consider switching to API-based solution for potentially 60-80% cost reduction if usage is primarily programmatic.`
        );
      }
    }
  }

  // Calculate summary
  const totalSavings = currentSpend - optimizedSpend;
  const savingsPercentage = currentSpend > 0 ? (totalSavings / currentSpend) * 100 : 0;

  const summary = generateSummary(
    totalSavings,
    savingsPercentage,
    redundancies,
    seatEfficiencyIssues,
    apiOptimizationOpportunities
  );

  return {
    currentSpend,
    optimizedSpend,
    totalSavings,
    savingsPercentage,
    toolBreakdown,
    redundancies,
    seatEfficiencyIssues,
    apiOptimizationOpportunities,
    summary,
  };
}

/**
 * Analyzes a single tool for optimization opportunities
 */
function analyzeTool(
  tool: ToolEntry,
  teamSize: number,
  primaryUseCase: string,
  allTools: ToolEntry[],
  hasRedundancies: boolean
): OptimizationRecommendation {
  const recommendations: string[] = [];
  let optimizedSpend = tool.monthlySpend;
  let reasoning = '';

  // 1. Check seat efficiency
  const planLower = tool.plan.toLowerCase();
  const seatThreshold = TEAM_PLAN_THRESHOLDS[planLower] || 1;

  if (tool.seats === 1 && planLower.includes('team')) {
    const savings = tool.monthlySpend * 0.4; // Estimate 40% savings by switching to individual plan
    optimizedSpend -= savings;
    recommendations.push(`Switch from Team plan to individual plan for single user (save ~$${savings.toFixed(2)}/month)`);
    reasoning += 'Seat efficiency issue: Paying for team capacity when only 1 seat is needed. ';
  }

  if (tool.seats < seatThreshold && planLower.includes('team')) {
    const savings = tool.monthlySpend * 0.3;
    optimizedSpend = Math.max(0, optimizedSpend - savings);
    recommendations.push(`Current seats (${tool.seats}) are below team plan threshold (${seatThreshold}). Consider downgrading plan.`);
    reasoning += 'Underutilized team seats. ';
  }

  // 2. Check for redundancy impact
  if (hasRedundancies) {
    const toolLower = tool.tool.toLowerCase();
    const isCodingTool = TOOL_CATEGORIES[tool.tool] === 'ai_coding';
    
    if (isCodingTool) {
      const otherCodingTools = allTools.filter(
        t => TOOL_CATEGORIES[t.tool] === 'ai_coding' && t.tool !== tool.tool
      );
      
      if (otherCodingTools.length > 0) {
        const redundancySavings = tool.monthlySpend * 0.5; // Could save 50% by consolidating
        optimizedSpend = Math.max(0, optimizedSpend - redundancySavings);
        recommendations.push(
          `Redundancy: Consolidate with ${otherCodingTools[0].tool}. This tool could be eliminated.`
        );
        reasoning += `Paying for multiple AI coding tools (${otherCodingTools.map(t => t.tool).join(', ')}). `;
      }
    }
  }

  // 3. Check API optimization for high-spend coding tools
  if (primaryUseCase.toLowerCase().includes('coding') && tool.monthlySpend > 50) {
    if (!tool.tool.toLowerCase().includes('api')) {
      const estimatedApiCost = Math.max(10, tool.monthlySpend * 0.2); // Estimate 20% of current cost
      const apiSavings = tool.monthlySpend - estimatedApiCost;
      
      recommendations.push(
        `API option: Switch to API-based alternative (estimated $${estimatedApiCost.toFixed(2)}/month vs current $${tool.monthlySpend}/month).`
      );
      reasoning += `High spend on seat-based plan ($${tool.monthlySpend}). API alternative could reduce cost by ~${((apiSavings / tool.monthlySpend) * 100).toFixed(0)}%. `;
      
      // Only apply this optimization if it's a significant saving
      if (apiSavings > tool.monthlySpend * 0.1) {
        optimizedSpend = estimatedApiCost;
      }
    }
  }

  // 4. General best practices
  if (tool.monthlySpend < 10) {
    recommendations.push('This is an affordable tool - maintain current plan unless redundant.');
  }

  if (!reasoning) {
    reasoning = `${tool.tool} on ${tool.plan} plan with ${tool.seats} seat(s) is appropriately sized for current usage.`;
  }

  const savings = tool.monthlySpend - optimizedSpend;

  return {
    toolId: tool.id,
    toolName: tool.tool,
    currentPlan: `${tool.plan} (${tool.seats} seat${tool.seats !== 1 ? 's' : ''})`,
    currentSpend: tool.monthlySpend,
    optimizedSpend: Math.round(optimizedSpend * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    reasoning: reasoning.trim(),
    recommendations,
  };
}

/**
 * Analyzes seat efficiency for a tool
 */
function analyzeSeatEfficiency(
  tool: ToolEntry,
  teamSize: number
): { issue: string | null; recommendation: string | null } {
  const planLower = tool.plan.toLowerCase();

  // Team plan with 1 person
  if (tool.seats === 1 && planLower.includes('team')) {
    return {
      issue: `${tool.tool}: Team plan allocated to 1 person. Consider individual plan.`,
      recommendation: 'Switch to individual/pro plan to reduce costs.',
    };
  }

  // Team plan but seats don't match team size
  if (planLower.includes('team') && tool.seats < teamSize * 0.5) {
    return {
      issue: `${tool.tool}: Team plan with only ${tool.seats} seats for a ${teamSize}-person team.`,
      recommendation: `Either increase seats to cover the team or downgrade to appropriate plan tier.`,
    };
  }

  // Enterprise for very small team
  if (planLower.includes('enterprise') && teamSize < 5) {
    return {
      issue: `${tool.tool}: Enterprise plan for a small team (${teamSize} people).`,
      recommendation: 'Consider stepping down to Team or Pro plan.',
    };
  }

  return { issue: null, recommendation: null };
}

/**
 * Generates a human-readable summary of the audit
 */
function generateSummary(
  totalSavings: number,
  savingsPercentage: number,
  redundancies: string[],
  seatEfficiencyIssues: string[],
  apiOptimizations: string[]
): string {
  const parts: string[] = [];

  if (totalSavings > 0) {
    parts.push(
      `💰 Potential Monthly Savings: $${totalSavings.toFixed(2)} (${savingsPercentage.toFixed(1)}% reduction)`
    );
  }

  if (redundancies.length > 0) {
    parts.push(
      `⚠️ Redundancies Found: ${redundancies.length} category/categories with duplicate tools. Consolidation recommended.`
    );
  }

  if (seatEfficiencyIssues.length > 0) {
    parts.push(
      `👥 Seat Efficiency Issues: ${seatEfficiencyIssues.length} tool(s) have suboptimal seating arrangements.`
    );
  }

  if (apiOptimizations.length > 0) {
    parts.push(
      `🔌 API Optimization Opportunities: ${apiOptimizations.length} high-cost tool(s) could benefit from API-based alternatives.`
    );
  }

  if (parts.length === 0) {
    parts.push('✅ Your tool portfolio is well-optimized. No major issues detected.');
  }

  return parts.join(' | ');
}

/**
 * Formats the audit result for display
 */
export function formatAuditReport(result: AuditResult): string {
  let report = '═══════════════════════════════════════════\n';
  report += '     CREDEX FINANCIAL AUDIT REPORT\n';
  report += '═══════════════════════════════════════════\n\n';

  report += `📊 FINANCIAL SUMMARY\n`;
  report += `Current Monthly Spend:    $${result.currentSpend.toFixed(2)}\n`;
  report += `Optimized Monthly Spend:  $${result.optimizedSpend.toFixed(2)}\n`;
  report += `Potential Monthly Savings: $${result.totalSavings.toFixed(2)} (${result.savingsPercentage.toFixed(1)}%)\n`;
  report += `Potential Annual Savings: $${(result.totalSavings * 12).toFixed(2)}\n\n`;

  report += `📋 TOOL-BY-TOOL ANALYSIS\n`;
  report += '───────────────────────────────────────────\n';
  for (const tool of result.toolBreakdown) {
    report += `\n${tool.toolName}\n`;
    report += `  Current: $${tool.currentSpend.toFixed(2)}/month (${tool.currentPlan})\n`;
    report += `  Optimized: $${tool.optimizedSpend.toFixed(2)}/month\n`;
    if (tool.savings > 0) {
      report += `  Savings: $${tool.savings.toFixed(2)}/month\n`;
    }
    report += `  Reasoning: ${tool.reasoning}\n`;
    if (tool.recommendations.length > 0) {
      report += `  Recommendations:\n`;
      for (const rec of tool.recommendations) {
        report += `    • ${rec}\n`;
      }
    }
  }

  if (result.redundancies.length > 0) {
    report += `\n⚠️ REDUNDANCY ALERTS\n`;
    report += '───────────────────────────────────────────\n';
    for (const redundancy of result.redundancies) {
      report += `  • ${redundancy}\n`;
    }
  }

  if (result.seatEfficiencyIssues.length > 0) {
    report += `\n👥 SEAT EFFICIENCY ISSUES\n`;
    report += '───────────────────────────────────────────\n';
    for (const issue of result.seatEfficiencyIssues) {
      report += `  • ${issue}\n`;
    }
  }

  if (result.apiOptimizationOpportunities.length > 0) {
    report += `\n🔌 API OPTIMIZATION OPPORTUNITIES\n`;
    report += '───────────────────────────────────────────\n';
    for (const opp of result.apiOptimizationOpportunities) {
      report += `  • ${opp}\n`;
    }
  }

  report += `\n📈 SUMMARY\n`;
  report += '───────────────────────────────────────────\n';
  report += result.summary;
  report += '\n\n═══════════════════════════════════════════\n';

  return report;
}
