'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useFormStore } from '@/lib/store';
import { calculateAudit } from '@/lib/auditCalculator';

const AI_TOOLS = [
  'Cursor',
  'GitHub Copilot',
  'Claude',
  'ChatGPT',
  'Anthropic API',
  'OpenAI API',
  'Gemini',
  'Windsurf',
] as const;

const PLANS = {
  Cursor: ['Hobby', 'Pro', 'Business', 'Enterprise'],
  'GitHub Copilot': ['Individual', 'Business', 'Enterprise'],
  Claude: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API direct'],
  ChatGPT: ['Plus', 'Team', 'Enterprise', 'API direct'],
  'Anthropic API': ['API direct'],
  'OpenAI API': ['API direct'],
  Gemini: ['Pro', 'Ultra', 'API'],
  Windsurf: ['Free', 'Pro', 'Teams', 'Enterprise'],
} as const;

const USE_CASES = ['coding', 'writing', 'data', 'research', 'mixed'] as const;

type FormValues = {
  tool: string;
  plan: string;
  seats: string;
  monthlySpend: string;
};

export default function SpendInputForm() {
  const {
    tools,
    teamSize,
    primaryUseCase,
    addTool,
    removeTool,
    setTeamSize,
    setPrimaryUseCase,
  } = useFormStore();

  const { register, handleSubmit, reset, watch } = useForm<FormValues>();
  const selectedTool = watch('tool');

  const totalMonthly = useMemo(
    () => tools.reduce((sum, tool) => sum + tool.monthlySpend, 0),
    [tools]
  );

  const totalAnnual = useMemo(() => totalMonthly * 12, [totalMonthly]);

  const audit = useMemo(
    () => calculateAudit(tools, teamSize, primaryUseCase),
    [tools, teamSize, primaryUseCase]
  );

  const topRecommendations = useMemo(
    () =>
      audit.toolBreakdown
        .filter((tool) => tool.savings > 0)
        .sort((a, b) => b.savings - a.savings)
        .slice(0, 4),
    [audit.toolBreakdown]
  );

  const onSubmit = (data: FormValues) => {
    addTool({
      tool: data.tool as (typeof AI_TOOLS)[number],
      plan: data.plan,
      seats: Number(data.seats),
      monthlySpend: Number(data.monthlySpend),
    });
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">AI Tool Spend Audit</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Team Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-medium">Team Size</span>
                <input
                  type="number"
                  min="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value) || 1)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium">Primary Use Case</span>
                <select
                  value={primaryUseCase}
                  onChange={(e) => setPrimaryUseCase(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                >
                  <option value="">Select use case</option>
                  {USE_CASES.map((useCase) => (
                    <option key={useCase} value={useCase}>
                      {useCase.charAt(0).toUpperCase() + useCase.slice(1)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Add AI Tool</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium">AI Tool</span>
                  <select
                    {...register('tool', { required: true })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  >
                    <option value="">Select tool</option>
                    {AI_TOOLS.map((tool) => (
                      <option key={tool} value={tool}>
                        {tool}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Plan</span>
                  <select
                    {...register('plan', { required: true })}
                    disabled={!selectedTool}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <option value="">Select plan</option>
                    {selectedTool && PLANS[selectedTool as keyof typeof PLANS]?.map((plan) => (
                      <option key={plan} value={plan}>
                        {plan}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Seats</span>
                  <input
                    type="number"
                    min="1"
                    {...register('seats', { required: true, min: 1 })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium">Monthly Spend ($)</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('monthlySpend', { required: true, min: 0 })}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
              >
                Add Tool
              </button>
            </form>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-3">Spend Snapshot</h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Team size</span>
                <strong>{teamSize}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Primary use case</span>
                <strong>{primaryUseCase || 'Not selected'}</strong>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span>Total monthly spend</span>
                <strong>${totalMonthly.toFixed(2)}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated annual spend</span>
                <strong>${totalAnnual.toFixed(2)}</strong>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-3">Instant Audit</h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Potential savings</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  ${audit.totalSavings.toFixed(2)}
                </p>
                <p className="text-slate-500">${(audit.totalSavings * 12).toFixed(2)} annual</p>
              </div>

              {tools.length === 0 ? (
                <p className="text-slate-500">Add tools to see overspending and recommendations instantly.</p>
              ) : (
                <div className="space-y-3">
                  <p className="font-semibold">Where you're overspending</p>
                  {topRecommendations.length === 0 ? (
                    <p className="text-slate-500">No immediate overspending detected. Review redundancy and seat usage.</p>
                  ) : (
                    <ul className="space-y-3">
                      {topRecommendations.map((tool) => (
                        <li key={tool.toolId} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{tool.toolName}</p>
                              <p className="mt-1 text-xs text-slate-500">{tool.currentPlan} · ${tool.currentSpend.toFixed(2)}/month</p>
                            </div>
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                              Save ${tool.savings.toFixed(2)}
                            </span>
                          </div>
                          <p className="mt-3 text-sm text-slate-600">{tool.finalRecommendation}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {audit.redundancies.length > 0 && (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-semibold text-amber-900">Redundancy alert</p>
                  <p className="mt-2 text-sm text-amber-800">{audit.redundancies[0]}</p>
                </div>
              )}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Your AI Tools</h2>
        {tools.length === 0 ? (
          <p className="text-slate-500">No tools added yet. Use the form above to create your audit inputs.</p>
        ) : (
          tools.map((tool) => (
            <div key={tool.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Tool</p>
                    <p className="mt-1 text-base font-semibold">{tool.tool}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Plan</p>
                    <p className="mt-1 text-base">{tool.plan}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Seats</p>
                    <p className="mt-1 text-base">{tool.seats}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">Monthly spend</p>
                    <p className="mt-1 text-base font-semibold">${tool.monthlySpend.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeTool(tool.id)}
                  className="self-start rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 md:self-center"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
