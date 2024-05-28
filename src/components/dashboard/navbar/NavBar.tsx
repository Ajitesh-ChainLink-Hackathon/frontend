import './style.scss';
import useCartItems from '../../../hooks/useCartItems.zustand';
import UserOptions from '../userinfo/UserOptions';
import { useEffect, useRef, useState } from 'react';

function NavBar() {
	const cartItemsCount = useCartItems((state) => state.cartItems.length);
	const [showDetails, setShowDetails] = useState(false);
	const elementRef = useRef<HTMLImageElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		// Check if the target element is not within the desired component
		if (
			event.target instanceof Node &&
			!elementRef.current?.contains(event.target)
		) {
			setShowDetails(false);
		} else {
			setShowDetails(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<nav className="top__nav">
			<div className="logo__container">
				<img src="/logo.svg" alt="" />
				<p>SkinSwap</p>
			</div>
			<p className="heading">SELL</p>

			<div>
				<div className="user">
					<img ref={elementRef} src="/icons/user.svg" alt="" />

					{showDetails && <UserOptions />}
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
