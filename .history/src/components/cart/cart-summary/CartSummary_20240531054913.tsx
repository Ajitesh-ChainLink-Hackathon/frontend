import useCartItems from '../../../hooks/useCartItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';
import './style.scss';
import Web3 from "web3";
import skinMarketABI from '../../../abis/skinMarketABI.json';
import { useParams } from 'react-router-dom';

function CartSummary() {

	let skins;
	let connectedAccount;
	let sellers ;
	let seller;
	const skinMarketAdd = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Ganache address
	const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Ganache
	const { id } = useParams();
	const cartItems = useCartItems(state => state.cartItems);
	const actualPrice = totalPriceWithDiscount(cartItems);
	const totalPrice = totalPriceWithoutDiscount(cartItems);
	const totalDiscount = totalDiscountedPrice(cartItems);
	async function BuySkin(){


	}
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
      <button >Checkout</button>
		</article>
	);
}
export default CartSummary;
