import './style.scss';
import useSellingItems, { SellingItem } from '../../../hooks/useSellingItems.zustand';
import skinMarketABI from "../../../abis/skinMarketABI.json";

function SellItem(props: SellingItem) {
	const removeFromCart = useSellingItems(state => state.removeSellingItem);
	const skinMarketAddress=

	const deleteFromCart = () => {
		removeFromCart(props.idx);
	}
	async function sell(){
		console.log("Sell:",props);

	}
	async function sellSkin() {
		const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAddress);
		try {
		  const amountInWei = web3.utils.toWei(price, 'ether');
		  console.log("userName:", userName, "\nconnectedAccount:", connectedAccount, "\nPrice:", amountInWei);
	
		  // Estimate gas limit
		  const gasLimit = await skinMarket.methods.sellSkin(
			skinId,
			userName,
			connectedAccount,
			amountInWei
		  ).estimateGas({ from: connectedAccount });
	
		  console.log("userName:", userName);
		  console.log("connectedAccount:", connectedAccount);
		  console.log("gasLimit:", gasLimit);
		  console.log("price:", amountInWei);
		  console.log("gas price:", await web3.eth.getGasPrice());
	
		  // Send the transaction
		  await skinMarket.methods.sellSkin(
			skinId,
			userName,
			connectedAccount,
			amountInWei
		  ).send({
			from: connectedAccount,
			gas: gasLimit,
			gasPrice: await web3.eth.getGasPrice()
		  });
	
		  // Navigate to the user dashboard
		  navigate(`/${userName}/Sell`);
		} catch (error) {
		  console.error("Error selling skin:", error);
		}
	  }
	  


	return (
		<article className="cart__item">
			<div className="skin">
				<img src={props.image} alt={props.name} />
				<div>
					<h2>{props.name}</h2>
					<div>
						<img src="/icons/trade.svg" alt="" />
						<p>Tradable</p>
					</div>
				</div>
			</div>
			<p className="category">{props.category}</p>
			<div className="price">
				<h2>
					${props.game_price} <span>-{props.game_price}%</span>
				</h2>
				<p>{props.player_name}</p>
			</div>
			<div>
				<button onClick={deleteFromCart}>
					<img src="/icons/cancel.svg" alt="" />
				</button>
			</div>
			<div>
				<button onClick={sell}>
					SELL
				</button>
			</div>
		</article>
	);
}

export default SellItem;
