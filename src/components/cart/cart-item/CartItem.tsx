import './style.scss';
import useCartItems from '../../../hooks/useCartItems.zustand';
import { usdPrice } from '../../../utils/getEthUsd';

type Seller = { 
	username: string;
	gameCompany: string;
	price: number;
	walletAddress: string;
}
type CartItemProps = {
	idx: string;
	image: string;
	name: string;
	category: string;
	market_price: number;
	discount: number;
	seller: Seller
};

function CartItem(props: CartItemProps) {
	const removeFromCart = useCartItems(state => state.removeCartItem);

	const deleteFromCart = ()=> {
		removeFromCart(props.idx)
	}

	return (
		<article className="cart__item">
			<div className="skin">
				<img src={props.image} alt={props.name} />
				<div>
					<h2>{props.name}</h2>
					<div>
						<img src="/icons/trade.svg" alt="" />
						<p>Tradable</p>
					</div>
				</div>
			</div>
			<p className="category">{props.category}</p>
			<div className="price">
				<h2>
					${props.seller.price *(usdPrice?Number(usdPrice):0)/1000000000000000000} <span>-{props.discount}%</span>
				</h2>
				<p>Market Price: ${2}</p>
			</div>
			<div>
				<button onClick={deleteFromCart}>
					<img src="/icons/cancel.svg" alt="" />
				</button>
			</div>
		</article>
	);
}
export default CartItem;
