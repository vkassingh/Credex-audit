import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ToolEntry {
  id: string;
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface FormState {
  tools: ToolEntry[];
  teamSize: number;
  primaryUseCase: string;
  addTool: (tool: Omit<ToolEntry, 'id'>) => void;
  removeTool: (id: string) => void;
  updateTool: (id: string, updates: Partial<ToolEntry>) => void;
  setTeamSize: (size: number) => void;
  setPrimaryUseCase: (useCase: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      tools: [],
      teamSize: 1,
      primaryUseCase: '',
      addTool: (tool) =>
        set((state) => ({
          tools: [...state.tools, { ...tool, id: Date.now().toString() }],
        })),
      removeTool: (id) =>
        set((state) => ({
          tools: state.tools.filter((t) => t.id !== id),
        })),
      updateTool: (id, updates) =>
        set((state) => ({
          tools: state.tools.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      setTeamSize: (size) => set({ teamSize: size < 1 ? 1 : size }),
      setPrimaryUseCase: (useCase) => set({ primaryUseCase: useCase }),
    }),
    {
      name: 'credex-audit-form',
      partialize: (state) => ({
        tools: state.tools,
        teamSize: state.teamSize,
        primaryUseCase: state.primaryUseCase,
      }),
    }
  )
);