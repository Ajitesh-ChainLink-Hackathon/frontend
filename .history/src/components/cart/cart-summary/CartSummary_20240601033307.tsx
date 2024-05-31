import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';
import './style.scss';
import Web3 from "web3";
import skinMarketABI from '../../../abis/skinMarketABI.json';


function CartSummary() {
	const cartItems = useCartItems(state => state.cartItems);
	const actualPrice = totalPriceWithDiscount(cartItems);
	const totalPrice = totalPriceWithoutDiscount(cartItems);
	const totalDiscount = totalDiscountedPrice(cartItems);

	return (
		<article className="cart__summary">
			<h2>Cart Summary</h2>
			<div>
				<p>Total Skins</p>
				<p>{addZero(cartItems.length)}</p>
			</div>
			<div>
				<p>Subtotal</p>
				<p>${totalPrice}</p>
			</div>
			<div className='discount'>
				<p>Discount</p>
				<p>${totalDiscount}</p>
			</div>
			<div className="totals">
				<h2>Total</h2>
				<h2>${actualPrice}</h2>
			</div>
      <button>Checkout</button>
		</article>
	);
}
export default CartSummary;
