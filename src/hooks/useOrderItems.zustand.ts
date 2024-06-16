import { create } from 'zustand';


// const example = [
//     {
//     "idx": "8",
//     "player_name": "Ajitesh",
//     "image": "../../../assets/0.png",
//     "name": "Gripmaster",
//     "category": "gloves",
//     "game_price": 12.474,
//     "game": "Acme Games"
//     },
//     {
//     "idx": "9",
//     "player_name": "Ajitesh",
//     "image": "",
//     "name": "RapidFire",
//     "category": "gloves",
//     "game_price": 57.0655,
//     "game": "Epic Games"
//     },
//     {
//     "idx": "10",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735695/gloves/ceghtmafqkhwzqsdyy1x.avif",
//     "name": "Edge",
//     "category": "gloves",
//     "game_price": 9.486,
//     "game": "Valve Corporation"
//     },
//     {
//     "idx": "11",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735695/gloves/nwtbf1l3xom2qtglrzpn.avif",
//     "name": "Silhouette",
//     "category": "gloves",
//     "game_price": 1.4658,
//     "game": "Ubisoft"
//     },
//     {
//     "idx": "12",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735695/gloves/yngwhmfaxnbw94dcgutf.avif",
//     "name": "Shadowstrike",
//     "category": "gloves",
//     "game_price": 47.624,
//     "game": "Blizzard Entertainment"
//     },
//     {
//     "idx": "13",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735695/gloves/q5l4v7hja6wuylwhltkr.avif",
//     "name": "Phantom",
//     "category": "gloves",
//     "game_price": 37.7784,
//     "game": "Riot Games"
//     },
//     {
//     "idx": "14",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735694/gloves/xc93rgiiljfeaxpm16ch.avif",
//     "name": "Elfshadow",
//     "category": "gloves",
//     "game_price": 46.255,
//     "game": "Electronic Arts"
//     },
//     {
//     "idx": "15",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/b7w1egjwyhxkvxd54cdw.png",
//     "name": "IronHold",
//     "category": "container",
//     "game_price": 0.2388,
//     "game": "Acme Games"
//     },
//     {
//     "idx": "17",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/yy4pwk7srlcpgggr0mb2.png",
//     "name": "SteelCrate",
//     "category": "container",
//     "game_price": 12.5496,
//     "game": "Epic Games"
//     },
//     {
//     "idx": "18",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/y8anzuwxg2hma6rr5kgr.png",
//     "name": "TitanBox",
//     "category": "container",
//     "game_price": 18.4492,
//     "game": "Valve Corporation"
//     },
//     {
//     "idx": "19",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/ohdjxwaolkoyhrzjjdzw.png",
//     "name": "HeavyDuty",
//     "category": "container",
//     "game_price": 13.8491,
//     "game": "Ubisoft"
//     },
//     {
//     "idx": "20",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/ugd7fdpjtnifj3xqov6a.png",
//     "name": "RuggedStore",
//     "category": "container",
//     "game_price": 8.2404,
//     "game": "Blizzard Entertainment"
//     },
//     {
//     "idx": "22",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/zllemck3axo9k32xwrsu.png",
//     "name": "CargoVault",
//     "category": "container",
//     "game_price": 5.181,
//     "game": "Riot Games"
//     },
//     {
//     "idx": "23",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/zllemck3axo9k32xwrsu.png",
//     "name": "GritBin",
//     "category": "container",
//     "game_price": 3.531,
//     "game": "Electronic Arts"
//     }
//     ,
//     {
//     "idx": "24",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734281/key/l9ri2ofgswddovfnajq4.png",
//     "name": "CyberKey",
//     "category": "key",
//     "game_price": 3.293,
//     "game": "Acme Games"
//     },
//     {
//     "idx": "25",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734280/key/lhdkqrdafxchkfm3nz7s.png",
//     "name": "NanoKey",
//     "category": "key",
//     "game_price": 10.43,
//     "game": "Epic Games"
//     },
//     {
//     "idx": "26",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734258/container/ugd7fdpjtnifj3xqov6a.png",
//     "name": "QuantumKey",
//     "category": "key",
//     "game_price": 10.3005,
//     "game": "Valve Corporation"
//     },
//     {
//     "idx": "27",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734280/key/ikedbz9vj8afygyoetfc.png",
//     "name": "HoloKey",
//     "category": "key",
//     "game_price": 48.5364,
//     "game": "Ubisoft"
//     },
//     {
//     "idx": "28",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734280/key/phievafzr45aitnalvfb.png",
//     "name": "MatrixKey",
//     "category": "key",
//     "game_price": 51.6768,
//     "game": "Blizzard Entertainment"
//     },
//     {
//     "idx": "29",
//     "player_name": "Ajitesh",
//     "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734280/key/phievafzr45aitnalvfb.png",
//     "name": "DataKey",
//     "category": "key",
//     "game_price": 8.2404,
//     "game": "Riot Games"
//     }
// ];

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
    
//}

//take player name and get his skins and then set orderItems
const initialState = {
    orderItems: []
    //example,
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
