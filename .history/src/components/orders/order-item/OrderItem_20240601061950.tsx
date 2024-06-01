import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';


function OrderItem(props: CartItemProps) {
  const setNewSellingItem = useSellingItems(state => state.setNewSellingItem);


  const handleClick =()=> {
    setNewSellingItem(props)
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
				<button onClick={handleClick} className="sell__btn">
          Sell Skin
        </button>
			</div>
		</article>
	);
}
export default OrderItem;
