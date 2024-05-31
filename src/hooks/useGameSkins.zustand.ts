import { create } from 'zustand';

type Seller = {
	id: string;
	username: string;
	gameCompany: string;
	price: number;
	walletAddress: string;
};
export type GameSkin = {
	idx: string;
	image: string;
	name: string;
	category: string;
	market_price: number;
	discount: number;
	seller: Seller;
};
interface GameSkinState {
	gameSkins: GameSkin[];
   setGameSkins:(items: GameSkin[]) => void;
}

const initialState = {
	gameSkins: [],
};

const useGameSkins = create<GameSkinState>()((set) => ({
	...initialState,
	setGameSkins: (item) =>
		set(() => ({ gameSkins: item })),
}));

export default useGameSkins;
