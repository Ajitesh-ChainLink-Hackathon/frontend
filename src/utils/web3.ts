import Web3 from "web3";
import skinMarketABI from "../components/abis/skinMarketABI.json";
import skinOwnerABI from "../components/abis/skinOwnershipABI.json";

// Define the Ethereum interface with the request method
interface Ethereum {
	request: (args: {
		method: string;
		params?: Array<unknown>;
	}) => Promise<unknown>;
}

// Extend the Window interface to include ethereum
interface Window {
	ethereum?: Ethereum;
}

declare let window: Window;
export function Utils(){
	
	if(window.ethereum){
		const web3=new Web3(window.ethereum);
		return web3;
	}
}
export const getAccounts = async () => {
	if (window.ethereum) {
		try {
			// Request account access if needed
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			// Type assertion to tell TypeScript that accounts is an array of strings
			if (Array.isArray(accounts) && typeof accounts[0] === "string") {
				return accounts;
			} else {
				throw new Error("Failed to retrieve account");
			}
		} catch (error) {
			throw new Error(`User denied account access: ${error}`);
		}
	} else {
		throw new Error(
			"MetaMask is not installed. Please install MetaMask and try again."
		);
	}
};

export const skinMarket = () => {
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		const skinMarketAdd = "0x9B4d2b5609Bc13f8419cDE5CD3f66Ee713E77009";
		return new web3.eth.Contract(skinMarketABI, skinMarketAdd);
	} else {
		throw new Error(
			"MetaMask is not installed. Please install MetaMask and try again."
		);
	}
};
export const skinOwner=()=>{
	if (window.ethereum) {
		const web3 = new Web3(window.ethereum);
		const skinOwnershipAdd = "0x7161636060D3f7692a3CF2ED395A29d05763b2e4";
		return new web3.eth.Contract(skinOwnerABI, skinOwnershipAdd);
	} else {
		throw new Error(
			"MetaMask is not installed. Please install MetaMask and try again."
		);
	}
}
