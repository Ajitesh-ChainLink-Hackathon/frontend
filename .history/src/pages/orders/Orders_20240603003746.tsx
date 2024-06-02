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
import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";

function Orders() {
  const userOrderItems = useOrderItems(state => state.orderItems)
  const { account } = useCurrentAccount((state) => state);
  const currentUser = useCurrentUser(state => state.currentUser);
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
				console.log(currentUser.name);
			skinIds.forEach(async () => {
				const t = await skinOwnerCon.methods
					.getUserSkins(currentUser.name)
					.call();
				console.log(t);
			});
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