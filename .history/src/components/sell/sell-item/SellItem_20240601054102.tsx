import './style.scss';
import useSellingItems, { SellingItem } from '../../../hooks/useSellingItems.zustand';

function SellItem(props: SellingItem) {
	const removeFromCart = useSellingItems(state => state.removeSellingItem);

	const deleteFromCart = () => {
		removeFromCart(props.idx);
	}
	async function sell(){

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
					${props.game_price} <span>-{props.game_price}%</span>
				</h2>
				<p>{props.player_name}</p>
			</div>
			<div>
				<button onClick={deleteFromCart}>
					<img src="/icons/cancel.svg" alt="" />
				</button>
			</div>
			<div>
				<button onClick={sell}>
					SELL
				</button>
			</div>
		</article>
	);
}

export default SellItem;
