import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';

type Seller = { 
	id: string
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


function SellItem(props: CartItemProps) {
	const removeFromCart = useSellingItems(state => state.removeSellingItem);

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
					${props.seller.price} <span>-{props.discount}%</span>
				</h2>
				<p>{props.seller.username}</p>
			</div>
			<div>
				<button onClick={deleteFromCart}>
					<img src="/icons/cancel.svg" alt="" />
				</button>
			</div>
		</article>
	);
}
export default SellItem;
