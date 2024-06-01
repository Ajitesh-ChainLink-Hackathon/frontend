import { create } from 'zustand';

import Web3 from 'web3';

// Example data for initial state
const example = [
    {
        idx: "3",
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


async function fetchUserSkins() {
    
        const skinOwnership = new web3.eth.Contract(skinOwnershipABI, skinOwnershipAddress);
    //     try {
    //       const skins = await skinOwnership.methods.getUserSkins(userName).call();
    //       setUserSkins(skins);
    //     } catch (error) {
    //       console.error("Error fetching user skins:", error);
    //     }
    
    //     // //when api done
    //     // const url = `http://localhost:5001/${userName}`;
    //     // const res = await axios.get(url);
    //     // const data = res.data;
    //     // console.log(data);
    //     // setUserSkins(data);    
    
    }

//take player name and get his skins and then set orderItems
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

