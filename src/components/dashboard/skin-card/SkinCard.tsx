import './style.scss';
import { CartItem } from '../../../hooks/useCartItems.zustand';

function SkinCard(props: Omit<CartItem, 'id'>) {
	return (
		<article className="skin__card">
			<div className='trade'>
				<img src="/icons/trade.svg" alt="" />
				<p>Tradable</p>
			</div>
			<img className='skin__img' src={props.img_url} alt="" />
			<div className='price'>
				<h2>${props.price}</h2>
				<span> -{props.discount}</span>
			</div>
			<p className='suggested__price'>Suggested price ${props.price}</p>
			<p className='category'>{props.category}</p>
			<h2>{props.name}</h2>
			<button>ADD TO CART</button>
		</article>
	);
}
export default SkinCard;
