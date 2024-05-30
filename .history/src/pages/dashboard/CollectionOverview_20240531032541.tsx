import "./style.scss";
import Collection from '../../components/dashboard/collection/Collection';
import skinProducts from '../../utils/skins.products.json';
import Web3 from "web3";
import skinMarketABI from "../../abis/SkinMarketABI.json";



function CollectionOverview() {
	const skinCategories = Object.keys(skinProducts);
	
	let skins;
	let connectedAccount;
	let sellers;
	const skinMarketAdd ="0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
	const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache

	async function ShowAllSkins() {
		const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
		try {
		  const skinIds = await skinMarket.methods.getAllSkins().call();
		 
		} catch (error) {
		  console.error("Error fetching skins:", error);
		}
	}
	

	return (
		<div className='collection__overview'>
			<h1>Skin Collections</h1>
			{skinCategories.map((categories, index) => (
				<Collection
               link={`/dashboard/${categories}`}
					icon={`/icons/${categories}.svg`}
					title={categories}
					skins={skinProducts[categories as keyof typeof skinProducts].slice(0, )}
					key={index}
				/>
			))}
		</div>
	);
}
export default CollectionOverview;
