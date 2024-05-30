import { create } from 'zustand';

type Seller = { 
	id: string;
	username: string;
	gameCompany: string;
	price: number;
	walletAddress: string;
}
export type CartItem = {
	idx: string;
	image: string;
	name: string;
	category: string;
	market_price: number;
	discount: number;
	seller: Seller
};
interface CartItemState {
	cartItems: CartItem[];
	addCartItem: (item: CartItem) => void;
	removeCartItem: (id: string) => void;
}

const initialState = {
	cartItems: [],
};

const useCartItems = create<CartItemState>()((set) => ({
	...initialState,
	addCartItem: (item) =>
		set((state) => ({ cartItems: [...state.cartItems, item] })),
	removeCartItem: (id) =>
		set((state) => {
			const newItems = state.cartItems.filter((item) => item.idx !== id);
			return {
				cartItems: newItems,
			};
		}),

}));

export default useCartItems;
