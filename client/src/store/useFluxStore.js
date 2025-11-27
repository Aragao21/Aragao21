import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFluxStore = create(
  persist(
    (set) => ({
      user: null,
      balance: 0,
      categories: [],
      setUser: (user) => set({ user }),
      setBalance: (balance) => set({ balance }),
      setCategories: (categories) => set({ categories })
    }),
    { name: 'flux-store' }
  )
);

export default useFluxStore;
