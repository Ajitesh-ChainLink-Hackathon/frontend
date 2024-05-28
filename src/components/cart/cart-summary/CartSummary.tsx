import './style.scss';

function CartSummary() {
	return (
		<article className="cart__summary">
			<h2>Cart Summary</h2>
			<div>
				<p>Total Skins</p>
				<p>06</p>
			</div>
			<div>
				<p>Subtotal</p>
				<p>$23.00</p>
			</div>
			<div>
				<p>Discount</p>
				<p>$10.00</p>
			</div>
			<div className="totals">
				<h2>Total</h2>
				<h2>$69.98</h2>
			</div>
      <button>Checkout</button>
		</article>
	);
}
export default CartSummary;
