import { Fragment } from 'react/jsx-runtime';
import './style.scss';
import useSellingItems from '../../../hooks/useSellingItems.zustand';
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


function SellingModal() {
	const newSellingItem = useSellingItems((state) => state.newSellingItem);
	const setNewSellingItem = useSellingItems((state) => state.setNewSellingItem);
   
   const handleCancel = ()=> {
      setNewSellingItem(null)
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
                     <input type="number" placeholder='Type your preferred price' />
               </div>
               <div className='details'>
                  <div>
                     <span>Game Company</span>
                     <p>{newSellingItem.game}</p>
                  </div>
               <div >
                <span>Market price</span>
                  {/* <p>${newSellingItem.p}</p> */}
               </div>

               </div>
               <button className='confirm__btn'>Confirm</button>
               

               
				</article>
			</Fragment>
		)
	);
}
export default SellingModal;
