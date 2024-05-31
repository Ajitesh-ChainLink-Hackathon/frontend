import './style.scss';
import CartItem from '../../components/cart/cart-item/CartItem';
import CartSummary from '../../components/cart/cart-summary/CartSummary';
import NavBar from '../../components/dashboard/navbar/NavBar';
import TitleHeading from '../../components/title-heading/TitleHeading';
import useCartItems from '../../hooks/useCartItems.zustand';
import Footer from '../../components/dashboard/footer/Footer';

function Cart() {
	const userCartItems = useCartItems((state) => state.cartItems);
	console.log(userCartItems)
	
	return (
		<section>
			<NavBar />
			<TitleHeading title="Your Cart" image="/images/cart-bg.jpg" />
			<div className="cart__item__wrapper">
				<div>
					<div className="cart__item__header">
						<h3>Skin</h3>
						<h3 className='category'>Category</h3>
						<h3 className='price'>Price</h3>
					</div>
					{userCartItems.map((skin, index) => (
						<CartItem
							key={index}
							{...skin}

						/>
					))}
				</div>

				<CartSummary />
			</div>
			<Footer />
		</section>
	);
}
export default Cart;
