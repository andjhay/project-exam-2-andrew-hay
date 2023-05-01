import { create } from "zustand";

const useUserStore = create((set) => ({
  user: [],
  setTheUser: (userData) => set(() => ({ user: userData })),
}));

/**
 * Zustand hook for storing users data for the session.
 */
function useUser() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setTheUser);

  return { user, setUser };
}

export default useUser;
