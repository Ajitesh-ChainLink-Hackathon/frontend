import React, { useState, useEffect } from "react";
import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';

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

import Web3 from "web3";
type Seller = { 
    id: string;
    username: string;
    gameCompany: string;
    price: number;
    walletAddress: string;
};

type CartItem = {
    idx: string;
    image: string;
    name: string;
    category: string;
    market_price: number;
    discount: number;
    seller: Seller;
};

interface SkinsByCategory {
    [category: string]: CartItem[];
}

const CollectionOverview: React.FC = () => {
    const [skins, setSkins] = useState<SkinsByCategory>({});
    const [loading, setLoading] = useState(true);
    const skinCategories = Object.keys(skins); // Dynamically get categories from fetched data

    const skinMarketAdd = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache

    async function ShowAllSkins() {
        const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
        try {
            const skinIds: string[] = await skinMarket.methods.getAllSkins().call();
    
            const skinData: SkinsByCategory = {};
            for (const id of skinIds) {
                const sellersOfSkin: Seller[][] = await skinMarket.methods.getSellers(id).call();
                const category = "knife"; // Replace with actual logic to determine the category
    
                if (!skinData[category]) {
                    skinData[category] = [];
                }

                // Loop through sellersOfSkin array and create seller objects
                for (const seller of sellersOfSkin) {
                    const sellerObj: Seller = {
                        id: seller[0].toString(),
                        username: seller[1].toString(),
                        walletAddress: seller[2].toString(),
                        price: parseFloat(seller[3].toString()),
                        gameCompany: seller[4].toString(),
                    };
                    const card: CartItem = {
                        idx: id,
                        image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
                        name: "braveheart",
                        category: category,
                        market_price: 2.19,
                        discount: 20,
                        seller: sellerObj,
                    };

                    skinData[category].push(card);
                }

				//add game skins 
				const gamePrice=await skinMarket.methods.getSkinPriceFromGame(id).call();
				const sellerObj: Seller = {
					id: "0",
					username: "Game",
					walletAddress: "Game",
					price: gamePrice ? Number(gamePrice) :0,
					gameCompany: "Game",
				};
				const card: CartItem = {
					idx: id,
					image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
					name: "braveheart",
					category: category,
					market_price: 2.19,
					discount: 20,
					seller: sellerObj,
				};
				skinData[category].push(card);


            }
			
			
			
            
            setSkins(skinData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching skins:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        ShowAllSkins();
    }, []);

    return (
        <div className='collection__overview'>
            <h1>Skin Collections</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                skinCategories.map((category, index) => (
                    <Collection
                        link={`/dashboard/${category}`}
                        icon={`/icons/${category}.svg`}
                        title={category}
                        skins={skins[category] || []}
                        key={index}
                    />
                ))
            )}
        </div>
    );
}

export default CollectionOverview;
