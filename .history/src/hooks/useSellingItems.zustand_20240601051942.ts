import { create } from 'zustand';

const example = [
   {
       "idx": "6",
       "player_name":"Ajitesh",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/n2hrhsy3gzu5ktrxa1ix.avif",
       "name": "Valkyrie",
       "price": 4.56,
       "category": "knife",
       "game_price": 7.89,
       "discount": 12,
       
   },
   {
       "idx": "7",
       "player_name":"Shritesh",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/zduwdj9dkxuyonebkbnv.avif",
       "name": "MoonBlade",
       "price": 4.56,
       "category": "knife",
       "game_price": 42.89,
       "discount": 62,
       
   },
   {
       "idx": "4",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716734240/knife/ut2rzimqowkgmippyhl4.avif",
       "name": "Excalibur",
       "price": 4.56,
       "category": "knife",
       "game_price": 2.5,
       
   },
   {
       "idx": "8",
       "player_name":"Sebastian",
       "image": "https://res.cloudinary.com/duepebytx/image/upload/v1716735696/gloves/r7yrw4h5ca16c3xpsk5c.avif",
       "name": "Gripmaster",
       "category": "gloves",
       "game_price": 34.65,
       
   }
]


export type SellingItem = {
	idx: string;
    player_name:string;
	image: string;
	name: string;
	category: string;
	game_price: number;
	
    
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
