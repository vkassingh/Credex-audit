import { ToolEntry } from './store';

/**
 * COMPREHENSIVE PRICING DATABASE
 * Source: Official vendor pricing as of 2024
 * All prices in USD per month
 */

interface PlanOption {
  name: string;
  costPerMonth: number;
  costPerUser: number; // For team plans, divided cost per user
  minSeats: number;
  maxSeats: number;
  capabilities: string[];
  description: string;
}

interface ToolPricing {
  vendor: string;
  category: string; // 'ai_code_completion', 'general_ai', 'specialized_coding'
  plans: Record<string, PlanOption>;
  creditOptions?: Record<string, { creditsPerMonth: number; costPerMonth: number }>;
}

const TOOL_PRICING_DATABASE: Record<string, ToolPricing> = {
  'GitHub Copilot': {
    vendor: 'GitHub',
    category: 'ai_code_completion',
    plans: {
      'Pro': {
        name: 'Pro',
        costPerMonth: 10,
        costPerUser: 10,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['IDE integration', 'Real-time code completion', 'PR review'],
        description: 'Individual plan',
      },
      'Business': {
        name: 'Business',
        costPerMonth: 19,
        costPerUser: 19,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Pro features', 'Audit logs', 'Team management'],
        description: 'Per-user business pricing',
      },
      'Enterprise': {
        name: 'Enterprise',
        costPerMonth: 230,
        costPerUser: 23,
        minSeats: 10,
        maxSeats: 999,
        capabilities: ['Business features', 'Priority support', 'Advanced security', 'Deployment options'],
        description: 'Base cost for 10 users, $23/user for additional',
      },
    },
  },
  'ChatGPT': {
    vendor: 'OpenAI',
    category: 'general_ai',
    plans: {
      'Free': {
        name: 'Free',
        costPerMonth: 0,
        costPerUser: 0,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['GPT-4o access', 'Basic usage limits'],
        description: 'Free tier with usage limits',
      },
      'Plus': {
        name: 'Plus',
        costPerMonth: 20,
        costPerUser: 20,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['GPT-4o priority', 'File uploads', 'Plugins', '10 messages/3h for advanced'],
        description: 'Individual plan',
      },
      'Pro': {
        name: 'Pro',
        costPerMonth: 200,
        costPerUser: 200,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Unlimited GPT-4o', 'Higher usage limits', 'Priority access'],
        description: 'High-usage individual plan',
      },
      'Team': {
        name: 'Team',
        costPerMonth: 30,
        costPerUser: 30,
        minSeats: 1,
        maxSeats: 999,
        capabilities: ['Team workspace', 'Admin controls', 'Billing management'],
        description: 'Per-user team pricing',
      },
    },
  },
  'Claude': {
    vendor: 'Anthropic',
    category: 'general_ai',
    plans: {
      'Free': {
        name: 'Free',
        costPerMonth: 0,
        costPerUser: 0,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Claude 3 access', 'Rate limited'],
        description: 'Free tier',
      },
      'Pro': {
        name: 'Pro',
        costPerMonth: 20,
        costPerUser: 20,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Higher rate limits', 'Priority access', 'Large file uploads'],
        description: 'Individual subscription',
      },
    },
  },
  'Cursor': {
    vendor: 'Cursor Inc',
    category: 'ai_code_completion',
    plans: {
      'Free': {
        name: 'Free',
        costPerMonth: 0,
        costPerUser: 0,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Basic code completion', 'Chat', '50 CPM/day limit'],
        description: 'Free tier with daily limits',
      },
      'Pro': {
        name: 'Pro',
        costPerMonth: 20,
        costPerUser: 20,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['500 CPM/day', 'Unlimited chat', 'Custom instructions'],
        description: 'Individual plan',
      },
      'Business': {
        name: 'Business',
        costPerMonth: 40,
        costPerUser: 40,
        minSeats: 1,
        maxSeats: 999,
        capabilities: ['Pro features', 'Team organization', 'Admin dashboard'],
        description: 'Per-user team plan',
      },
    },
  },
  'Tabnine': {
    vendor: 'Tabnine',
    category: 'ai_code_completion',
    plans: {
      'Free': {
        name: 'Free',
        costPerMonth: 0,
        costPerUser: 0,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Basic completion', 'Community model'],
        description: 'Free tier',
      },
      'Pro': {
        name: 'Pro',
        costPerMonth: 12,
        costPerUser: 12,
        minSeats: 1,
        maxSeats: 1,
        capabilities: ['Advanced models', 'Private code training'],
        description: 'Individual plan',
      },
      'Business': {
        name: 'Business',
        costPerMonth: 20,
        costPerUser: 20,
        minSeats: 1,
        maxSeats: 999,
        capabilities: ['Pro features', 'Team management', 'Usage analytics', 'Advanced security'],
        description: 'Per-user team plan',
      },
    },
  },
  'OpenAI API': {
    vendor: 'OpenAI',
    category: 'specialized_coding',
    plans: {
      'Pay-as-you-go': {
        name: 'Pay-as-you-go',
        costPerMonth: 0,
        costPerUser: 0,
        minSeats: 1,
        maxSeats: 999,
        capabilities: ['GPT-4o integration', 'Programmatic access', 'Pay per token'],
        description: 'API usage only, no minimum',
      },
    },
    creditOptions: {
      'monthly_budget': { creditsPerMonth: 3000, costPerMonth: 5 }, // $50/3000 credits
      'heavy_usage': { creditsPerMonth: 50000, costPerMonth: 500 }, // $500/50000 credits
    },
  },
  'Anthropic API': {
    vendor: 'Anthropic',
    category: 'specialized_coding',
    plans: {
      'Pay-as-you-go': {
        name: 'Pay-as-you-go',
        costPerMonth: 0,
        costPerUser: 0,
        minSeats: 1,
        maxSeats: 999,
        capabilities: ['Claude API access', 'Pay per token'],
        description: 'API usage only, no minimum',
      },
    },
  },
};

/**
 * Tool equivalence mapping
 * Tools that provide similar capabilities and can substitute for each other
 */
const TOOL_EQUIVALENCE: Record<string, string[]> = {
  'GitHub Copilot': ['Cursor', 'Tabnine', 'Codeium', 'Amazon Q'],
  'Cursor': ['GitHub Copilot', 'Tabnine'],
  'Tabnine': ['GitHub Copilot', 'Cursor'],
  'ChatGPT': ['Claude'],
  'Claude': ['ChatGPT'],
};

/**
 * Usage profiles for cost modeling
 */
interface UsageProfile {
  tokensPerMonth: number;
  description: string;
  estimatedMonthlyAPIUsageLimit: number;
}

const USAGE_PROFILES: Record<string, UsageProfile> = {
  'light': {
    tokensPerMonth: 500000, // ~5 hours/day
    description: 'Light usage: occasional code completion, ~5 hrs/day',
    estimatedMonthlyAPIUsageLimit: 5,
  },
  'moderate': {
    tokensPerMonth: 2000000, // ~5-8 hours/day
    description: 'Moderate usage: regular coding, 5-8 hrs/day',
    estimatedMonthlyAPIUsageLimit: 20,
  },
  'heavy': {
    tokensPerMonth: 5000000, // ~8+ hours/day
    description: 'Heavy usage: full-time AI-assisted coding, 8+ hrs/day',
    estimatedMonthlyAPIUsageLimit: 50,
  },
  'extreme': {
    tokensPerMonth: 10000000, // Team-wide usage
    description: 'Extreme usage: team-wide deployment',
    estimatedMonthlyAPIUsageLimit: 200,
  },
};

/**
 * Estimates actual usage based on spend and tool type
 */
function estimateUsageProfile(tool: ToolEntry, currentSpend: number): string {
  // Heuristic: map spend to usage profile
  if (currentSpend < 15) return 'light';
  if (currentSpend < 40) return 'moderate';
  if (currentSpend < 100) return 'heavy';
  return 'extreme';
}

/**
 * Calculates monthly API cost based on usage
 */
function calculateAPIAlternativeCost(
  tool: ToolEntry,
  apiType: 'openai' | 'anthropic',
  usageProfile: string
): { costPerMonth: number; reasoning: string } {
  const usage = USAGE_PROFILES[usageProfile];
  const avgTokensPerRequest = 5000; // Average request size
  const monthlyRequests = usage.tokensPerMonth / avgTokensPerRequest;

  let costPerToken = 0;
  let apiName = '';

  if (apiType === 'openai') {
    // GPT-4o pricing: $0.015 per 1K input tokens, $0.06 per 1K output tokens
    // Average 1:2 input:output ratio
    costPerToken = (0.015 + 0.06 * 2) / 3 / 1000; // ~$0.000145 per token
    apiName = 'OpenAI API';
  } else {
    // Claude 3 Haiku pricing: $0.80 per M input, $4.00 per M output
    costPerToken = (0.80 + 4.00 * 2) / 3 / 1000000; // ~$0.0000027 per token (using Haiku)
    apiName = 'Anthropic API (Claude)';
  }

  const estimatedMonthlyCost = usage.tokensPerMonth * costPerToken;

  return {
    costPerMonth: Math.max(5, Math.round(estimatedMonthlyCost * 100) / 100), // Min $5/month
    reasoning: `${apiName} estimate: ${monthlyRequests.toLocaleString()} requests @ ${usage.tokensPerMonth.toLocaleString()} tokens/month = $${Math.round(estimatedMonthlyCost * 100) / 100}/month`,
  };
}

/**
 * Finds cheaper plan within same vendor
 */
function findCheaperInternalPlan(
  tool: ToolEntry
): { plan: PlanOption; savings: number; reasoning: string } | null {
  const toolPricing = TOOL_PRICING_DATABASE[tool.tool];
  if (!toolPricing) return null;

  const currentPlan = toolPricing.plans[tool.plan];
  if (!currentPlan) return null;

  // Find the most feature-complete plan that's cheaper
  let bestAlternative: { plan: PlanOption; savings: number } | null = null;

  for (const [planName, plan] of Object.entries(toolPricing.plans)) {
    const costPerUser = plan.costPerUser * plan.minSeats;
    const currentCostPerUser = currentPlan.costPerUser * currentPlan.minSeats;

    if (costPerUser < currentCostPerUser && plan.capabilities.length >= currentPlan.capabilities.length * 0.8) {
      const savings = (currentCostPerUser - costPerUser) * tool.seats;

      if (!bestAlternative || savings > bestAlternative.savings) {
        bestAlternative = { plan, savings };
      }
    }
  }

  if (!bestAlternative) return null;

  const savingsAmount = bestAlternative.savings;
  const percentSavings = ((savingsAmount / tool.monthlySpend) * 100).toFixed(1);

  return {
    plan: bestAlternative.plan,
    savings: savingsAmount,
    reasoning: `Switching from ${tool.plan} to ${bestAlternative.plan.name} saves $${savingsAmount.toFixed(2)}/month (${percentSavings}%) with comparable features.`,
  };
}

/**
 * Finds cheaper alternative tool with capability matching
 */
function findCheaperAlternative(
  tool: ToolEntry,
  teamSize: number,
  primaryUseCase: string
): { alternative: string; plan: string; costPerMonth: number; savings: number; reasoning: string } | null {
  const alternatives = TOOL_EQUIVALENCE[tool.tool];
  if (!alternatives || alternatives.length === 0) return null;

  let bestAlternative:
    | { tool: string; plan: string; cost: number; savings: number; reasoning: string }
    | null = null;

  for (const altTool of alternatives) {
    const altPricing = TOOL_PRICING_DATABASE[altTool];
    if (!altPricing) continue;

    // Skip if not comparable category
    if (altPricing.category !== TOOL_PRICING_DATABASE[tool.tool]?.category) {
      // Allow general_ai to general_ai swaps
      const isGeneralAISwap =
        (TOOL_PRICING_DATABASE[tool.tool]?.category === 'general_ai' &&
          altPricing.category === 'general_ai') ||
        (TOOL_PRICING_DATABASE[tool.tool]?.category === 'ai_code_completion' &&
          altPricing.category === 'ai_code_completion');

      if (!isGeneralAISwap) continue;
    }

    // Find best applicable plan for alternative
    let bestPlan = Object.entries(altPricing.plans)
      .filter(([, plan]) => plan.minSeats <= tool.seats && plan.maxSeats >= tool.seats)
      .sort((a, b) => a[1].costPerMonth - b[1].costPerMonth)[0];

    if (!bestPlan) continue;

    const [planName, plan] = bestPlan;
    const totalCost = plan.costPerMonth;
    const savings = tool.monthlySpend - totalCost;

    const percentSavings = ((savings / tool.monthlySpend) * 100).toFixed(1);

    if (savings > 5 && (!bestAlternative || savings > bestAlternative.savings)) {
      bestAlternative = {
        tool: altTool,
        plan: planName,
        cost: totalCost,
        savings,
        reasoning: `${altTool} ${planName} ($${totalCost}/month) provides equivalent AI code completion capabilities. Savings: $${savings.toFixed(2)}/month (${percentSavings}%). Both tools offer IDE integration and real-time completion.`,
      };
    }
  }

  return bestAlternative
    ? {
        alternative: bestAlternative.tool,
        plan: bestAlternative.plan,
        costPerMonth: bestAlternative.cost,
        savings: bestAlternative.savings,
        reasoning: bestAlternative.reasoning,
      }
    : null;
}

export interface OptimizationRecommendation {
  toolId: string;
  toolName: string;
  currentPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  savings: number;
  savingsPercentage: number;
  planRightness: {
    isOptimal: boolean;
    usageProfile: string;
    explanation: string;
  };
  cheaperInternalOption?: {
    plan: string;
    costPerMonth: number;
    reasoning: string;
  };
  cheaperAlternative?: {
    tool: string;
    plan: string;
    costPerMonth: number;
    reasoning: string;
  };
  creditOption?: {
    provider: string;
    costPerMonth: number;
    reasoning: string;
  };
  finalRecommendation: string;
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
 * MAIN AUDIT FUNCTION
 * Comprehensive financial analysis with defensible reasoning
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
    const category = TOOL_PRICING_DATABASE[tool.tool]?.category || 'other';
    if (!toolsByCategory[category]) {
      toolsByCategory[category] = [];
    }
    toolsByCategory[category].push(tool);
    currentSpend += tool.monthlySpend;
  }

  // Detect redundancies
  for (const [category, tools] of Object.entries(toolsByCategory)) {
    if (tools.length > 1 && category !== 'other') {
      const toolNames = tools.map(t => t.tool).join(', ');
      const categoryDescription = {
        ai_code_completion: 'AI code completion',
        general_ai: 'General AI',
        specialized_coding: 'Specialized coding APIs',
      }[category] || category;

      redundancies.push(
        `Redundancy in ${categoryDescription}: ${toolNames}. These tools serve overlapping purposes.`
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
      toolsByCategory
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
        const usageProfile = estimateUsageProfile(tool, tool.monthlySpend);
        const apiCost = calculateAPIAlternativeCost(tool, 'openai', usageProfile);

        if (apiCost.costPerMonth < tool.monthlySpend * 0.6) {
          apiOptimizationOpportunities.push(
            `${tool.tool} ($${tool.monthlySpend}/month): ${apiCost.reasoning}`
          );
        }
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
 * Deep analysis of a single tool
 */
function analyzeTool(
  tool: ToolEntry,
  teamSize: number,
  primaryUseCase: string,
  allTools: ToolEntry[],
  toolsByCategory: Record<string, ToolEntry[]>
): OptimizationRecommendation {
  let optimizedSpend = tool.monthlySpend;
  let finalRecommendation = '';
  const recommendations: string[] = [];
  let mainReasoning = '';

  // 1. Determine if user is on right plan for their usage
  const usageProfile = estimateUsageProfile(tool, tool.monthlySpend);
  const usage = USAGE_PROFILES[usageProfile];
  let planRightness: OptimizationRecommendation['planRightness'] = {
    isOptimal: true,
    usageProfile,
    explanation: '',
  };

  const toolPricing = TOOL_PRICING_DATABASE[tool.tool];
  if (toolPricing) {
    const currentPlan = toolPricing.plans[tool.plan];
    if (currentPlan) {
      // Check if seats match team size
      const seatsPerUser = tool.seats / Math.max(1, teamSize);

      if (tool.seats === 1 && toolPricing.plans['Pro'] && tool.plan !== 'Pro') {
        planRightness = {
          isOptimal: false,
          usageProfile,
          explanation: `Single user on ${tool.plan} plan. Based on ${usage.description}, Pro plan would be more cost-effective.`,
        };
      } else if (tool.seats < teamSize * 0.3 && tool.plan.includes('Team')) {
        planRightness = {
          isOptimal: false,
          usageProfile,
          explanation: `Only ${tool.seats} seats allocated for ${teamSize}-person team (${((tool.seats / teamSize) * 100).toFixed(0)}%). Consider Individual or cheaper Team plan.`,
        };
      }
    }
  }

  // 2. Check for cheaper plan from same vendor
  const cheaperInternal = findCheaperInternalPlan(tool);
  if (cheaperInternal && cheaperInternal.savings > 0) {
    optimizedSpend = Math.max(0, optimizedSpend - cheaperInternal.savings);
    recommendations.push(
      `[Vendor Plan Downgrade] Switch to ${cheaperInternal.plan.name}: $${(cheaperInternal.plan.costPerMonth).toFixed(2)}/month → Save $${cheaperInternal.savings.toFixed(2)}/month`
    );
    mainReasoning += `Within ${tool.tool}: ${cheaperInternal.reasoning} `;
  }

  // 3. Check for cheaper alternative tool
  let cheaperAlt = findCheaperAlternative(tool, tool.seats, primaryUseCase);
  if (cheaperAlt && cheaperAlt.savings > 5) {
    recommendations.push(
      `[Alternative Tool] Switch to ${cheaperAlt.alternative} ${cheaperAlt.plan}: $${cheaperAlt.costPerMonth.toFixed(2)}/month → Save $${cheaperAlt.savings.toFixed(2)}/month`
    );
    mainReasoning += `Alternative available: ${cheaperAlt.reasoning} `;
    optimizedSpend = Math.min(optimizedSpend, cheaperAlt.costPerMonth);
  }

  // 4. Check credit-based options for high spend
  let creditOption: OptimizationRecommendation['creditOption'] | undefined;
  if (tool.monthlySpend > 50 && (tool.tool.includes('ChatGPT') || tool.tool.includes('Claude'))) {
    // For ChatGPT, might be better on API
    if (tool.tool === 'ChatGPT' && primaryUseCase.toLowerCase().includes('coding')) {
      const apiCost = calculateAPIAlternativeCost(tool, 'openai', usageProfile);
      if (apiCost.costPerMonth < tool.monthlySpend * 0.5) {
        creditOption = {
          provider: 'OpenAI API (Pay-as-you-go)',
          costPerMonth: apiCost.costPerMonth,
          reasoning: apiCost.reasoning,
        };
        recommendations.push(
          `[API Credits] Consider OpenAI API for programmatic access: $${apiCost.costPerMonth.toFixed(2)}/month (estimated based on usage)`
        );
        optimizedSpend = Math.min(optimizedSpend, apiCost.costPerMonth);
      }
    }
  }

  // Compile final recommendation
  const savings = tool.monthlySpend - optimizedSpend;
  const savingsPercentage = tool.monthlySpend > 0 ? (savings / tool.monthlySpend) * 100 : 0;

  if (savings > 0) {
    if (cheaperAlt) {
      finalRecommendation = `✅ SWITCH to ${cheaperAlt.alternative}. Saves $${savings.toFixed(2)}/month.`;
    } else if (cheaperInternal) {
      finalRecommendation = `⬇️ DOWNGRADE to ${cheaperInternal.plan.name}. Saves $${savings.toFixed(2)}/month.`;
    } else if (creditOption) {
      finalRecommendation = `🔌 SWITCH to API-based solution. Saves $${savings.toFixed(2)}/month.`;
    }
  } else {
    finalRecommendation = `✓ Current plan is optimal for your usage (${usageProfile}).`;
  }

  if (!mainReasoning) {
    mainReasoning = `${tool.tool} on ${tool.plan} with ${tool.seats} seat(s) appears appropriately matched to ${usageProfile} usage pattern.`;
  }

  return {
    toolId: tool.id,
    toolName: tool.tool,
    currentPlan: `${tool.plan} (${tool.seats} seat${tool.seats !== 1 ? 's' : ''})`,
    currentSpend: tool.monthlySpend,
    optimizedSpend: Math.round(optimizedSpend * 100) / 100,
    savings: Math.round(savings * 100) / 100,
    savingsPercentage: Math.round(savingsPercentage * 100) / 100,
    planRightness,
    cheaperInternalOption: cheaperInternal
      ? {
          plan: cheaperInternal.plan.name,
          costPerMonth: cheaperInternal.plan.costPerMonth,
          reasoning: cheaperInternal.reasoning,
        }
      : undefined,
    cheaperAlternative: cheaperAlt
      ? {
          tool: cheaperAlt.alternative,
          plan: cheaperAlt.plan,
          costPerMonth: cheaperAlt.costPerMonth,
          reasoning: cheaperAlt.reasoning,
        }
      : undefined,
    creditOption,
    finalRecommendation,
    reasoning: mainReasoning.trim(),
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
  const toolPricing = TOOL_PRICING_DATABASE[tool.tool];
  if (!toolPricing) return { issue: null, recommendation: null };

  const seatsPerUser = tool.seats / Math.max(1, teamSize);
  const seatsAsPercentOfTeam = ((tool.seats / teamSize) * 100).toFixed(0);

  // Single seat on multi-seat plan
  if (tool.seats === 1 && tool.plan.includes('Team')) {
    return {
      issue: `${tool.tool}: 1 seat on Team plan. Individual plan would be cheaper.`,
      recommendation: `Switch to individual plan tier.`,
    };
  }

  // Significant underfunding of team
  if (tool.seats < teamSize * 0.3 && tool.plan.includes('Team')) {
    return {
      issue: `${tool.tool}: ${tool.seats} seats for ${teamSize}-person team (${seatsAsPercentOfTeam}% coverage).`,
      recommendation: `Either fund full team (~${teamSize} seats) or reduce to individual plans.`,
    };
  }

  // Overfunded individual on expensive team plan
  if (tool.seats > teamSize + 3 && tool.plan.includes('Team')) {
    const extraSeats = tool.seats - teamSize;
    return {
      issue: `${tool.tool}: ${extraSeats} unused seats on Team plan.`,
      recommendation: `Reduce seat count to ${teamSize}.`,
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
    parts.push(`⚠️ Redundancies: ${redundancies.length} tool category/categories with overlapping tools.`);
  }

  if (seatEfficiencyIssues.length > 0) {
    parts.push(`👥 Seat Efficiency: ${seatEfficiencyIssues.length} mismatches detected.`);
  }

  if (apiOptimizations.length > 0) {
    parts.push(`🔌 API Options: ${apiOptimizations.length} high-spend tool(s) have cheaper alternatives.`);
  }

  if (parts.length === 0) {
    parts.push('✅ Your tool portfolio is well-optimized. No major inefficiencies detected.');
  }

  return parts.join(' | ');
}

/**
 * Formats the audit result for finance-grade reporting
 */
export function formatAuditReport(result: AuditResult): string {
  let report = '═══════════════════════════════════════════════════════════════\n';
  report += '          CREDEX FINANCIAL AUDIT REPORT\n';
  report += '              (Finance-Grade Analysis)\n';
  report += '═══════════════════════════════════════════════════════════════\n\n';

  report += `📊 FINANCIAL SUMMARY\n`;
  report += `Current Monthly Spend:         $${result.currentSpend.toFixed(2)}\n`;
  report += `Optimized Monthly Spend:       $${result.optimizedSpend.toFixed(2)}\n`;
  report += `Potential Monthly Savings:     $${result.totalSavings.toFixed(2)} (${result.savingsPercentage.toFixed(1)}%)\n`;
  report += `Potential Annual Savings:      $${(result.totalSavings * 12).toFixed(2)}\n\n`;

  report += `📋 TOOL-BY-TOOL ANALYSIS\n`;
  report += '───────────────────────────────────────────────────────────────\n';

  for (const tool of result.toolBreakdown) {
    report += `\n${tool.toolName.toUpperCase()}\n`;
    report += `  Current: $${tool.currentSpend.toFixed(2)}/month (${tool.currentPlan})\n`;
    report += `  Optimized: $${tool.optimizedSpend.toFixed(2)}/month\n`;

    if (tool.savings > 0) {
      report += `  💰 Savings: $${tool.savings.toFixed(2)}/month (${tool.savingsPercentage.toFixed(1)}%)\n`;
    }

    report += `\n  PLAN RIGHTNESS:\n`;
    report += `  Status: ${tool.planRightness.isOptimal ? '✅ Optimal' : '⚠️ Suboptimal'}\n`;
    report += `  Usage Profile: ${tool.planRightness.usageProfile.toUpperCase()}\n`;
    report += `  Analysis: ${tool.planRightness.explanation}\n`;

    if (tool.cheaperInternalOption) {
      report += `\n  CHEAPER INTERNAL OPTION (Same Vendor):\n`;
      report += `  • ${tool.cheaperInternalOption.plan}: $${tool.cheaperInternalOption.costPerMonth.toFixed(2)}/month\n`;
      report += `  • Reasoning: ${tool.cheaperInternalOption.reasoning}\n`;
    }

    if (tool.cheaperAlternative) {
      report += `\n  CHEAPER ALTERNATIVE (Different Vendor):\n`;
      report += `  • ${tool.cheaperAlternative.tool} (${tool.cheaperAlternative.plan}): $${tool.cheaperAlternative.costPerMonth.toFixed(2)}/month\n`;
      report += `  • Reasoning: ${tool.cheaperAlternative.reasoning}\n`;
    }

    if (tool.creditOption) {
      report += `\n  API/CREDIT OPTION:\n`;
      report += `  • ${tool.creditOption.provider}: $${tool.creditOption.costPerMonth.toFixed(2)}/month\n`;
      report += `  • Reasoning: ${tool.creditOption.reasoning}\n`;
    }

    report += `\n  RECOMMENDATION: ${tool.finalRecommendation}\n`;

    if (tool.recommendations.length > 0) {
      report += `\n  ACTION ITEMS:\n`;
      for (const rec of tool.recommendations) {
        report += `    → ${rec}\n`;
      }
    }
  }

  if (result.redundancies.length > 0) {
    report += `\n\n⚠️ REDUNDANCY ANALYSIS\n`;
    report += '───────────────────────────────────────────────────────────────\n';
    for (const redundancy of result.redundancies) {
      report += `  • ${redundancy}\n`;
    }
  }

  if (result.seatEfficiencyIssues.length > 0) {
    report += `\n\n👥 SEAT ALLOCATION EFFICIENCY ISSUES\n`;
    report += '───────────────────────────────────────────────────────────────\n';
    for (const issue of result.seatEfficiencyIssues) {
      report += `  • ${issue}\n`;
    }
  }

  if (result.apiOptimizationOpportunities.length > 0) {
    report += `\n\n🔌 API/PROGRAMMATIC OPTIMIZATION OPPORTUNITIES\n`;
    report += '───────────────────────────────────────────────────────────────\n';
    for (const opp of result.apiOptimizationOpportunities) {
      report += `  • ${opp}\n`;
    }
  }

  report += `\n\n📈 EXECUTIVE SUMMARY\n`;
  report += '───────────────────────────────────────────────────────────────\n';
  report += result.summary;
  report += '\n\n═══════════════════════════════════════════════════════════════\n';

  return report;
}

/**
 * Export tool pricing database for reference
 */
export function getToolPricingDatabase() {
  return TOOL_PRICING_DATABASE;
}

export function getToolEquivalence() {
  return TOOL_EQUIVALENCE;
}

export function getUsageProfiles() {
  return USAGE_PROFILES;
}
