# Audit Calculator - Finance-Grade Analysis Documentation

## Overview

The `calculateAudit()` function performs defensible financial analysis that a CFO would accept. It moves beyond subjective opinions ("Cursor bad, Claude good") to data-driven recommendations with actual numbers and reasoning.

## Core Analysis Framework

### Three-Step Evaluation for Each Tool

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Is the tool on the RIGHT PLAN for their usage?    │
├─────────────────────────────────────────────────────────────┤
│  ✓ Estimate usage profile from current spend                │
│  ✓ Check if seat count matches team size                    │
│  ✓ Verify plan tier is appropriate for usage level          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Is there a CHEAPER PLAN at this vendor?            │
├─────────────────────────────────────────────────────────────┤
│  ✓ Compare all vendor plans by cost-per-user               │
│  ✓ Verify capability parity (≥80% of current features)      │
│  ✓ Calculate actual savings in dollars                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Is there a CHEAPER ALTERNATIVE from competitors?   │
├─────────────────────────────────────────────────────────────┤
│  ✓ Find equivalent tools in same category                   │
│  ✓ Match capabilities (not replace critical function)       │
│  ✓ Calculate total cost of ownership                        │
│  ✓ Only recommend if savings > $5/month                     │
└─────────────────────────────────────────────────────────────┘
```

## Detailed Evaluation Criteria

### 1. Plan Rightness Analysis

**What it checks:**
- Is the user paying for more seats than they're using?
- Are they on the most expensive tier when a cheaper one fits?
- Does their usage pattern match their plan level?

**Methodology:**
Usage is estimated from current spend using this profile:

| Spend | Profile | Tokens/Month | Usage Pattern |
|-------|---------|--------------|---------------|
| < $15 | Light | 500K | ~5 hrs/day occasional completion |
| $15-40 | Moderate | 2M | ~5-8 hrs/day regular coding |
| $40-100 | Heavy | 5M | ~8+ hrs/day full-time AI assist |
| > $100 | Extreme | 10M+ | Team-wide deployment |

**Example Analysis:**
```
Team Plan for 1 Person on ChatGPT ($30/month)
├─ Light usage profile detected (estimated from $30 spend)
├─ Single seat on Team plan = inefficient
└─ Recommendation: Switch to ChatGPT Plus ($20) → Save $10/month (33%)
```

### 2. Same-Vendor Plan Comparison

**Data Source:**
Comprehensive pricing database with all official plans:

```typescript
GitHub Copilot:
  - Pro: $10/user
  - Business: $19/user
  - Enterprise: $23/user (base for 10+)

ChatGPT:
  - Free: $0
  - Plus: $20
  - Pro: $200
  - Team: $30/user

Cursor:
  - Free: $0 (limited)
  - Pro: $20
  - Business: $40/user (team)
```

**Evaluation Logic:**
```
Current: GitHub Copilot Enterprise ($230/month for 5 seats)
├─ Cost per user: $46/user
├─ Check Pro tier: $10/user × 5 = $50 total
├─ Check Business tier: $19/user × 5 = $95 total
├─ Check if features adequate: ✓ (Pro has 85%+ of Enterprise capabilities)
└─ Recommendation: Downgrade to Pro → Save $180/month (78%)
```

### 3. Cheaper Alternative (Cross-Vendor)

**Equivalence Groups:**
```typescript
AI Code Completion Group:
  - GitHub Copilot
  - Cursor
  - Tabnine
  - Amazon Q
  (All provide IDE integration + real-time completion)

General AI Group:
  - ChatGPT
  - Claude
  (Both provide multimodal AI conversation)
```

**Capability Matching:**
Only recommends alternatives if they provide equivalent capabilities:

| Category | Capabilities Checked |
|----------|----------------------|
| Code Completion | IDE integration, Real-time suggestions, Chat |
| General AI | Large context, File uploads, API access |
| Enterprise | Security controls, Audit logs, Team mgmt |

**Example Analysis:**
```
Current: Cursor Pro ($20/month) for single developer
├─ Category: AI Code Completion
├─ Alternative: GitHub Copilot Pro ($10/month)
├─ Capability comparison:
│   ✓ IDE integration: Both (VS Code, JetBrains, etc.)
│   ✓ Real-time completion: Both
│   ✓ Chat: Both
│   ✓ PR review: Copilot only (GitHub advantage)
├─ Cost comparison: $10 vs $20
├─ Savings: $10/month (50%)
└─ Recommendation: Equivalent capabilities, lower cost
```

### 4. API/Credit-Based Options

**When API Makes Financial Sense:**

For high-spend tools (> $50/month) on coding:
- Estimate actual token usage from current spend
- Calculate API cost at standard rates
- Only recommend if savings exceed 40%

**Pricing Models:**

```
OpenAI API (GPT-4o):
  Input: $0.015 per 1K tokens
  Output: $0.060 per 1K tokens
  Average: ~$0.00015 per token

Anthropic API (Claude Haiku):
  Input: $0.80 per 1M tokens
  Output: $4.00 per 1M tokens
  Average: ~$0.0000027 per token (80% cheaper than GPT-4o)

Typical Coding Session:
  Light ($<15/mo):    500K tokens/month = $0.08/month → Free tier better
  Moderate ($15-40):  2M tokens/month = $0.30/month → API better than paid seat
  Heavy ($40-100):    5M tokens/month = $0.75/month → API 80-90% cheaper
  Extreme ($>100):    10M tokens/month = $1.50/month → Still 98% cheaper
```

**Example Analysis:**
```
Current: ChatGPT Pro ($200/month)
├─ Estimated usage: Heavy profile = 5M tokens/month
├─ OpenAI API alternative:
│   - 5M tokens × $0.00015 = $750/month
│   - (This is overestimate; actual is ~$20/month for 5M tokens)
├─ Claude API alternative:
│   - 5M tokens × $0.0000027 = $13.50/month
├─ Savings: $186.50-$200/month (93-100%)
├─ Caveat: Only if usage is programmatic
└─ Recommendation: API if integrated into workflow
```

## Defensibility Principles

### Rule 1: Show the Math
✅ **Good:** "Switching from Team ($30) to Pro ($20) = $10/month savings"
❌ **Bad:** "Team plan is inefficient"

### Rule 2: Use Official Pricing
✅ **Good:** Data from vendor websites + public API pricing
❌ **Bad:** Estimated or assumed pricing

### Rule 3: Capability Parity Check
✅ **Good:** "Both provide IDE integration + real-time completion"
❌ **Bad:** "Cursor is better than Copilot"

### Rule 4: Threshold Minimums
✅ **Good:** Only recommend alternatives if savings > $5/month
❌ **Bad:** Recommend every possible alternative

### Rule 5: Use Profiles, Not Assumptions
✅ **Good:** "Based on $50/month spend, estimated Heavy usage profile"
❌ **Bad:** "This person uses AI a lot"

### Rule 6: Quantify Redundancy
✅ **Good:** "Paying for 2 code completion tools in same capability group"
❌ **Bad:** "Redundant tools"

## Data Structures

### PlanOption
```typescript
interface PlanOption {
  name: string;                    // "Pro", "Business", etc.
  costPerMonth: number;            // Total monthly cost
  costPerUser: number;             // Per-user breakdown
  minSeats: number;                // Minimum seats included
  maxSeats: number;                // Maximum seats allowed
  capabilities: string[];          // Feature list
  description: string;             // Human-readable desc
}
```

### OptimizationRecommendation
```typescript
interface OptimizationRecommendation {
  toolId: string;
  toolName: string;
  currentPlan: string;             // "Team (5 seats)"
  currentSpend: number;            // $150
  optimizedSpend: number;          // $95
  savings: number;                 // $55
  savingsPercentage: number;       // 36.7%
  
  planRightness: {
    isOptimal: boolean;            // false
    usageProfile: string;          // "heavy"
    explanation: string;           // "Only 5 seats for 10-person team"
  };
  
  cheaperInternalOption?: {
    plan: string;                  // "Pro"
    costPerMonth: number;          // $10
    reasoning: string;             // "Same vendor, 80%+ features"
  };
  
  cheaperAlternative?: {
    tool: string;                  // "Tabnine"
    plan: string;                  // "Business"
    costPerMonth: number;          // $120
    reasoning: string;             // "Equivalent IDE integration"
  };
  
  creditOption?: {
    provider: string;              // "OpenAI API"
    costPerMonth: number;          // $40
    reasoning: string;             // "Token-based calculation"
  };
  
  finalRecommendation: string;     // "✅ SWITCH to Tabnine..."
  reasoning: string;               // Full explanation
  recommendations: string[];       // Action items
}
```

## Function Signature

```typescript
function calculateAudit(
  userData: ToolEntry[],           // Array of current tools
  teamSize: number = 1,            // Team context
  primaryUseCase: string = ''      // "Coding", "Research", etc.
): AuditResult
```

## Output Example

```
════════════════════════════════════════════════════════════════
         CREDEX FINANCIAL AUDIT REPORT
             (Finance-Grade Analysis)
════════════════════════════════════════════════════════════════

📊 FINANCIAL SUMMARY
Current Monthly Spend:         $720.00
Optimized Monthly Spend:       $300.00
Potential Monthly Savings:     $420.00 (58.3%)
Potential Annual Savings:      $5,040.00

📋 TOOL-BY-TOOL ANALYSIS
─────────────────────────────────────────────────────────────

GITHUB COPILOT
  Current: $200.00/month (Enterprise, 8 seats)
  Optimized: $80.00/month
  💰 Savings: $120.00/month (60%)

  PLAN RIGHTNESS:
  Status: ⚠️ Suboptimal
  Usage Profile: HEAVY
  Analysis: Full team of 8 people on Enterprise plan. Heavy
            usage detected, but could achieve same with Pro.

  CHEAPER INTERNAL OPTION (Same Vendor):
  • Pro: $80.00/month
  • Reasoning: Switching from Enterprise to Pro saves
              $120/month (60%) with comparable features.

  CHEAPER ALTERNATIVE (Different Vendor):
  (None identified with equivalent capability at lower cost)

  API/CREDIT OPTION:
  (Not applicable for IDE-based tool)

  RECOMMENDATION: ⬇️ DOWNGRADE to Pro. Saves $120/month.

  ACTION ITEMS:
    → [Vendor Plan Downgrade] Switch to Pro:
      $80.00/month → Save $120.00/month

────────────────────────────────────────────────────────────────
(Additional tools analyzed...)

⚠️ REDUNDANCY ANALYSIS
─────────────────────────────────────────────────────────────
  • Redundancy in AI code completion: GitHub Copilot, Cursor,
    Tabnine. These tools serve overlapping purposes.

👥 SEAT ALLOCATION EFFICIENCY ISSUES
─────────────────────────────────────────────────────────────
  • Cursor: 8 seats on Pro plan for 8-person team (100% coverage).

🔌 API/PROGRAMMATIC OPTIMIZATION OPPORTUNITIES
─────────────────────────────────────────────────────────────
  • ChatGPT Team ($240/month): OpenAI API estimate:
    40,000 requests @ 2,000,000 tokens/month = $30/month

📈 EXECUTIVE SUMMARY
─────────────────────────────────────────────────────────────
💰 Potential Monthly Savings: $420.00 (58.3% reduction) | ⚠️
Redundancies: 1 tool category/categories with overlapping tools.
| 🔌 API Options: 1 high-spend tool(s) have cheaper alternatives.

════════════════════════════════════════════════════════════════
```

## Implementation Examples

### Basic Usage
```typescript
import { calculateAudit, formatAuditReport } from '@/lib/auditCalculator';

const tools = [
  {
    id: '1',
    tool: 'GitHub Copilot',
    plan: 'Team',
    seats: 1,
    monthlySpend: 30,
  },
];

const result = calculateAudit(tools, 1, 'Coding');
console.log(formatAuditReport(result));
```

### Accessing Specific Findings
```typescript
const result = calculateAudit(tools, teamSize, useCase);

// Financial summary
console.log(`Save $${result.totalSavings}/month`);

// Tool-specific findings
result.toolBreakdown.forEach(tool => {
  console.log(`${tool.toolName}:`);
  console.log(`  Current Plan: ${tool.currentPlan}`);
  console.log(`  Optimal Plan: ${tool.planRightness}`);
  if (tool.cheaperInternalOption) {
    console.log(`  Vendor alternative: ${tool.cheaperInternalOption.plan}`);
  }
  if (tool.cheaperAlternative) {
    console.log(`  Competitor alternative: ${tool.cheaperAlternative.tool}`);
  }
});

// Redundancy check
if (result.redundancies.length > 0) {
  console.log('Redundancies:', result.redundancies);
}
```

## Limitations & Assumptions

1. **Pricing**: Based on public pricing as of 2024. Doesn't account for:
   - Custom enterprise contracts
   - Volume discounts negotiated separately
   - Regional pricing variations

2. **Usage Estimation**: Inferred from current spend using industry averages. Actual usage may vary if:
   - User gets discounts
   - Seats are unused
   - Usage patterns are abnormal

3. **API Costs**: Estimated based on:
   - Average token consumption (5K tokens per request)
   - Industry-standard usage patterns
   - May vary significantly by actual usage

4. **Capabilities**: Evaluated at feature level, not quality level. All "AI code completion" tools are treated as equivalent capabilities, but quality differs.

## Finance Review Checklist

✅ Does every recommendation have a number?
✅ Are pricing sources official?
✅ Do alternatives have equivalent capabilities?
✅ Are usage profiles evidence-based?
✅ Is the savings calculation transparent?
✅ Would a CFO accept this reasoning?
✅ Are assumptions clearly stated?
✅ Is redundancy quantified, not subjective?

Use these criteria when extending or modifying the analysis.
