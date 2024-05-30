import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';
import skinProducts from '../../utils/skins.products.json';
import Web3 from "web3";
import skinMarketABI from '../../abis/skinMarketABI.json';


function CollectionOverview() {
	const skinCategories = Object.keys(skinProducts);
	
	let skins;
	let connectedAccount;
	const skinMarketAdd ="0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
	const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache
	let sellers;

	async function ShowAllSkins() {
		const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
		try {
		  const skinIds: any[]= await skinMarket.methods.getAllSkins().call();
		  skinIds.forEach(async(x)=>{
			const sellersOfSkin = await skinMarket.methods.getSellers(x).call();
			//add this to sellers[sellersOfSkin]
			
		  })
		 
		} catch (error) {
		  console.error("Error fetching skins:", error);
		}
	}
	ShowAllSkins();
	

	return (
		<div className='collection__overview'>
			<h1>Skin Collections</h1>
			{skinCategories.map((categories, index) => (
				<Collection
				link={`/dashboard/${categories}`}
					icon={`/icons/${categories}.svg`}
					title={categories}
					skins={[
						{
							"idx": "1",
							"image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
							"name": "braveheart",
							"category": "knife",
							"market_price": 2.19,
							"discount": 20,
							"seller": {
								"id":"1", 
								"username": "John Doe",
								"gameCompany": "Acme Games",
								"price": 1.752,
								"walletAddress": "0x1234567890abcdef"
							}
						}
					]}
					key={index}
				/>
			))}
		</div>
	);
}
export default CollectionOverview;
