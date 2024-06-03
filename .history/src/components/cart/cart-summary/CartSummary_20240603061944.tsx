import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';
import './style.scss';
import { skinMarket,getAccounts,Utils } from '../../../utils/web3';


function CartSummary() {

	
	const cartItems = useCartItems(state => state.cartItems);
	const actualPrice = totalPriceWithDiscount(cartItems);
	const totalPrice = totalPriceWithoutDiscount(cartItems);
	const totalDiscount = totalDiscountedPrice(cartItems);
	
	let connectedAccount:string;

	async function connectWallet() {
		try {
		  const accounts = await getAccounts();
		  connectedAccount=accounts[0];
		  console.log("Connected account:", accounts[0]);
		} catch (error) {
		  console.error("Error connecting wallet:", error);
		}
	  }
	async function BuySkin(skin:CartItem[]) {
		const username="Ajitesh";//to change -_________________-
       // Buy the skin
        // Use the skinMarket contract to buy the skin
        // Use the skinOwner contract to transfer the skin to the buyer
		const web3=Utils();

		if(web3){
		console.log("Buy skin with id ",skin);     
		const skinMarketCon = await skinMarket();
		await connectWallet(); 
		const userName="Ajitesh";//to change__________________________________

		//`run loop

		for(let i =0;i<skin.length;i++){
			const amountInWei = skin[i].seller.price;
			
			if(skin[i].seller.walletAddress!=="Game"){
		
			try {
				const gasPrice = await web3.eth.getGasPrice();
				const gasLimit = await skinMarketCon.methods
					.buySkin(username,skin[i].idx,skin[i].seller.id)
					.estimateGas({
					from: connectedAccount,
					value: amountInWei.toString(),
					
				});
				console.log("your username: ",skin[i].seller.username,"Amount in wei : ",amountInWei,"\nConnect Account :",connectedAccount,"\nGasPrice :",gasPrice,"\nseller:",skin[i].seller.username);  
				// Display a confirmation dialog
				const confirmed = window.confirm(`Are you sure you want to buy the skin from ${skin[i].seller.username}  for   ${amountInWei.toString()} wei?`);
				
				if (!confirmed) {
					return; // Exit the function if not confirmed
				}
			      console.log(userName,skin[i].idx,skin[i].seller.id);
			      await skinMarketCon.methods
			           .buySkin(userName,skin[i].idx,skin[i].seller.id)
			           .send({
			           from: connectedAccount,
			           value: amountInWei.toString(),
			           gas: gasLimit.toString(),
			           gasPrice: gasPrice.toString(),
			          })
			        .on("receipt", (receipt) => {
			          console.log("Transaction receipt:", receipt);
			          console.log("Transaction hash:", receipt.transactionHash);
			        })
			        .on("error", (error) => {
			          console.error("Transaction error:", error);
			        });
			    //   console.log("Buying skin from:", seller);
				} catch (error) {
				console.error("Error buying skin:", error);
				}
			}
			else{
				console.log("Buy from game");
				const gasPrice = await web3.eth.getGasPrice();
				console.log(skin[i].idx);
				const gasLimit = await skinMarketCon.methods
				.buyFromGame( skin[i].idx,username)
				.estimateGas({
				from: connectedAccount,
				value: amountInWei.toString(),
			});
			console.log("your username: ",skin[i].seller.username,"Amount in wei : ",amountInWei,"\nConnect Account :",connectedAccount,"\nGasPrice :",gasPrice,"\nseller:",skin[i].seller.username);
			const transaction=await skinMarketCon.methods
			.buyFromGame( skin[i].idx,username).send({from:connectedAccount,value:amountInWei.toString()});
			console.log(transaction.transactionHash);


			
		   }
		}
		}
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
				<p>${Number(totalPrice)/1000000000000000}</p>
			</div>
			<div className='discount'>
				<p>Discount</p>
				<p>${Number(totalDiscount)/1000000000000000}</p>
			</div>
			<div className="totals">
				<h2>Total</h2>
				<h2>${Number(actualPrice)/1000000000000000}</h2>
			</div>
      <button onClick={()=>{BuySkin(cartItems)}}>Checkout</button>
		</article>
	);
}
export default CartSummary;
