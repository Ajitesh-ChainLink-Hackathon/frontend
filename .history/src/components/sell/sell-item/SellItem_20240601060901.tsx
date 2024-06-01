import './style.scss';
import useSellingItems, { SellingItem } from '../../../hooks/useSellingItems.zustand';
import skinMarketABI from "../../../abis/skinMarketABI.json";
import Web3 from "web3";

function SellItem(props: SellingItem) {
	const removeFromCart = useSellingItems(state => state.removeSellingItem);
	const skinMarketAddress = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
	const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache
	const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAddress);

	const deleteFromCart = () => {
		removeFromCart(props.idx);
	}
	async function sell(){
		// console.log("Sell:",props);
		// const gasLimit = await skinMarket.methods.sellSkin(
		// 	props.idx,
		// 	props.player_name,
		// 	connectedAccount,
		// 	amountInWei
		// ).estimateGas({ from: connectedAccount });

		

	}
	// async function sellSkin() {
	// 	const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAddress);
	// 	try {
	// 	  const amountInWei = web3.utils.toWei(price, 'ether');
	// 	  console.log("userName:", userName, "\nconnectedAccount:", connectedAccount, "\nPrice:", amountInWei);
	
	// 	  // Estimate gas limit
	// 	  const gasLimit = await skinMarket.methods.sellSkin(
	// 		skinId,
	// 		userName,
	// 		connectedAccount,
	// 		amountInWei
	// 	  ).estimateGas({ from: connectedAccount });
	
	// 	  console.log("userName:", userName);
	// 	  console.log("connectedAccount:", connectedAccount);
	// 	  console.log("gasLimit:", gasLimit);
	// 	  console.log("price:", amountInWei);
	// 	  console.log("gas price:", await web3.eth.getGasPrice());
	
	// 	  // Send the transaction
	// 	  await skinMarket.methods.sellSkin(
	// 		skinId,
	// 		userName,
	// 		connectedAccount,
	// 		amountInWei
	// 	  ).send({
	// 		from: connectedAccount,
	// 		gas: gasLimit,
	// 		gasPrice: await web3.eth.getGasPrice()
	// 	  });
	
	// 	  // Navigate to the user dashboard
	// 	  navigate(`/${userName}/Sell`);
	// 	} catch (error) {
	// 	  console.error("Error selling skin:", error);
	// 	}
	//   }
	  


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
		</article>
	);
}

export default SellItem;
