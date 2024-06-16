import { Fragment } from "react/jsx-runtime"
import Footer from "../../components/dashboard/footer/Footer"
import NavBar from "../../components/dashboard/navbar/NavBar"
import OrderItem from "../../components/orders/order-item/OrderItem"
import OrderSummary from "../../components/orders/order-summary/OrderSummary"
import TitleHeading from "../../components/title-heading/TitleHeading"

import SellingModal from "../../components/sell/selling-modal/SellingModal"
import { useEffect } from "react"
import {skinOwner,  skinMarket} from "../../utils/web3";
import useCurrentUser from "../../hooks/useCurrentUser.zustand";
import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";
import skinCards from "../../utils/skinCards.json";

import skins from "../../utils/skins.json";
import { useState } from "react";

type OrderItem1 = {
    idx: string;
    player_name: string;
    image: string;
    name: string;
    category: string;
    game_price: number;
    game: string;
};
export let numberOfSkin:Number|undefined;
function Orders() {
  
  const { account } = useCurrentAccount((state) => state);
  const {currentUser} = useCurrentUser(state => state);
  const [displySkins,setdisplaySkins]=useState<OrderItem1[]>([]);
  
  
  useEffect(()=>{
	(async () => {
		try {
			const skinIdContract = await skinMarket();
			const skinOwnerCon=await skinOwner();
			const skinIds: number[] = await skinIdContract.methods
				.getGameSkins()
				.call();
			console.log("skinIds: ",skinIds);
			if(currentUser){
			const t:number[] = await skinOwnerCon.methods
						.getUserSkins(currentUser.name)
						.call();
			const filteredAndMappedSkins = skins
			//skinCards.skins
			//skins me hi game price fetch karna jyda better hai
			.filter((x) => t.some((y)=>y==x.idx))
			.map((x) => ({
				idx: x.idx.toString(),
				image: x.image,
				name: x.name,
				category: x.category,
				game_price: x.market_price,
				game: "Call of Duty",//change game______________________________
				player_name:'Ajitesh'//should be currentUser.username
			}));
			console.log("filter skins ;",filteredAndMappedSkins);
			setdisplaySkins(filteredAndMappedSkins);		
			}
		
		} catch (error) {
			console.log(error);
		}
	})();
  },[account])
  return (
    <Fragment>
    <div>
      <NavBar />
      <TitleHeading title="Your Orders" image="/images/sell-bg.jpg" />
      <div className="cart__item__wrapper">
				<div>
					<div className="cart__item__header">
						<h3>Skin</h3>
						<h3 className='category'>Category</h3>
						<h3 className='price'>Price</h3>
					</div>
					
					{displySkins === null ? (
                            <p>Loading...</p>
                        ) : (
                            displySkins.map((skin, index) => (
                                <OrderItem
                                    key={index}
                                    {...skin}
                                />
                            ))
                        )}
				</div>

				<OrderSummary />
			</div>
			<Footer />
    </div>
    <SellingModal />

    </Fragment>
  )
}
export default Orders