import './style.scss';

type CartItemProps = {
	id: string | number;
	image: string;
	name: string;
	category: string;
	price: number;
	market_price: number;
	discount: number;
};

function CartItem(props: CartItemProps) {
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
				<button>
					<img src="/icons/cancel.svg" alt="" />
				</button>
			</div>
		</article>
	);
}
export default CartItem;
