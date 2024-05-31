import { Fragment } from "react/jsx-runtime"
import Footer from "../../components/dashboard/footer/Footer"
import NavBar from "../../components/dashboard/navbar/NavBar"
import OrderItem from "../../components/orders/order-item/OrderItem"
import OrderSummary from "../../components/orders/order-summary/OrderSummary"
import TitleHeading from "../../components/title-heading/TitleHeading"
import useOrderItems from "../../hooks/useOrderItems.zustand"
import SellingModal from "../../components/sell/selling-modal/SellingModal"

function Orders() {
  const userOrderItems = useOrderItems(state => state.orderItems)
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
              price={23}
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