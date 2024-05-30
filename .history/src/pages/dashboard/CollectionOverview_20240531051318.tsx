import React, { useState, useEffect } from "react";
import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';
import skinProducts from '../../utils/skins.products.json';
import Web3 from "web3";
import skinMarketABI from '../../abis/skinMarketABI.json';

interface Seller {
    id: string;
    username: string;
    gameCompany: string;
    price: number;
    walletAddress: string;
}

interface Skin {
    idx: string;
    image: string;
    name: string;
    category: string;
    market_price: number;
    discount: number;
    seller: Seller;
}

interface SkinsByCategory {
    [category: string]: Skin[];
}

const CollectionOverview: React.FC = () => {
    const [skins, setSkins] = useState<SkinsByCategory>({});
    const skinCategories = Object.keys(skinProducts);

    const skinMarketAdd = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache

    async function ShowAllSkins() {
		const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
		try {
		  const skinIds: string[] = await skinMarket.methods.getAllSkins().call();

		  const skinData: SkinsByCategory = {};
	  
		  for (const id of skinIds) {
			console.log("skinId:",id);
			const sellersOfSkin1= await skinMarket.methods.getSellers(1).call();
			const sellersOfSkin= await skinMarket.methods.getSellers(id).call();
			console.log("Seller", sellersOfSkin1);
			const category = "knife"; // Replace with actual logic to determine the category
	  
			if (!skinData[category]) {
			  skinData[category] = [];
			}
	  
			skinData[category].push({
			  idx: id,
			  image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
			  name: "braveheart",
			  category: category,
			  market_price: 2.19,
			  discount: 20,
			  seller: {
				id: sellersOfSkin[0].id, // Assuming each skin has only one seller
				username: sellersOfSkin[0].username,
				gameCompany: sellersOfSkin[0].gameCompany,
				price: sellersOfSkin[0].price,
				walletAddress: sellersOfSkin[0].walletAddress,
			  },
			});
		  }
		  setSkins(skinData);
		} catch (error) {
		  console.error("Error fetching skins:", error);
		}
	  }
	  

    useEffect(() => {
        ShowAllSkins();
    }, []);

    return (
        <div className='collection__overview'>
            <h1>Skin Collections</h1>
            {skinCategories.map((category, index) => (
                <Collection
                    link={`/dashboard/${category}`}
                    icon={`/icons/${category}.svg`}
                    title={category}
                    skins={skins[category] || []}
                    key={index}
                />
            ))}
        </div>
    );
}

export default CollectionOverview;
