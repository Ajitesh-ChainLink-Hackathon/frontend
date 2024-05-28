import './style.scss';
import { Link } from 'react-router-dom';
import { CartItem } from '../../../hooks/useCartItems.zustand';
import SkinCard from '../skin-card/SkinCard';

type CollectionProps = {
	icon: string;
	title: string;
	link: string;
	skins: Omit<CartItem, 'id'>[];
};

function Collection({ icon, title, link, skins }: CollectionProps) {
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
				<button className='left__btn'>
					<img src="/icons/arrow-right.svg" alt="" />
				</button>
				<div className="cards__container">
					<div className="cards__wrapper">
						{skins.map((product, index) => (
							<SkinCard
								key={index}
								name={product.name}
								img_url={product.img_url}
								category={product.category}
								price={product.price}
								discount={product.discount}
							/>
						))}
					</div>
				</div>
				<button>
					<img src="/icons/arrow-right.svg" alt="" />
				</button>
			</div>
		</section>
	);
}
export default Collection;
