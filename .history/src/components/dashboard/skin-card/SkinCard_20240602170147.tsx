import './style.scss';
import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
import { forwardRef, LegacyRef } from 'react';
import { calculateDiscountedPrice } from '../../../utils/utils';
import showToast from '../../../utils/showToast';
import { convertWeiToUSD} from '../../../utils/getEthUsd';


const SkinCard = forwardRef((props: CartItem, ref: LegacyRef<HTMLDivElement>)=> {
	const addToCart = useCartItems(state => state.addCartItem)
	const discountedPrice = calculateDiscountedPrice(props.seller.price, props.discount);
	let usdPrice;

	async function getPrice(){
		console.log("Get price");
		usdPrice=await convertWeiToUSD( props.seller.price.toString());
	}
	console.log(usdPrice);

	const addSkinToCart = ()=> {
		addToCart({...props})
		showToast.success("Added To Cart")
	}

	return (
		<article className="skin__card" ref={ref}>
			<div className='trade'>
				<img src="/icons/trade.svg" alt="" />
				<p>Tradable</p>
			</div>
			<img className='skin__img' src={props.image} alt="" />
			<div className='price'>
				<h2>${usdPrice}</h2>
				<span> -{props.discount}%</span>
				
			</div>
			<p className='suggested__price'>By Player <br></br>{props.seller.username}</p>
			<p className='category'>{props.category}</p>
			<h2>{props.name}</h2>
			<button onClick={addSkinToCart}>ADD TO CART</button>
		</article>
	);
})
export default SkinCard;
