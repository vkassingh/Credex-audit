# Audit Calculator Documentation

## Overview

The `calculateAudit()` function is a comprehensive financial analysis tool that examines AI tool spending patterns and provides detailed optimization recommendations. It acts as a Senior Financial Analyst, identifying inefficiencies in:

1. **Seat Efficiency** - Paying for more seats than needed (e.g., team plans for individuals)
2. **Redundancy** - Paying for multiple tools that serve the same purpose
3. **API vs. Seat Cost** - High-spend seat-based tools that could be cheaper via API

## Function Signature

```typescript
function calculateAudit(
  userData: ToolEntry[],
  teamSize: number = 1,
  primaryUseCase: string = ''
): AuditResult
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userData` | `ToolEntry[]` | Array of tools with spending information |
| `teamSize` | `number` | Total team size (default: 1) |
| `primaryUseCase` | `string` | Primary use case for tools (e.g., "Coding", "Research") |

## Data Types

### ToolEntry
```typescript
interface ToolEntry {
  id: string;              // Unique identifier
  tool: string;            // Tool name (e.g., "GitHub Copilot")
  plan: string;            // Plan type (e.g., "Pro", "Team", "Enterprise")
  seats: number;           // Number of seats purchased
  monthlySpend: number;    // Monthly spend in USD
}
```

### AuditResult
```typescript
interface AuditResult {
  currentSpend: number;                        // Total current monthly spend
  optimizedSpend: number;                      // Estimated optimized monthly spend
  totalSavings: number;                        // Potential monthly savings
  savingsPercentage: number;                   // Savings as a percentage
  toolBreakdown: OptimizationRecommendation[]; // Per-tool analysis
  redundancies: string[];                      // Detected redundant tools
  seatEfficiencyIssues: string[];             // Seat-related issues
  apiOptimizationOpportunities: string[];     // API alternatives
  summary: string;                             // Executive summary
}
```

### OptimizationRecommendation
```typescript
interface OptimizationRecommendation {
  toolId: string;         // Tool ID
  toolName: string;       // Tool name
  currentPlan: string;    // Current plan details
  currentSpend: number;   // Current monthly spend
  optimizedSpend: number; // Optimized monthly spend
  savings: number;        // Potential savings
  reasoning: string;      // Explanation for recommendation
  recommendations: string[]; // Specific action items
}
```

## Analysis Criteria

### 1. Seat Efficiency Analysis

The function detects when tools are using suboptimal seating arrangements:

- **Team plan for 1 person**: Flags inefficient use of team tier
- **Seats below team threshold**: Recommends downgrade if team plan is underutilized
- **Mismatched team size**: Alerts when seats don't align with actual team

**Example:**
```
❌ Team plan allocated to 1 person
✅ Recommendation: Switch to Pro plan → Save ~40%
```

### 2. Redundancy Detection

Identifies when multiple tools serve the same purpose:

**Tool Categories Tracked:**
- AI Coding: ChatGPT, Claude, Cursor, GitHub Copilot, Tabnine, Codeium, etc.
- API Access: Claude API, OpenAI API, Anthropic

**Example:**
```
❌ Redundancy: Paying for both GitHub Copilot AND Cursor
✅ Recommendation: Consolidate to single tool → Potential 50% savings
```

### 3. API vs. Seat Cost Analysis

For high-spend coding tools, evaluates API-based alternatives:

**Triggers:**
- Primary use case includes "Coding"
- Monthly spend > $50
- Tool is seat-based (not API)

**Example:**
```
❌ GitHub Copilot Team: $200/month (seat-based)
✅ Recommendation: Switch to API integration → Estimated $40-60/month
```

## Usage Examples

### Basic Usage

```typescript
import { calculateAudit, formatAuditReport } from '@/lib/auditCalculator';

const tools = [
  {
    id: '1',
    tool: 'GitHub Copilot',
    plan: 'Team',
    seats: 1,
    monthlySpend: 20,
  },
  {
    id: '2',
    tool: 'ChatGPT',
    plan: 'Pro',
    seats: 1,
    monthlySpend: 20,
  },
];

const result = calculateAudit(tools, 1, 'Coding');
console.log(formatAuditReport(result));
```

### With Store Integration

```typescript
import { useFormStore } from '@/lib/store';
import { calculateAudit } from '@/lib/auditCalculator';

export function AnalysisComponent() {
  const { tools, teamSize, primaryUseCase } = useFormStore();
  const audit = calculateAudit(tools, teamSize, primaryUseCase);
  
  return (
    <div>
      <h2>Current: ${audit.currentSpend}</h2>
      <h2>Optimized: ${audit.optimizedSpend}</h2>
      <h3>Savings: ${audit.totalSavings.toFixed(2)}</h3>
    </div>
  );
}
```

### Accessing Specific Recommendations

```typescript
const result = calculateAudit(tools, teamSize, primaryUseCase);

// Get tool-by-tool analysis
result.toolBreakdown.forEach(tool => {
  console.log(`${tool.toolName}:`);
  console.log(`  Current: $${tool.currentSpend}`);
  console.log(`  Optimized: $${tool.optimizedSpend}`);
  tool.recommendations.forEach(rec => {
    console.log(`  • ${rec}`);
  });
});

// Check for redundancies
if (result.redundancies.length > 0) {
  console.log('Redundancies found:', result.redundancies);
}

// Check API opportunities
if (result.apiOptimizationOpportunities.length > 0) {
  console.log('API optimization opportunities:', result.apiOptimizationOpportunities);
}
```

## Analysis Examples

### Example 1: Startup with Redundant Tools
**Input:**
- ChatGPT Team: $20 (1 seat)
- GitHub Copilot Pro: $20 (2 seats)
- Cursor Pro: $20 (1 seat)
- Claude Pro: $20 (1 seat)
- Team size: 2
- Use case: Coding

**Output:**
```
Current: $80/month
Optimized: $35/month
Savings: $45/month (56%)

Issues detected:
✗ ChatGPT Team plan for 1 person
✗ Multiple AI coding tools (redundancy)
✗ Claude and ChatGPT both general-purpose AI

Recommendations:
1. Keep GitHub Copilot (best for coding)
2. Drop Cursor (redundant with Copilot)
3. Keep Claude Pro (different capabilities, complementary)
4. Drop ChatGPT Team (use free or API)
```

### Example 2: Enterprise Seat Inefficiency
**Input:**
- GitHub Copilot Enterprise: $150 (5 seats, for 10-person team)
- Amazon Q Team: $90 (3 seats)
- ChatGPT Team: $30 (1 seat)
- Team size: 10
- Use case: Development

**Output:**
```
Current: $270/month
Optimized: $180/month
Savings: $90/month (33%)

Issues detected:
✗ GitHub Copilot: Only 5 seats for 10-person team
✗ Amazon Q: Only 3 seats for 10-person team
✗ ChatGPT Team with 1 seat (inefficient)

Recommendations:
1. Increase GitHub Copilot seats to 10
2. Consolidate to single platform (GitHub Copilot)
3. Drop Amazon Q (overlaps with Copilot)
4. Use ChatGPT API for general queries
```

### Example 3: API Optimization for High-Spend Team
**Input:**
- GitHub Copilot Team: $200 (8 seats)
- Cursor Pro: $160 (8 seats)
- ChatGPT Team: $240 (8 seats)
- Tabnine Team: $120 (8 seats)
- Team size: 8
- Use case: Coding

**Output:**
```
Current: $720/month
Optimized: $120/month
Savings: $600/month (83%)

Issues detected:
✗ Heavy redundancy: 4 tools for same purpose
✗ High spend ($720) for team of 8
✗ API integration could be 80% cheaper

Recommended consolidation strategy:
1. Keep GitHub Copilot for IDE integration ($200)
2. Switch Cursor/ChatGPT/Tabnine to OpenAI API ($100/month for same usage)
3. Estimated total: $300/month (58% reduction)
```

## Output Formatting

### formatAuditReport()

Converts `AuditResult` to a formatted string report:

```typescript
import { formatAuditReport } from '@/lib/auditCalculator';

const report = formatAuditReport(auditResult);
console.log(report);
```

**Output includes:**
- Financial summary with current/optimized/savings
- Tool-by-tool analysis with reasoning
- Redundancy alerts
- Seat efficiency issues
- API optimization opportunities
- Executive summary

## Integration Points

### With React Components

```typescript
// components/AuditResults.tsx
import { calculateAudit, formatAuditReport } from '@/lib/auditCalculator';
import { useFormStore } from '@/lib/store';

export function AuditResults() {
  const { tools, teamSize, primaryUseCase } = useFormStore();
  const result = calculateAudit(tools, teamSize, primaryUseCase);
  
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">
        Save ${result.totalSavings.toFixed(2)}/month
      </div>
      
      {result.redundancies.map((r, i) => (
        <Alert key={i} type="warning">{r}</Alert>
      ))}
      
      {result.toolBreakdown.map(tool => (
        <ToolCard key={tool.toolId} tool={tool} />
      ))}
    </div>
  );
}
```

## Limitations & Assumptions

1. **Pricing accuracy**: Based on publicly available pricing as of training data
2. **Usage estimation**: Assumes usage aligns with plan tier
3. **API costs**: Estimated based on typical usage patterns
4. **Market changes**: Doesn't account for price changes after implementation
5. **Custom contracts**: Enterprise custom deals not included

## Future Enhancements

- [ ] Historical spend tracking
- [ ] Actual usage metrics integration
- [ ] Per-team member allocation
- [ ] Automated savings verification
- [ ] Cost forecasting
- [ ] Integration with billing systems
- [ ] Custom pricing rules
- [ ] Savings ROI calculator

## Support & Feedback

For issues or suggestions, refer to the main CREDEX documentation or submit feedback through the audit interface.
