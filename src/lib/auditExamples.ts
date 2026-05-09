import { calculateAudit, formatAuditReport, type AuditResult } from '@/lib/auditCalculator';
import { type ToolEntry } from '@/lib/store';

/**
 * Example usage of the calculateAudit function
 * This demonstrates how to use the financial analysis tool
 */

// Example 1: Startup with redundant AI tools
const startupToolsExample: ToolEntry[] = [
  {
    id: '1',
    tool: 'ChatGPT',
    plan: 'Team',
    seats: 1,
    monthlySpend: 20,
  },
  {
    id: '2',
    tool: 'GitHub Copilot',
    plan: 'Pro',
    seats: 2,
    monthlySpend: 20,
  },
  {
    id: '3',
    tool: 'Cursor',
    plan: 'Pro',
    seats: 1,
    monthlySpend: 20,
  },
  {
    id: '4',
    tool: 'Claude',
    plan: 'Pro',
    seats: 1,
    monthlySpend: 20,
  },
];

// Example 2: Enterprise with seat efficiency issues
const enterpriseToolsExample: ToolEntry[] = [
  {
    id: '1',
    tool: 'GitHub Copilot',
    plan: 'Enterprise',
    seats: 5,
    monthlySpend: 150,
  },
  {
    id: '2',
    tool: 'Amazon Q',
    plan: 'Team',
    seats: 3,
    monthlySpend: 90,
  },
  {
    id: '3',
    tool: 'ChatGPT',
    plan: 'Team',
    seats: 1,
    monthlySpend: 30,
  },
];

// Example 3: High-spend development team with API opportunity
const highSpendDevTeamExample: ToolEntry[] = [
  {
    id: '1',
    tool: 'GitHub Copilot',
    plan: 'Team',
    seats: 8,
    monthlySpend: 200,
  },
  {
    id: '2',
    tool: 'Cursor',
    plan: 'Pro',
    seats: 8,
    monthlySpend: 160,
  },
  {
    id: '3',
    tool: 'ChatGPT',
    plan: 'Team',
    seats: 8,
    monthlySpend: 240,
  },
  {
    id: '4',
    tool: 'Tabnine',
    plan: 'Team',
    seats: 8,
    monthlySpend: 120,
  },
];

/**
 * Run audit example
 */
export function runAuditExamples(): void {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║          CREDEX AUDIT CALCULATOR - EXAMPLE USAGE               ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝');

  // Example 1
  console.log('\n\n📌 EXAMPLE 1: Startup with Redundant AI Tools');
  console.log('─────────────────────────────────────────────────────');
  const startupAudit = calculateAudit(startupToolsExample, 2, 'Coding');
  console.log(formatAuditReport(startupAudit));

  // Example 2
  console.log('\n\n📌 EXAMPLE 2: Enterprise with Seat Efficiency Issues');
  console.log('─────────────────────────────────────────────────────');
  const enterpriseAudit = calculateAudit(enterpriseToolsExample, 10, 'Development');
  console.log(formatAuditReport(enterpriseAudit));

  // Example 3
  console.log('\n\n📌 EXAMPLE 3: High-Spend Development Team');
  console.log('─────────────────────────────────────────────────────');
  const devTeamAudit = calculateAudit(highSpendDevTeamExample, 8, 'Coding');
  console.log(formatAuditReport(devTeamAudit));

  // Quick comparison
  console.log('\n\n📊 QUICK COMPARISON');
  console.log('─────────────────────────────────────────────────────');
  console.log(`Startup Example:`);
  console.log(`  Current: $${startupAudit.currentSpend.toFixed(2)}/month`);
  console.log(`  Optimized: $${startupAudit.optimizedSpend.toFixed(2)}/month`);
  console.log(`  Savings: $${startupAudit.totalSavings.toFixed(2)}/month (${startupAudit.savingsPercentage.toFixed(1)}%)`);

  console.log(`\nEnterprise Example:`);
  console.log(`  Current: $${enterpriseAudit.currentSpend.toFixed(2)}/month`);
  console.log(`  Optimized: $${enterpriseAudit.optimizedSpend.toFixed(2)}/month`);
  console.log(`  Savings: $${enterpriseAudit.totalSavings.toFixed(2)}/month (${enterpriseAudit.savingsPercentage.toFixed(1)}%)`);

  console.log(`\nDev Team Example:`);
  console.log(`  Current: $${devTeamAudit.currentSpend.toFixed(2)}/month`);
  console.log(`  Optimized: $${devTeamAudit.optimizedSpend.toFixed(2)}/month`);
  console.log(`  Savings: $${devTeamAudit.totalSavings.toFixed(2)}/month (${devTeamAudit.savingsPercentage.toFixed(1)}%)`);
}

/**
 * Integration with store example
 * Shows how to use calculateAudit with real store data
 */
export function auditFromStoreData(
  storeTools: ToolEntry[],
  teamSize: number,
  primaryUseCase: string
): AuditResult {
  return calculateAudit(storeTools, teamSize, primaryUseCase);
}

// Export examples for testing
export { startupToolsExample, enterpriseToolsExample, highSpendDevTeamExample };
