import { create } from "zustand";

const useSearchStore = create((set) => ({
  search: { searchTerm: "", dateFrom: "", dateTo: "", guests: "1" },
  setSearchInput: (searchInput) => set(() => ({ search: searchInput })),
}));

function useSearch() {
  const search = useSearchStore((state) => state.search);
  const setSearchInput = useSearchStore((state) => state.setSearchInput);

  return { search, setSearchInput };
}

export default useSearch;
