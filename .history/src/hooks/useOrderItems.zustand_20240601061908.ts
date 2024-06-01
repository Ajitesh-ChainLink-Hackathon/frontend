import { create } from 'zustand';

// Example data for initial state
const example = [
    {
        idx: "6",
        player_name: "Ajitesh",
        image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/n2hrhsy3gzu5ktrxa1ix.avif",
        name: "Valkyrie",
        category: "knife",
        game_price: 7.89,
        game: "Game A",
    },
    {
        idx: "7",
        player_name: "Shritesh",
        image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/zduwdj9dkxuyonebkbnv.avif",
        name: "MoonBlade",
        category: "knife",
        game_price: 42.89,
        game: "Game B",
    },
    {
        idx: "4",
        player_name: "Devansh",
        image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/ut2rzimqowkgmippyhl4.avif",
        name: "Excalibur",
        category: "knife",
        game_price: 2.5,
        game: "Game C",
    },
    {
        idx: "8",
        player_name: "Sebastian",
        image: "https://res.cloudinary.com/duepebytx/image/upload/v1716735696/gloves/r7yrw4h5ca16c3xpsk5c.avif",
        name: "Gripmaster",
        category: "gloves",
        game_price: 34.65,
        game: "Game D",
    }
];

export type OrderItem = {
    idx: string;
    player_name: string;
    image: string;
    name: string;
    category: string;
    game_price: number;
    game: string;
};

interface OrderItemState {
    orderItems: OrderItem[];
    addOrderItem: (item: OrderItem) => void;
    removeOrderItem: (id: string) => void;
}

const initialState = {
    orderItems: example,
};

const useOrderItems = create<OrderItemState>((set) => ({
    ...initialState,
    addOrderItem: (item) =>
        set((state) => ({ orderItems: [...state.orderItems, item] })),
    removeOrderItem: (id) =>
        set((state) => {
            const newItems = state.orderItems.filter((item) => item.idx !== id);
            return {
                orderItems: newItems,
            };
        }),
}));

export default useOrderItems;
