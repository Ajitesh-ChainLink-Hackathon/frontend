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
    const [skins, setSkins] = useState<SkinsByCategory>({});
    let loading=true;
    const skinCategories = Object.keys(skins); // Dynamically get categories from fetched data
    async function ShowAllSkins() {
		const skinMarketCon=await skinMarket();

		
        try {
            const skinIds: string[] = await skinMarketCon.methods.getAllSkins().call();
    
            const skinData: SkinsByCategory = {};



			
            for (const id of skinIds) {

				if (!skinData["category"]) {
                    skinData["category"] = [];
                }	
				//add game skins 
				const gamePrice=await skinMarketCon.methods.getSkinPriceFromGame(id).call();
				const sellerObj: Seller = {
					id: "0",
					username: "Game",
					walletAddress: "Game",
					price: gamePrice ? Number(gamePrice) :0,
					gameCompany: "Game",
				};
				const card: CartItem = skinsFromJson.find(x => Number(x.idx) === Number(id))
					? {
						idx: id,
						image: skinsFromJson.find(x => Number(x.idx) === Number(id))!.image,
						name: skinsFromJson.find(x => Number(x.idx) === Number(id))!.name,
						category: skinsFromJson.find(x => Number(x.idx) === Number(id))!.category,
						market_price: skinsFromJson.find(x => Number(x.idx) === Number(id))!.market_price,
						discount: skinsFromJson.find(x => Number(x.idx) === Number(id))!.discount,
						seller: sellerObj,
					}
					: {
						idx: id,
						image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
						name: "braveheart",
						category: "category",
						market_price: 2.19,
						discount: 20,
						seller: sellerObj,
					};
					console.log("card:",card);

				skinData["category"].push(card);

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
                    const card: CartItem = skinsFromJson.find(x => Number(x.idx) === Number(id))
							? {
								idx: id,
								image: skinsFromJson.find(x => Number(x.idx) === Number(id))!.image,
								name: skinsFromJson.find(x => Number(x.idx) === Number(id))!.name,
								category: skinsFromJson.find(x => Number(x.idx) === Number(id))!.category,
								market_price: skinsFromJson.find(x => Number(x.idx) === Number(id))!.market_price,
								discount: skinsFromJson.find(x => Number(x.idx) === Number(id))!.discount,
								seller: sellerObj,
							}
							: {
								idx: id,
								image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
								name: "braveheart",
								category: category,
								market_price: 2.19,
								discount: 20,
								seller: sellerObj,
							};
							console.log("card:",card);



					// {
                    //     idx: id,
                    //     image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
                    //     name: "braveheart",
                    //     category: category,
                    //     market_price: 2.19,
                    //     discount: 20,
                    //     seller: sellerObj,
                    // };

                    skinData[category].push(card);
					console.log("SkinData : ",skinData);
                }




            }
            
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
