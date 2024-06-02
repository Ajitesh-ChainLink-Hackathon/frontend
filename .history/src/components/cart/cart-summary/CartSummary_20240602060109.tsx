import useCartItems, { CartItem } from '../../../hooks/useCartItems.zustand';
import { addZero, totalDiscountedPrice, totalPriceWithDiscount, totalPriceWithoutDiscount } from '../../../utils/utils';
import './style.scss';
import Web3 from "web3";
const skinMarketABI1=[
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
		const skinMarket = new web3.eth.Contract(skinMarketABI1, skinMarketAdd);
		await connectWallet(); 

		//`run loop

		for(let i =0;i<skin.length;i++){
			const amountInWei = skin[i].seller.price;
			
			if(skin[i].seller.walletAddress!=="Game"){
		
			try {
				const gasPrice = await web3.eth.getGasPrice();
				const gasLimit = await skinMarket.methods
					.buySkin(skin[i].seller.username,skin[i].idx,skin[i].seller.id)
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
				} catch (error) {
				console.error("Error buying skin:", error);
				}
			}
			else{
				console.log("Buy from game");
				const gasPrice = await web3.eth.getGasPrice();
				const gasLimit = await skinMarket.methods
				.buyFromGame(Number(skin[i].idx))
				.estimateGas({
				from: connectedAccount,
				value: amountInWei.toString(),	
			});
			
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
