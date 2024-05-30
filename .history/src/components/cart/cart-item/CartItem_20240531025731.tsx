import './style.scss';
import useCartItems from '../../../hooks/useCartItems.zustand';

type CartItemProps = {
	id: string;
	image: string;
	name: string;
	category: string;
	price: number;
	market_price: number;
	discount: number;
};

function CartItem(props: CartItemProps) {
	const removeFromCart = useCartItems(state => state.removeCartItem);

	const deleteFromCart = ()=> {
		removeFromCart(props.id)
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
					${props.price} <span>-{props.discount}%</span>
				</h2>
				<p>Market Price: ${props.price}</p>
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
