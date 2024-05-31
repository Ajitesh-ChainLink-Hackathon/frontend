import './style.scss';
import { Link } from 'react-router-dom';
import { CartItem } from '../../../hooks/useCartItems.zustand';
import SkinCard from '../skin-card/SkinCard';
import { useState, useRef } from "react";

type CollectionProps = {
	icon: string;
	title: string;
	link: string;
	skins: CartItem[];
};

function Collection({ icon, title, link, skins }: CollectionProps) {
	const [position, setPosition] = useState(0);
	const elementRef = useRef<HTMLDivElement>(null);
	const reviewContainer = useRef<HTMLDivElement>(null);

	const movePositionLeft = () => {
		console.log("eft");
		const reviewElementWidth = elementRef.current!.offsetWidth;
		setPosition(prev => (prev >= 0 ? prev : prev + reviewElementWidth));
	};

	const movePositionRight = () => {
		const reviewElementWidth = elementRef.current!.offsetWidth;
		const reviewContainerWidth = reviewContainer.current!.offsetWidth + 8;
		setPosition(prev => (prev <= (-reviewContainerWidth + window.innerWidth) ? prev : prev - reviewElementWidth));
	};


	return (
		<section className="collection__section">
			<header>
				<div>
					<img className="collection__icon" src={icon} alt={icon} />
					<h2>{title}</h2>
				</div>
				<Link to={link}>
					<p>View more</p>
					<img
						className="arrow__icon"
						src="/icons/arrow-right.svg"
						alt=""
					/>
				</Link>
			</header>
			<div className="carousel">
				<button className='left__btn' onClick={movePositionLeft} style={{ opacity: position === 0 ? 0 : 1 }}>
					<img src="/icons/arrow-right.svg" alt="" />
				</button>
				<div className="cards__container">
					<div className="cards__wrapper" ref={reviewContainer} style={{ transform: `translateX(${position}px)` }}>
						{skins.map((product, index) => (
							<SkinCard
								key={index}
								idx={product.idx}
								name={product.name}
								market_price={product.market_price}
								image={product.image}
								category={product.category}
								discount={product.discount}
								seller={product.seller}

								ref={elementRef}
							/>
						))}
					</div>
				</div>
				<button onClick={movePositionRight}>
					<img src="/icons/arrow-right.svg" alt="" />
				</button>
			</div>
		</section>
	);
}

export default Collection;
