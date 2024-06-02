import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';
import { useEffect } from 'react';
import { skinMarket } from '../../../utils/web3';

export type OrderItem = {
    idx: string;
    player_name: string;
    image: string;
    name: string;
    category: string;
    game_price: number;
    game: string;
};


function OrderItem(props: OrderItem) {
  const setNewSellingItem = useSellingItems(state => state.setNewSellingItem);


  const handleClick =()=> {
    setNewSellingItem(props)
  }
  useEffect(()=>{
	(async () => {
		try {
			const skinIdContract = await skinMarket();
			const skinIds: number[] = await skinIdContract.methods
				.getGameSkins()
				.call();
			console.log("skinIds: ",skinIds);	
			skinIds.forEach(async (skinId) => {
				const t = await skinIdContract.methods
					.getSellers(skinId)
					.call();
				console.log(t);
			});
		} catch (error) {
			console.log(error);
		}
	})();
  },[])


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
					${props.game_price} 
				</h2>
				<p>{props.player_name}</p>
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
