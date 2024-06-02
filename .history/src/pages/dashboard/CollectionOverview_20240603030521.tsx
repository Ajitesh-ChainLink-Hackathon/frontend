import React, { useState, useEffect } from "react";
import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';
import { skinMarket } from "../../utils/web3.ts";
import useCurrentAccount from "../../hooks/useCurrentAccount.zustand";
import skinsFromJson from "../../utils/skins.json";


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
    const [skins, setSkins] = useState<CartItem[]>([]);
    let loading=true;
    const skinCategories = Object.keys(skins); // Dynamically get categories from fetched data
    async function ShowAllSkins() {
		const skinMarketCon=await skinMarket();

		
        try {
            const skinIds: string[] = await skinMarketCon.methods.getAllSkins().call();
    
            const skinData: CartItem[] = [];			
            for (const id of skinIds) {
					
				//add game skins 
				const gamePrice=await skinMarketCon.methods.getSkinPriceFromGame(id).call();
				const sellerObj: Seller = {
					id: "0",
					username: "Game",
					walletAddress: "Game",
					price: gamePrice ? Number(gamePrice) :0,
					gameCompany: "Game",
				};
				const potentialCard=skinsFromJson.find(x => Number(x.idx) === Number(id));
				let card:CartItem;
				if(potentialCard){
						
					card = {
					idx: id,
					image: potentialCard.image,
					name: potentialCard.name,
					category: potentialCard.category,
					market_price: potentialCard.market_price,
					discount: potentialCard.discount,
					seller: sellerObj,
					}
				}
				else {
					card={
							idx: id,
							image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
							name: "braveheart",
							category: "category",
							market_price: 2.19,
							discount: 20,
							seller: sellerObj,
						}

				}					
				skinData.push(card);
                const sellersOfSkin: Seller[][] = await skinMarketCon.methods.getSellers(id).call();
				console.log("Seller of skins:",sellersOfSkin);
                const category = "knife"; // Replace with actual logic to determine the category
                // Loop through sellersOfSkin array and create seller objects
                for (const seller of sellersOfSkin) {	
                    const sellerObj: Seller = {
                        id: seller[0].toString(),
                        username: seller[1].toString(),
                        walletAddress: seller[2].toString(),
                        price: parseFloat(seller[3].toString()),
                        gameCompany: seller[4].toString(),
                    };
					console.log("Card render horahe");
                    const potentialCard=skinsFromJson.find(x => Number(x.idx) === Number(id));
					let card:CartItem;
					if(potentialCard){
							
						card = {
						idx: id,
						image: potentialCard.image,
						name: potentialCard.name,
						category: potentialCard.category,
						market_price: potentialCard.market_price,
						discount: potentialCard.discount,
						seller: sellerObj,
						}
					}
					else {
						card={
							idx: id,
							image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
							name: "braveheart",
							category: "category",
							market_price: 2.19,
							discount: 20,
							seller: sellerObj,
							}

					}		

                    skinData.push(card);
					console.log("SkinData : ",skinData);
                }

            }
			console.log(skinData);
            
            setSkins(skinData);
            loading=false;
        } catch (error) {
            console.error("Error fetching skins:", error);
            loading=false;
        }
    }
	const { account } = useCurrentAccount((state) => state);

    useEffect(() => {
		
		(async()=>{
			if(account!==null){
				ShowAllSkins();
			}			
		}
		)();	
    }, [account]);

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
                        title={"category"}
                        skins={skins}
                        key={index}
                    />
                ))
            )}
        </div>
    );
}

export default CollectionOverview;
