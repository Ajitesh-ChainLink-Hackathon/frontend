import { Fragment } from 'react/jsx-runtime';
import React,{ useState } from 'react';
import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';
import Web3 from "web3";
import { CartItem } from '../../../hooks/useCartItems.zustand';
import { skinMarket, skinMarket } from '../../../utils/web3';
export type SellingItem = {
   idx: string;
   player_name: string;
   image: string;
   name: string;
   category: string;
   game_price: number;
   game: string;
};



//main sell card

function SellingModal() {
   const newSellingItem:SellingItem | null = useSellingItems((state) => state.newSellingItem);
   const setNewSellingItem = useSellingItems((state) => state.setNewSellingItem);
   let connectedAccount:string;
   //const [averagePrice, setAveragePrice] = useState(0);
   let averagePrice=useState<number>();
   const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceInput(Number(event.target.value));
    };

   const skinMarketCon =skinMarket();
   const [priceInput, setPriceInput] = useState<number>(0); // State for input value
   async function connectWallet() {
      try {
        const accounts = await web3.eth.getAccounts();
        connectedAccount=accounts[0];
        console.log("connected account : ",connectedAccount)
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
   }

   const handleCancel = ()=> {
      setNewSellingItem(null)
   }
   
   async function sell(){
      if (newSellingItem) {
         const price = web3.utils.toWei(priceInput.toString(), "ether");   
         console.log("Sell:", newSellingItem);
         console.log("price; ",price);
         await connectWallet();

         try {
           const amountInWei = web3.utils.toWei(priceInput, 'ether'); // Convert input to Wei
           console.log("Sell:", newSellingItem);

           console.log("Confirm selling : \nSkin ID : ",newSellingItem.idx,"\nUsername",newSellingItem.player_name,"\nWallet Address : ",connectedAccount,"\namount int Wei: ",amountInWei);
   
           const gasLimit = await skinMarketCon.methods.sellSkin(
             newSellingItem.idx,
             newSellingItem.player_name,
             connectedAccount,
             amountInWei
           ).estimateGas({ from: connectedAccount });
   
           const gasPrice=await web3.eth.getGasPrice();
   
          //Send the transaction
            const transaction=await skinMarketCon.methods.sellSkin(
               newSellingItem.idx,
               newSellingItem.player_name,
               connectedAccount,
               amountInWei
            ).send({
               from: connectedAccount,
               gas: gasLimit.toString(), // Convert gasLimit to string
               gasPrice: (await web3.eth.getGasPrice()).toString()
            });
            console.log("Transaction hash:", transaction.transactionHash);
          
            } catch (error) {
            console.error("Error selling skin:", error);
            
         } 
      }
   }

   async function fetchAveragePrice() {
      const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAddress);
      if(newSellingItem){
         try {
         const sellers:CartItem[] = await skinMarket.methods.getSellers(newSellingItem.idx).call();
         console.log("sellers",sellers);
         

         if (sellers && sellers.length > 0) {
            const totalPrices = sellers.reduce((total, seller) => total + parseFloat(web3.utils.fromWei(seller.seller.price, 'ether')), 0);
            const average = totalPrices / sellers.length;
            
            return 100;

         }
         } catch (error) {
         console.error("Error fetching average price:", error);
         }
      }
   }

	return (
		newSellingItem && (
			<Fragment>
				<div className="modal__overlay" onClick={handleCancel} />
				<article className="selling__modal">
					<span className='cancel' onClick={handleCancel}>
						<img src="/icons/cancel.svg" alt="" />
					</span>
					<img className='modal__img' src={newSellingItem.image} alt={newSellingItem.name} />
               <h2>{newSellingItem.name}</h2>
               <div className='status'>
						<img src="/icons/trade.svg" alt="" />
						<p>Tradable</p>
					</div>
               <div className='input__price'>
                  <label htmlFor="">Selling price</label>
                  <input
                     type="number"
                     placeholder='Type your preferred price'
                     value={priceInput}
                     onChange={handlePriceChange}
                  />
               </div>
               <div className='details'>
                  <div>
                     <span>Game Company</span>
                     <p>{newSellingItem.game}</p>
                  </div>
               <div >
                <span>Average price</span>
                  {/* <p>${newSellingItem.p}</p> */}
                  {/* <p>${averagePrice}</p> */}
               </div>

               </div>
               <button className='confirm__btn' onClick={sell}>Confirm</button>
               

               
				</article>
			</Fragment>
		)
	);
}
export default SellingModal;
