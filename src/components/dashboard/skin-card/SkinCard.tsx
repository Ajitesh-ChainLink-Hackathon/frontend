// import './style.scss';
// import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
// import { forwardRef, LegacyRef, useEffect } from 'react';
// import { calculateDiscountedPrice } from '../../../utils/utils';
// import showToast from '../../../utils/showToast';
// import { convertWeiToUSD} from '../../../utils/getEthUsd';
// import { getEthPriceInUSD } from '../../../utils/getEthUsd';


// const SkinCard = forwardRef((props: CartItem, ref: LegacyRef<HTMLDivElement>)=> {
// 	const addToCart = useCartItems(state => state.addCartItem)
// 	const discountedPrice = calculateDiscountedPrice(props.seller.price, props.discount);
	
	
	
// 	useEffect(()=>{
// 		let usd =async ()=>{
// 			return await getEthPriceInUSD();
// 		}
		
// 		const p=usd();
// 		console.log(p);
// 	}
// 	,[])

// 	//use the useEffect to call usd to call await getEthPriceInUsd only once 
// 	// const usd = getEthPriceInUSD();
// 	// console.log(usd);

// 	//above will call usd everytime when frame is refreshes ,but i want to call it only once
// 	//so i used useEffect
	

	
	
// 	// useEffect(
// 	// 	() => {
			
// 	// 		usd
// 	// 		// console.log(usd);
// 	// 	},
// 	// 	[]
// 	// )
	
	
	

// 	const addSkinToCart = ()=> {
// 		addToCart({...props})
// 		showToast.success("Added To Cart")
// 	}

// 	return (
// 		<article className="skin__card" ref={ref}>
// 			<div className='trade'>
// 				<img src="/icons/trade.svg" alt="" />
// 				<p>Tradable</p>
// 			</div>
// 			<img className='skin__img' src={props.image} alt="" />
// 			<div className='price'>
// 				<h2>${props.market_price/1000000000000000000}</h2>
// 				<span> -{props.discount}%</span>
				
// 			</div>
// 			<p className='suggested__price'>By Player <br></br>{props.seller.username}</p>
// 			<p className='category'>{props.category}</p>
// 			<h2>{props.name}</h2>
// 			<button onClick={addSkinToCart}>ADD TO CART</button>
// 		</article>
// 	);
// })
// export default SkinCard;


import { forwardRef, LegacyRef, useEffect, useState } from 'react';
import './style.scss';
import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
// import { calculateDiscountedPrice } from '../../../utils/utils';
import showToast from '../../../utils/showToast';
import { usdPrice } from '../../../utils/getEthUsd';

const SkinCard = forwardRef((props: CartItem, ref: LegacyRef<HTMLDivElement>) => {
    const addToCart = useCartItems(state => state.addCartItem);
   // const discountedPrice = calculateDiscountedPrice(props.seller.price, props.discount);
	

    const addSkinToCart = () => {
        addToCart({ ...props });
        showToast.success("Added To Cart");
    };

    return (
        <article className="skin__card" ref={ref}>
            <div className='trade'>
                <img src="/icons/trade.svg" alt="Trade icon" />
                <p>Tradable</p>
            </div>
            <img className='skin__img' src={props.image} alt="Skin image" />
            <div className='price'>
                <h2>${(props.seller.price* (usdPrice!==null?Number(usdPrice):0)/ 1000000000000000000).toFixed(2)}</h2>
                <span> -{props.discount}%</span>
            </div>
            <p className='suggested__price'>By Player <br />{props.seller.username}</p>
            <p className='category'>{props.category}</p>
            <h2>{props.name}</h2>
            <button onClick={addSkinToCart}>ADD TO CART</button>
        </article>
    );
});

export default SkinCard;
