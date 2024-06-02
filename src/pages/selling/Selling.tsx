import { Fragment } from "react/jsx-runtime";
import Footer from "../../components/dashboard/footer/Footer";
import NavBar from "../../components/dashboard/navbar/NavBar";
import SellItem from "../../components/sell/sell-item/SellItem";
import SellingSummary from "../../components/sell/sell-summary/SellingSummary";
import TitleHeading from "../../components/title-heading/TitleHeading";
import useSellingItems from "../../hooks/useSellingItems.zustand";
import SellingModal from "../../components/sell/selling-modal/SellingModal";

function Selling() {
	const userSellingItems = useSellingItems((state) => state.sellingItems);
	return (
		<Fragment>
			<div>
				<NavBar />
				<TitleHeading
					title="MarketPlace"
					image="/images/selling.jpeg"
				/>
				<div className="cart__item__wrapper">
					<div>
						<div className="cart__item__header">
							<h3>Skin</h3>
							<h3 className="category">Category</h3>
							<h3 className="price">Price</h3>
						</div>
						{userSellingItems.map((skin, index) => (
							<SellItem key={index} {...skin} />
						))}
					</div>

					<SellingSummary />
				</div>
				<Footer />
			</div>
			<SellingModal />
		</Fragment>
	);
}
export default Selling;
