import { create } from 'zustand';

// Example data for initial state
const example = [
   
];

export type SellingItem = {
    idx: string;
    player_name: string;
    image: string;
    name: string;
    category: string;
    game_price: number;
    game: string;
};

interface SellingItemState {
    sellingItems: SellingItem[];
    newSellingItem: SellingItem | null;
    setNewSellingItem: (item: SellingItem | null) => void;
    addSellingItem: (item: SellingItem) => void;
    removeSellingItem: (id: string) => void;
}

const initialState: Omit<SellingItemState, 'addSellingItem' | 'removeSellingItem' | 'setNewSellingItem'> = {
    sellingItems: example,
    newSellingItem: null,
};

const useSellingItems = create<SellingItemState>((set) => ({
    ...initialState,
    addSellingItem: (item) =>
        set((state) => ({ sellingItems: [...state.sellingItems, item] })),
    removeSellingItem: (id) =>
        set((state) => {
            const newItems = state.sellingItems.filter((item) => item.idx !== id);
            return {
                sellingItems: newItems,
            };
        }),
    setNewSellingItem: (item) => set(() => ({ newSellingItem: item })),
}));

export default useSellingItems;
