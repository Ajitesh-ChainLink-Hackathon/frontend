import useCartItems from '../../../hooks/useCartItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';
import './style.scss';
import Web3 from "web3";
import skinMarketABI from '../../../abis/skinMarketABI.json';
import { useParams } from 'react-router-dom';

interface Seller {
    id: string;
    username: string;
    gameCompany: string;
    price: number;
    walletAddress: string;
}
function CartSummary() {

	let skins;
	let connectedAccount;
	const skinMarketAdd = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Ganache address
	const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // Ganache
	const { id } = useParams();
	const cartItems = useCartItems(state => state.cartItems);
	const actualPrice = totalPriceWithDiscount(cartItems);
	const totalPrice = totalPriceWithoutDiscount(cartItems);
	const totalDiscount = totalDiscountedPrice(cartItems);
	 async function BuySkin(id:Seller) {
    //     // Buy the skin
    //     // Use the skinMarket contract to buy the skin
    //     // Use the skinOwner contract to transfer the skin to the buyer
         console.log("Buy skin with id ",id);
    //     
    //     const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
    //     await connectWallet(); 
    //     const amountInWei = seller[3];
    //     const gasPrice = await web3.eth.getGasPrice();
    //     const gasLimit = await skinMarket.methods
    //       .buySkin(userName,skinId,seller[0])
    //       .estimateGas({
    //         from: connectedAccount,
    //         value: amountInWei,
            
    //       });
    //     console.log("your username: ",userName,"Amount in wei : ",amountInWei,"\nConnect Account :",connectedAccount,"\nGasPrice :",gasPrice,"\nseller:",seller[2]);  
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
      <button onClick={()=>BuySkin({id:"1", username: "Ajitesh",gameCompany:"kio toh hai",price: 1, walletAddress: "mfkemfeofm"})}>Checkout</button>
		</article>
	);
}
export default CartSummary;
