import { create } from 'zustand';

const example = [
   {
       "idx": "6",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/n2hrhsy3gzu5ktrxa1ix.avif",
       "name": "Valkyrie",
       "price": 4.56,
       "category": "knife",
       "market_price": 7.89,
       "discount": 12,
       "seller": {
           "id": "28939qq",
           "username": "Sarah Wilson",
           "gameCompany": "Riot Games",
           "price": 6.9432,
           "walletAddress": "0x0123456789abcdef"
       }
   },
   {
       "idx": "7",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/zduwdj9dkxuyonebkbnv.avif",
       "name": "MoonBlade",
       "price": 4.56,
       "category": "knife",
       "market_price": 42.89,
       "discount": 62,
       "seller": {
           "id": "28939qq",
           "username": "Michael Brown",
           "gameCompany": "Electronic Arts",
           "price": 16.2982,
           "walletAddress": "0xfedcba9876543210"
       }
   },
   {
       "idx": "4",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/ut2rzimqowkgmippyhl4.avif",
       "name": "Excalibur",
       "price": 4.56,
       "category": "knife",
       "market_price": 2.5,
       "discount": 34,
       "seller": {
           "id": "28939qq",
           "username": "Alice Williams",
           "gameCompany": "Ubisoft",
           "price": 1.65,
           "walletAddress": "0xfedcba9876543210"
       }
   },
   {
       "idx": "8",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735696/gloves/r7yrw4h5ca16c3xpsk5c.avif",
       "name": "Gripmaster",
       "price": 4.56,
       "category": "gloves",
       "market_price": 34.65,
       "discount": 64,
       "seller": {
           "id": "28939qq",
           "username": "John Smith",
           "gameCompany": "Acme Games",
           "price": 12.474,
           "walletAddress": "0x1234567890abcdef"
       }
   }
]

type Seller = {
	id: string;
	username: string;
	gameCompany: string;
	price: number;
	walletAddress: string;
};

export type SellingItem = {
	idx: string;
	image: string;
   price: number;
	name: string;
	category: string;
	market_price: number;
	discount: number;
	seller: Seller;
};

interface SellingItemState {
	sellingItems: SellingItem[];
   newSellingItem: SellingItem | null;
   setNewSellingItem: (item: SellingItem | null)=> void;
	addSellingItem: (item: SellingItem) => void;
	removeSellingItem: (id: string) => void;
}

const initialState = {
	sellingItems:example,
   newSellingItem: null
};

const useSellingItems = create<SellingItemState>()((set) => ({
	...initialState,
	addSellingItem: (item) =>
		set((state) => ({ sellingItems: [...state.sellingItems, item] })),
	removeSellingItem: (id) =>
		set((state) => {
			const newItems = state.sellingItems.filter((item) => item.idx !== id);
			return {
				sellingItems: newItems,
			};
		}),
      setNewSellingItem: (item)=>set(()=> ({newSellingItem: item}))
}));

export default useSellingItems;
