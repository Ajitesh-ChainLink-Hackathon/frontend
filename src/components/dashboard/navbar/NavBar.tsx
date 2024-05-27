import "./style.scss"
import useCartItems from "../../../hooks/useCartItems.zustand";
// import UserOptions from "../userinfo/UserOptions";

function NavBar() {
	const cartItemsCount = useCartItems(state => state.cartItems.length)
	return (
		<nav className="top__nav">
			<div className="logo__container">
				<img src="/logo.svg" alt="" />
				<p>SkinSwap</p>
			</div>
			<p className="heading">SELL</p>
			<div>
				<div className="user">
					<img src="/icons/user.svg" alt="" />
					{/* <UserOptions /> */}
				</div>
				<div className="cart">
					<img src="/icons/cart.svg" alt="" />
					<p>{cartItemsCount}</p>
				</div>
			</div>
		</nav>
	);
}
export default NavBar;
