import { CartItem } from '../hooks/useCartItems.zustand';

export function calculateDiscountedPrice(
	originalPrice: number,
	discountPercentage: number
) {
	// Calculate the discount amount
	const discountAmount = originalPrice * (discountPercentage / 100);

	// Calculate the discounted price
	const discountedPrice = originalPrice - discountAmount;

	return discountedPrice.toFixed(2);
}

export const addZero = (value: number) => (value < 10 ? `0${value}` : value);

export const totalPriceWithoutDiscount = (item: CartItem[]) => {
	return item.reduce((total, item) => total + item.seller.price, 0).toFixed(2);
};

export const totalDiscountedPrice = (item: CartItem[]) => {
	return item
		.reduce((total, item) => {
			const discountAmount = item.seller.price * (item.discount / 100);

			return total + discountAmount;
		}, 0)
		.toFixed(2);
};

export const totalPriceWithDiscount = (item: CartItem[]) => {
	return item
		.reduce((total, item) => {
			const discountAmount = item.seller.price * (item.discount / 100);
			const discountedPrice = item.seller.price - discountAmount;

			return total + discountedPrice;
		}, 0)
		.toFixed(2);
};
