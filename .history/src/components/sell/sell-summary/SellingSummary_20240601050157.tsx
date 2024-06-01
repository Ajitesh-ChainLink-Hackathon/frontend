
import useSellingItems from '../../../hooks/useSellingItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';

function SellingSummary() {
	const sellingItems = useSellingItems(state => state.sellingItems);
	const actualPrice = totalPriceWithDiscount(sellingItems);
	const totalPrice = totalPriceWithoutDiscount(sellingItems);
	const totalDiscount = totalDiscountedPrice(sellingItems);
	return (
		<article className="cart__summary">
			<h2>Selling Summary</h2>
			<div>
				<p>Total Skins</p>
				<p>{addZero(sellingItems.length)}</p>
			</div>
			<div>
				<p>Subtotal</p>
				<p>${totalPrice}</p>
			</div>
			<div className='discount'>
				<p>Discount</p>
				<p>${totalDiscount}</p>
			</div>
			<div className="totals">
				<h2>Total</h2>
				<h2>${actualPrice}</h2>
			</div>
		</article>
	);
}
export default SellingSummary;
