import { create } from 'zustand';
import skinData from "../utils/skins.products.json";
export type CartItem = {
	id: string;
	name: string;
	price: number;
	img_url: string;
	discount: number;
	category: string;
};

interface CartItemState {
	cartItems: CartItem[];
	addCartItem: (item: CartItem) => void;
	removeCartItem: (id: string) => void;
}

const initialState = {
	cartItems: skinData["key"],
};

const useCartItems = create<CartItemState>()((set) => ({
	...initialState,
	addCartItem: (item) =>
		set((state) => ({ cartItems: [...state.cartItems, item] })),
	removeCartItem: (id) =>
		set((state) => {
			const newItems = state.cartItems.filter((item) => item.id !== id);
			return {
				cartItems: newItems,
			};
		}),
}));

export default useCartItems;
