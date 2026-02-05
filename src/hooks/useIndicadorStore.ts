import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Indicador, IndicadorFormData } from '@/types/indicador';

interface IndicadorState {
  indicadores: Indicador[];
  addIndicador: (data: IndicadorFormData) => void;
  updateIndicador: (id: string, data: IndicadorFormData) => void;
  removeIndicador: (id: string) => void;
}

export const useIndicadorStore = create<IndicadorState>()(
  persist(
    (set) => ({
      indicadores: [],
      addIndicador: (data) =>
        set((state) => ({
          indicadores: [
            ...state.indicadores,
            { ...data, id: crypto.randomUUID() },
          ],
        })),
      updateIndicador: (id, data) =>
        set((state) => ({
          indicadores: state.indicadores.map((ind) =>
            ind.id === id ? { ...data, id } : ind
          ),
        })),
      removeIndicador: (id) =>
        set((state) => ({
          indicadores: state.indicadores.filter((ind) => ind.id !== id),
        })),
    }),
    {
      name: '@poa-hmsj:indicadores',
    }
  )
);
