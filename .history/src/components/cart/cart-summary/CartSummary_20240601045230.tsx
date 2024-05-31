import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';
import './style.scss';
import Web3 from "web3";

import skinMarketABI from '../../../abis/skinMarketABI.json';


function CartSummary() {

	
	const cartItems = useCartItems(state => state.cartItems);
	const actualPrice = totalPriceWithDiscount(cartItems);
	const totalPrice = totalPriceWithoutDiscount(cartItems);
	const totalDiscount = totalDiscountedPrice(cartItems);
	
	let connectedAccount:string;
	const skinMarketAdd = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Ganache address
	const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Ganache

	async function connectWallet() {
		try {
		  const accounts = await web3.eth.getAccounts();
		  connectedAccount=accounts[6];
		  console.log("Connected account:", accounts[6]);
		} catch (error) {
		  console.error("Error connecting wallet:", error);
		}
	  }
	async function BuySkin(skin:CartItem[]) {
        // Buy the skin
        // Use the skinMarket contract to buy the skin
        // Use the skinOwner contract to transfer the skin to the buyer
		console.log("Buy skin with id ",skin);     
		const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
		await connectWallet(); 

		//`run loop

        const amountInWei = skin[0].seller.price;
		const gasPrice = await web3.eth.getGasPrice();
		const gasLimit = await skinMarket.methods
			.buySkin(skin[0].seller.username,skin[0].idx,skin[0].seller.id)
			.estimateGas({
			from: connectedAccount,
			value: amountInWei,
			
		});
		
        // console.log("your username: ",userName,"Amount in wei : ",amountInWei,"\nConnect Account :",connectedAccount,"\nGasPrice :",gasPrice,"\nseller:",seller[2]);  
    //     // Display a confirmation dialog
    //     const confirmed = window.confirm(`Are you sure you want to buy the skin from ${seller[1]}  for   ${seller[3]} wei?`);
          
    //       if (!confirmed) {
    //         return; // Exit the function if not confirmed
    //       }
    
    //     try {
    //       console.log(userName,skinId,id);
    //       await skinMarket.methods
    //            .buySkin(userName,skinId,id)
    //            .send({
    //            from: connectedAccount,
    //            value: amountInWei,
    //            gas: gasLimit,
    //            gasPrice: gasPrice,
    //           })
    //         .on("receipt", (receipt) => {
    //           console.log("Transaction receipt:", receipt);
    //           console.log("Transaction hash:", receipt.transactionHash);
    //         })
    //         .on("error", (error) => {
    //           console.error("Transaction error:", error);
    //         });
    //       console.log("Buying skin from:", seller);
    //     } catch (error) {
    //       console.error("Error buying skin:", error);
    //     }
      }


	return (
		<article className="cart__summary">
			<h2>Cart Summary</h2>
			<div>
				<p>Total Skins</p>
				<p>{addZero(cartItems.length)}</p>
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
      <button onClick={()=>{BuySkin(cartItems)}}>Checkout</button>
		</article>
	);
}
export default CartSummary;
