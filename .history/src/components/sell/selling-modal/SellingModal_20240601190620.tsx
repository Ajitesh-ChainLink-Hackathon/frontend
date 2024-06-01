import { Fragment } from 'react/jsx-runtime';
import React,{ useState } from 'react';
import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';
import Web3 from "web3";

export type SellingItem = {
   idx: string;
   player_name: string;
   image: string;
   name: string;
   category: string;
   game_price: number;
   game: string;
};

const skinMarketABI=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_skinOwnershipAddress",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "_game",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_skinId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "AddOrEditSkin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allSkins",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_skinId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			}
		],
		"name": "buyFromGame",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "skinId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "sellerId",
				"type": "uint256"
			}
		],
		"name": "buySkin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "game",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSkins",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "skinId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getSeller",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "gameCompany",
						"type": "address"
					}
				],
				"internalType": "struct SkinMarket.SkinSeller",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "skinId",
				"type": "uint256"
			}
		],
		"name": "getSellers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userName",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "walletAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "gameCompany",
						"type": "address"
					}
				],
				"internalType": "struct SkinMarket.SkinSeller[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_skinId",
				"type": "uint256"
			}
		],
		"name": "getSkinPriceFromGame",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "skinId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_userName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_walletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "sellSkin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "skinOwnership",
		"outputs": [
			{
				"internalType": "contract ISkinOwnership",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "skinSellers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "gameCompany",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

//main sell card

function SellingModal() {
   const newSellingItem:SellingItem | null = useSellingItems((state) => state.newSellingItem);
   const setNewSellingItem = useSellingItems((state) => state.setNewSellingItem);
   let connectedAccount:string;
   const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPriceInput(Number(event.target.value));
    };

   const skinMarketAddress = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
   const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache
   const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAddress);
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
   
           const gasLimit = await skinMarket.methods.sellSkin(
             newSellingItem.idx,
             newSellingItem.player_name,
             connectedAccount,
             amountInWei
           ).estimateGas({ from: connectedAccount });
   
           const gasPrice=await web3.eth.getGasPrice();
   
          //Send the transaction
            const transaction=await skinMarket.methods.sellSkin(
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
               </div>

               </div>
               <button className='confirm__btn' onClick={sell}>Confirm</button>
               

               
				</article>
			</Fragment>
		)
	);
}
export default SellingModal;
