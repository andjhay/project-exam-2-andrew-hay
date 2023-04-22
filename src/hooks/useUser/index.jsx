import { create } from "zustand";

const useUserStore = create((set) => ({
  user: [],
  setTheUser: (userData) => set(() => ({ user: userData })),
}));

function useUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setTheUser);

  return { user, setUser };
}

export default useUser;
