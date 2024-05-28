import './style.scss';
import useCartItems from '../../../hooks/useCartItems.zustand';
import UserOptions from '../userinfo/UserOptions';
import { useEffect, useRef, useState } from 'react';

function NavBar() {
	const cartItemsCount = useCartItems((state) => state.cartItems.length);
	const [showDetails, setShowDetails] = useState(false);
	const elementRef = useRef<HTMLImageElement>(null);
	const navElementRef = useRef<HTMLElement>(null)

	const handleClickOutside = (event?: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
		// Check if the target element is not within the desired component
		if (
			event!.target instanceof Node &&
			!elementRef.current?.contains(event!.target)
		) {
			setShowDetails(false);
		} else {
			setShowDetails(true);
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			const element = navElementRef.current!;
			const triggerElement = document.getElementById("home");

			if (triggerElement) {
				const triggerElementRect = triggerElement.getBoundingClientRect();
				const triggerElementTop =
					triggerElementRect.bottom + window.scrollY;

				if (window.scrollY >= triggerElementTop) {
					element.classList.add('scrolled');
				} else {
					element.classList.remove('scrolled');
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<nav className="top__nav" ref={navElementRef}>
			<div className="logo__container">
				<img src="/logo.svg" alt="" />
				<p>SkinSwap</p>
			</div>
			<p className="heading">SELL</p>

			<div>
				<div onClick={handleClickOutside} className="user">
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
