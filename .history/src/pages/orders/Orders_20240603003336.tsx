import { Fragment } from "react/jsx-runtime"
import Footer from "../../components/dashboard/footer/Footer"
import NavBar from "../../components/dashboard/navbar/NavBar"
import OrderItem from "../../components/orders/order-item/OrderItem"
import OrderSummary from "../../components/orders/order-summary/OrderSummary"
import TitleHeading from "../../components/title-heading/TitleHeading"
import useOrderItems from "../../hooks/useOrderItems.zustand"
import SellingModal from "../../components/sell/selling-modal/SellingModal"
import { useEffect } from "react"
import {skinOwner,  skinMarket} from "../../utils/web3";
import useCurrentUser from "../../hooks/useCurrentUser.zustand";
import 

function Orders() {
  const userOrderItems = useOrderItems(state => state.orderItems)

  useEffect(()=>{
	(async () => {
		try {
			const skinIdContract = await skinMarket();
			const skinOwnerCon=await skinOwner();
			const skinIds: number[] = await skinIdContract.methods
				.getGameSkins()
				.call();
			console.log("skinIds: ",skinIds);	
			skinIds.forEach(async () => {
				const t = await skinOwnerCon.methods
					.getUserSkins(useCurrentUser.name)
					.call();
				console.log(t);
			});
		} catch (error) {
			console.log(error);
		}
	})();
  },[])
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
					{userOrderItems.map((skin, index) => (
						<OrderItem
							key={index}
             
							{...skin}
						/>
					))}
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