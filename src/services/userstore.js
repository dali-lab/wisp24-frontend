import create from 'zustand';

const useStore = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
}));

export default useStore;
