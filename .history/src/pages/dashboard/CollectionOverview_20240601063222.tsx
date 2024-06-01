import React, { useState, useEffect } from "react";
import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';

import skinMarketABI from "../../abis/SkinMarketABI.json";
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
