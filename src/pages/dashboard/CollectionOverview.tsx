import React, { useState, useEffect } from "react";
import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';
import { skinMarket } from "../../utils/web3.ts";
import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";
import skinsFromJson from "../../utils/skins.json";

import { getEthPriceInUSD } from "../../utils/getEthUsd.ts";

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
    
    const [skinByCategory, setSkinsByCategory] = useState<SkinsByCategory>({});
    const { account } = useCurrentAccount((state) => state);

    const addSkinToCategory = (category: string, skin: CartItem) => {
        setSkinsByCategory(prevState => {
            const newCategory = prevState[category] ? [...prevState[category], skin] : [skin];
            return { ...prevState, [category]: newCategory };
        });
    };

    const ShowAllSkins = async () => {
        const skinMarketCon = await skinMarket();
        try {
            const skinIds: string[] = await skinMarketCon.methods.getAllSkins().call();
            for (const id of skinIds) {
               

                // Add game skins 
                const gamePrice = await skinMarketCon.methods.getSkinPriceFromGame(id).call();
				//cards me hi getSkinPriceFromGame karna padega
                const sellerObj: Seller = {
                    id: "0",
                    username: "Game",
                    walletAddress: "Game",
                    price: gamePrice ? Number(gamePrice) : 0,
                    gameCompany: "Game",
                };
                const potentialCard = skinsFromJson.find(x => Number(x.idx) === Number(id));

                if (potentialCard) {
                    let card: CartItem = {
                        idx: id,
                        image: potentialCard.image,
                        name: potentialCard.name,
                        category: potentialCard.category,
                        market_price: gamePrice ? Number(gamePrice) : 0,
                        discount: potentialCard.discount,
                        seller: sellerObj,
                    };
                    addSkinToCategory(potentialCard.category, card);
                }

                // Sell by someone else 
                const sellersOfSkin: Seller[][] = await skinMarketCon.methods.getSellers(id).call();
                console.log("Seller of skins:", sellersOfSkin);
                for (const seller of sellersOfSkin) {
                    const sellerObj: Seller = {
                        id: seller[0].toString(),
                        username: seller[1].toString(),
                        walletAddress: seller[2].toString(),
                        price: parseFloat(seller[3].toString()),
                        gameCompany: seller[4].toString(),
                    };
                    const potentialCard = skinsFromJson.find(x => Number(x.idx) === Number(id));
                    if (potentialCard) {
                        let card: CartItem = {
                            idx: id,
                            image: potentialCard.image,
                            name: potentialCard.name,
                            category: potentialCard.category,
                            market_price:  gamePrice ? Number(gamePrice) : 0,
                            discount: potentialCard.discount,
                            seller: sellerObj,
                        };
                        addSkinToCategory(potentialCard.category, card);
                    }
                }

                
            }
        } catch (error) {
            console.error("Error fetching skins:", error);
            
        }
    };

    useEffect(() => {
        if (account !== null) {
			getEthPriceInUSD();
            ShowAllSkins();
        }
    }, [account]);

    return (
        <div className='collection__overview'>
            <h1>Skin Collections</h1>
            {Object.keys(skinByCategory).map((category, index) => (
                <Collection
                    link={`/dashboard/${category}`}
                    icon={`/icons/${category}.svg`}
                    title={category}
                    skins={skinByCategory[category]}
                    key={index}
                />
            ))}
           
        </div>
    );
};

export default CollectionOverview;
