import { create } from 'zustand';

// Example data for initial state
const example = [
    {
        "idx": "8",
        "player_name": "Ajitesh",
        "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735696/gloves/r7yrw4h5ca16c3xpsk5c.avif",
        "name": "Gripmaster",
        "category": "gloves",
        "game_price": 12.474,
        "game": "Acme Games"
        },
        {
        "idx": "9",
        "player_name": "Ajitesh",
        "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735696/gloves/r7yrw4h5ca16c3xpsk5c.avif",
        "name": "RapidFire",
        "category": "gloves",
        "game_price": 57.0655,
        "game": "Epic Games"
        },
        {
        "idx": "10",
        "player_name": "Ajitesh",
        "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735695/gloves/ceghtmafqkhwzqsdyy1x.avif",
        "name": "Edge",
        "category": "gloves",
        "game_price": 9.486,
        "game": "Valve Corporation"
        },
        {
        "idx": "11",
        "player_name": "Ajitesh",
        "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735695/gloves/nwtbf1l3xom2qtglrzpn.avif",
        "name": "Silhouette",
        "category": "gloves",
        "game_price": 1.4658,
        "game": "Ubisoft"
        },
        {
        "idx": "12",
        "player_name": "Ajitesh",
        "image": "https://t.co/TJgdZUsASH",
        "name": "Shadowstrike",
        "category": "gloves",
        "game_price": 47.624,
        "game": "Blizzard Entertainment"
        },
        {
        "idx": "13",
        "player_name": "Ajitesh",
        "image": "https://t.co/oWPfaOxDiN",
        "name": "Phantom",
        "category": "gloves",
        "game_price": 37.7784,
        "game": "Riot Games"
        },
        {
        "idx": "14",
        "player_name": "Ajitesh",
        "image": "https://t.co/jT86aw51a8",
        "name": "Elfshadow",
        "category": "gloves",
        "game_price": 46.255,
        "game": "Electronic Arts"
        },
        {
        "idx": "15",
        "player_name": "Ajitesh",
        "image": "https://t.co/VPCxDaBdmI",
        "name": "IronHold",
        "category": "container",
        "game_price": 0.2388,
        "game": "Acme Games"
        },
        {
        "idx": "17",
        "player_name": "Ajitesh",
        "image": "https://t.co/jSSyLvNaGz",
        "name": "SteelCrate",
        "category": "container",
        "game_price": 12.5496,
        "game": "Epic Games"
        },
        {
        "idx": "18",
        "player_name": "Ajitesh",
        "image": "https://t.co/xeU1d8WHCN",
        "name": "TitanBox",
        "category": "container",
        "game_price": 18.4492,
        "game": "Valve Corporation"
        },
        {
        "idx": "19",
        "player_name": "Ajitesh",
        "image": "https://t.co/BbGPxIPIyH",
        "name": "HeavyDuty",
        "category": "container",
        "game_price": 13.8491,
        "game": "Ubisoft"
        },
        {
        "idx": "20",
        "player_name": "Ajitesh",
        "image": "https://t.co/mSztLTznHM",
        "name": "RuggedStore",
        "category": "container",
        "game_price": 8.2404,
        "game": "Blizzard Entertainment"
        },
        {
        "idx": "22",
        "player_name": "Ajitesh",
        "image": "https://t.co/sCSlKhD36o",
        "name": "CargoVault",
        "category": "container",
        "game_price": 5.181,
        "game": "Riot Games"
        },
        {
        "idx": "23",
        "player_name": "Ajitesh",
        "image": "https://t.co/sCSlKhD36o",
        "name": "GritBin",
        "category": "container",
        "game_price": 3.531,
        "game": "Electronic Arts"
        }
        ,
        {
        "idx": "24",
        "player_name": "Ajitesh",
        "image": "https://t.co/0VXByhBit8",
        "name": "CyberKey",
        "category": "key",
        "game_price": 3.293,
        "game": "Acme Games"
        },
        {
        "idx": "25",
        "player_name": "Ajitesh",
        "image": "https://t.co/e44Ch1D6yB",
        "name": "NanoKey",
        "category": "key",
        "game_price": 10.43,
        "game": "Epic Games"
        },
        {
        "idx": "26",
        "player_name": "Ajitesh",
        "image": "https://t.co/mSztLTznHM",
        "name": "QuantumKey",
        "category": "key",
        "game_price": 10.3005,
        "game": "Valve Corporation"
        },
        {
        "idx": "27",
        "player_name": "Ajitesh",
        "image": "https://t.co/mMxnoeYgVn",
        "name": "HoloKey",
        "category": "key",
        "game_price": 48.5364,
        "game": "Ubisoft"
        },
        {
        "idx": "28",
        "player_name": "Ajitesh",
        "image": "https://t.co/iHJuQSJB0p",
        "name": "MatrixKey",
        "category": "key",
        "game_price": 51.6768,
        "game": "Blizzard Entertainment"
        },
        {
        "idx": "29",
        "player_name": "Ajitesh",
        "image": "https://t.co/z3p8wWwxLT",
        "name": "DataKey",
        "category": "key",
        "game_price": 8.2404,
        "game": "Riot Games"
        },
        {
        "idx": "30",
        "player_name": "Ajitesh",
        "image": "https://t.co/Kr3ke7o1q5",
        "name": "TechKey",
        "category": "key",
        "game_price": 39.8474,
        "game": "Electronic Arts"
        }
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
