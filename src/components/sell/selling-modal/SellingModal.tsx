import { Fragment } from "react/jsx-runtime";
import "./style.scss";
import useSellingItems from "../../../hooks/useSellingItems.zustand";

function SellingModal() {
	const newSellingItem = useSellingItems((state) => state.newSellingItem);
	const setNewSellingItem = useSellingItems(
		(state) => state.setNewSellingItem
	);

	const handleCancel = () => {
		setNewSellingItem(null);
	};
	return (
		newSellingItem && (
			<Fragment>
				<div className="modal__overlay" onClick={handleCancel} />
				<article className="selling__modal">
					<span className="cancel" onClick={handleCancel}>
						<img src="/icons/cancel.svg" alt="" />
					</span>
					<img
						className="modal__img"
						src={newSellingItem.image}
						alt={newSellingItem.name}
					/>
					<h2>{newSellingItem.name}</h2>
					<div className="status">
						<img src="/icons/trade.svg" alt="" />
						<p>Tradable</p>
					</div>
					<div className="input__price">
						<label htmlFor="">Selling price</label>
						<input
							type="number"
							placeholder="Type your preferred price"
						/>
					</div>
					<div className="details">
						<div>
							<span>Game Company</span>
							<p>{newSellingItem.seller.gameCompany}</p>
						</div>
						<div>
							<span>Market price</span>
							<p>${newSellingItem.price}</p>
						</div>
					</div>
					<button className="confirm__btn">Confirm</button>
				</article>
			</Fragment>
		)
	);
}
export default SellingModal;

// const skinImages = {
// 	0: id0,
// 	1: id1,
// 	2: id2,
// 	3: id3,
// };

// function SellSkinPage() {
// 	const { userName, skinId } = useParams();
// 	const [connectedAccount, setConnectedAccount] = useState(null);
// 	const [averagePrice, setAveragePrice] = useState(0);
// 	const [price, setPrice] = useState("");
// 	const navigate = useNavigate();
// 	const skinMarketAddress = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
// 	const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache

// 	useEffect(() => {
// 		connectWallet();
// 		fetchAveragePrice();
// 	}, []);

// 	async function connectWallet() {
// 		try {
// 			const accounts = await web3.eth.getAccounts();
// 			setConnectedAccount(accounts[0]);
// 		} catch (error) {
// 			console.error("Error connecting wallet:", error);
// 		}
// 	}

// 	async function fetchAveragePrice() {
// 		const skinMarket = new web3.eth.Contract(
// 			skinMarketABI,
// 			skinMarketAddress
// 		);
// 		try {
// 			const sellers = await skinMarket.methods
// 				.getSellers(skinId)
// 				.call();
// 			if (sellers.length > 0) {
// 				const totalPrices = sellers.reduce(
// 					(total, seller) =>
// 						total +
// 						parseFloat(
// 							web3.utils.fromWei(
// 								seller.price.toString(),
// 								"ether"
// 							)
// 						),
// 					0
// 				);
// 				const average = totalPrices / sellers.length;
// 				setAveragePrice(average);
// 			}
// 		} catch (error) {
// 			console.error("Error fetching average price:", error);
// 		}
// 	}

// 	async function sellSkin() {
// 		const skinMarket = new web3.eth.Contract(
// 			skinMarketABI,
// 			skinMarketAddress
// 		);
// 		try {
// 			const amountInWei = web3.utils.toWei(price, "ether");
// 			console.log(
// 				"userName:",
// 				userName,
// 				"\nconnectedAccount:",
// 				connectedAccount,
// 				"\nPrice:",
// 				amountInWei
// 			);

// 			// Estimate gas limit
// 			const gasLimit = await skinMarket.methods
// 				.sellSkin(skinId, userName, connectedAccount, amountInWei)
// 				.estimateGas({ from: connectedAccount });

// 			console.log("userName:", userName);
// 			console.log("connectedAccount:", connectedAccount);
// 			console.log("gasLimit:", gasLimit);
// 			console.log("price:", amountInWei);
// 			console.log("gas price:", await web3.eth.getGasPrice());

// 			// Send the transaction
// 			await skinMarket.methods
// 				.sellSkin(skinId, userName, connectedAccount, amountInWei)
// 				.send({
// 					from: connectedAccount,
// 					gas: gasLimit,
// 					gasPrice: await web3.eth.getGasPrice(),
// 				});

// 			// Navigate to the user dashboard
// 			navigate(`/${userName}/Sell`);
// 		} catch (error) {
// 			console.error("Error selling skin:", error);
// 		}
// 	}

// 	return (
// 		<div>
// 			<h2>{`Sell Skin ${skinId}`}</h2>
// 			<Card style={{ width: "18rem" }}>
// 				<Card.Img variant="top" src={skinImages[skinId]} />
// 				<Card.Body>
// 					<Card.Title>{`Skin ID: ${skinId}`}</Card.Title>
// 					<Card.Text>{`Current Average Price: ${averagePrice} ETH`}</Card.Text>
// 					<Form>
// 						<Form.Group controlId="formPrice">
// 							<Form.Label>Price (ETH)</Form.Label>
// 							<Form.Control
// 								type="number"
// 								value={price}
// 								onChange={(e) =>
// 									setPrice(e.target.value)
// 								}
// 								placeholder="Enter price"
// 							/>
// 						</Form.Group>
// 						<Button variant="primary" onClick={sellSkin}>
// 							SELL
// 						</Button>
// 					</Form>
// 				</Card.Body>
// 			</Card>
// 		</div>
// 	);
// }

// async function fetchUserSkins() {
//     const skinOwnership = new web3.eth.Contract(skinOwnershipABI, skinOwnershipAddress);
//     try {
//       const skins = await skinOwnership.methods.getUserSkins(userName).call();
//       setUserSkins(skins);
//     } catch (error) {
//       console.error("Error fetching user skins:", error);
//     }
//    }
