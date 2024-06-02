import React, { useState, useEffect } from "react";
import "./style.scss";
import Collection from "../../components/dashboard/collection/Collection";
import { skinMarket } from "../../utils/web3";
import skinProducts from "../../utils/skins.products.json";

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
	[category: string]: Skin[];
}

const CollectionOverview: React.FC = () => {
	const [skins, setSkins] = useState<SkinsByCategory>({});
	const skinCategories = Object.keys(skinProducts);

	// const skinMarketAdd = ""; // Address from .env file
	// const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache

	// async function ShowAllSkins() {
	// 	const skinMarket = new web3.eth.Contract(
	// 		skinMarketABI,
	// 		skinMarketAdd
	// 	);
	// 	try {
	// 		const skinIds: string[] = await skinMarket.methods
	// 			.getAllSkins()
	// 			.call();

	// 		const skinData: SkinsByCategory = {};
	// 		for (const id of skinIds) {
	// 			const sellersOfSkin: Seller[][] = await skinMarket.methods
	// 				.getSellers(id)
	// 				.call();

	// 			const category = "knife"; // Replace with actual logic to determine the category

	// 			if (!skinData[category]) {
	// 				skinData[category] = [];
	// 			}

	// 			// Loop through sellersOfSkin array and create seller objects
	// 			for (const seller of sellersOfSkin) {
	// 				console.log(
	// 					"ID :",
	// 					seller[0].toString(),
	// 					"\nuserNAme: ",
	// 					seller[1]
	// 				);
	// 				const sellerObj = {
	// 					id: seller[0].toString(), // Assuming id is the first element
	// 					username: seller[1].toString(), // Assuming username is the second element
	// 					walletAddress: seller[2].toString(), // Assuming wallet address is the third element
	// 					price: parseFloat(seller[3].toString()), // Assuming price is the fourth element
	// 					gameCompany: seller[4].toString(), // Assuming game company is the fifth element
	// 				};

	// 				skinData[category].push({
	// 					idx: id,
	// 					image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
	// 					name: "braveheart",
	// 					category: category,
	// 					market_price: 2.19,
	// 					discount: 20,
	// 					seller: sellerObj,
	// 				});
	// 			}
	// 		}
	// 		setSkins(skinData);
	// 	} catch (error) {
	// 		console.error("Error fetching skins:", error);
	// 	}
	// }

	useEffect(() => {
		// ShowAllSkins();
		(async () => {
			try {
				const skinIdContract = skinMarket();
				const skinIds: number[] = await skinIdContract.methods
					.getAllSkins()
					.call();
				skinIds.forEach(async (skinId) => {
					const t = await skinIdContract.methods
						.getSellers(skinId)
						.call();
					console.log(t);
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<div className="collection__overview">
			<h1>Skin Collections</h1>
			{/*{skinCategories.map((category, index) => (
				<Collection
					link={`/dashboard/${category}`}
					icon={`/icons/${category}.svg`}
					title={category}
					skins={skins[category] || []}
					key={index}
				/>
			))} */}
		</div>
	);
};

export default CollectionOverview;
