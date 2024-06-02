// import { create } from 'zustand';

// import Web3 from 'web3';
// import skinOwnershipABI from "../components/abis/skinOwnershipABI.json";

// // Example data for initial state
// const example = [
//     {
//         idx: "3",
//         player_name: "Ajitesh",
//         image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/n2hrhsy3gzu5ktrxa1ix.avif",
//         name: "Valkyrie",
//         category: "knife",
//         game_price: 7.89,
//         game: "Game A",
//     },
//     {
//         idx: "7",
//         player_name: "Shritesh",
//         image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/zduwdj9dkxuyonebkbnv.avif",
//         name: "MoonBlade",
//         category: "knife",
//         game_price: 42.89,
//         game: "Game B",
//     },
//     {
//         idx: "4",
//         player_name: "Devansh",
//         image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/ut2rzimqowkgmippyhl4.avif",
//         name: "Excalibur",
//         category: "knife",
//         game_price: 2.5,
//         game: "Game C",
//     },
//     {
//         idx: "8",
//         player_name: "Sebastian",
//         image: "https://res.cloudinary.com/duepebytx/image/upload/v1716735696/gloves/r7yrw4h5ca16c3xpsk5c.avif",
//         name: "Gripmaster",
//         category: "gloves",
//         game_price: 34.65,
//         game: "Game D",
//     }
// ];

// export type OrderItem = {
//     idx: string;
//     player_name: string;
//     image: string;
//     name: string;
//     category: string;
//     game_price: number;
//     game: string;
// };

// interface OrderItemState {
//     orderItems: OrderItem[];
//     addOrderItem: (item: OrderItem) => void;
//     removeOrderItem: (id: string) => void;
// }


// async function fetchUserSkins() {
//     const userName="Ajitesh";
//     const skinOwnershipAddress = "0x87931844BaCC9A19A7f43d0Bf02f616c2d73fA9A"; // Address from .env file
//     const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache
//     const skinOwnership = new web3.eth.Contract(skinOwnershipABI, skinOwnershipAddress);
//     try {
//         const skins = await skinOwnership.methods.getUserSkins(userName).call();
//         console.log("zustand skins : ",skins);
//         // setUserSkins(skins);
//     } catch (error) {
//         console.error("Error fetching user skins:", error);
//     }
    
//     //     // //when api done
//     //     // const url = `http://localhost:5001/${userName}`;
//     //     // const res = await axios.get(url);
//     //     // const data = res.data;
//     //     // console.log(data);
//     //     // setUserSkins(data);    
    
//     }

// //take player name and get his skins and then set orderItems
// const initialState = {
//     orderItems: example,
// };

// const useOrderItems = create<OrderItemState>((set) => ({
//     ...initialState,
//     addOrderItem: (item) =>
//         set((state) => ({ orderItems: [...state.orderItems, item] })),

//     removeOrderItem: (id) =>
//         set((state) => {
//             const newItems = state.orderItems.filter((item) => item.idx !== id);
//             return {
//                 orderItems: newItems,
//             };
//         }),
// }));

// export default useOrderItems;




//possible code----------------------------------------------------------------------------------------------------------------
import { create } from 'zustand';
import Web3 from 'web3';
import skinOwnershipABI from "../components/abis/skinOwnershipABI.json";

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
        idx: "1",
        player_name: "Devansh",
        image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/ut2rzimqowkgmippyhl4.avif",
        name: "Excalibur",
        category: "knife",
        game_price: 2.5,
        game: "Game C",
    },
    {
        idx: "2",
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

const useOrderItems = create<OrderItemState>((set) => ({
    orderItems: [],
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

export const fetchUserSkins = async (userName: string, skinOwnership: any) => {
    try {
        const skins = await skinOwnership.methods.getUserSkins(userName).call();
        console.log("zustand skins : ", skins);
        return skins; // Return the skin indices
    } catch (error) {
        console.error("Error fetching user skins:", error);
        return [];
    }
};

export const initialState = async () => {
    const userName = "Ajitesh";
    const skinOwnershipAddress = "0x87931844BaCC9A19A7f43d0Bf02f616c2d73fA9A"; // Address from .env file
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache
    const skinOwnership = new web3.eth.Contract(skinOwnershipABI, skinOwnershipAddress);

    const userSkins = await fetchUserSkins(userName, skinOwnership);
    console.log("userSkins: ",userSkins);

    example.map((x) => (x.idx==userSkins) ? {...x,"player_name": userName}: null);
    // const userOrderItems = example.filter(item => userSkins.includes(item.idx));
    // userOrderItems.forEach(item => useOrderItems.getState().addOrderItem(item));
};
