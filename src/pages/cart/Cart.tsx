import "./style.scss";
import CartItem from '../../components/cart/cart-item/CartItem';
import CartSummary from '../../components/cart/cart-summary/CartSummary';
import NavBar from '../../components/dashboard/navbar/NavBar';
import TitleHeading from '../../components/title-heading/TitleHeading';
import useCartItems from '../../hooks/useCartItems.zustand';

function Cart() {
	const userCartItems = useCartItems((state) => state.cartItems);
	return (
		<section >
			<NavBar />
			<TitleHeading title="Your Cart" image="/images/cart-bg.jpg" />
			<div className='cart__item__wrapper'>
				<div>
					<div className="cart__item__header">
						<h3>Skin</h3>
						<h3>Category</h3>
						<h3>Price</h3>
					</div>
					{userCartItems.map((skin, index) => (
						<CartItem
							id={index}
							name={skin.name}
							image={skin.img_url}
							price={skin.price}
							market_price={skin.price}
							discount={skin.discount}
							category={skin.category}
						/>
					))}
				</div>

				<CartSummary />
			</div>
		</section>
	);
}
export default Cart;
