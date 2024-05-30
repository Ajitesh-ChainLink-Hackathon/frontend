import React, { useState, useEffect } from 'react';
import './style.scss';
import Collection from '../../components/dashboard/collection/Collection';
import skinProducts from '../../utils/skins.products.json';
import Web3 from "web3";
import skinMarketABI from "../../abis/SkinMarketABI.json";
import { CartItem } from './types';

function CollectionOverview() {
  const skinCategories = Object.keys(skinProducts);
  const [skins, setSkins] = useState<CartItem[]>([]);
  const skinMarketAdd = "0x0DedDe527e2B24a6c2B3bF5F3E7488517E37F3AD"; // Address from .env file
  const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545"); // Ganache

  useEffect(() => {
    async function fetchSkins() {
      const skinMarket = new web3.eth.Contract(skinMarketABI, skinMarketAdd);
      try {
        const skinIds = await skinMarket.methods.getAllSkins().call();
        const allSellers = await Promise.all(skinIds.map(async (skin: any) => {
          const sellers = await skinMarket.methods.getSellers(skin.id).call();
          return sellers.map((seller: any) => ({
            id: skin.id.toString(),
            username: seller.userName,
            gameCompany: "Example Company", // Assign a default value or fetch if available
            price: parseFloat(Web3.utils.fromWei(seller.price.toString(), 'ether')),
            walletAddress: seller.walletAddress,
          }));
        }));

        const randomItems: CartItem[] = allSellers.flat().map((seller: Seller, index: number) => ({
          idx: (index + 1).toString(),
          image: "https://res.cloudinary.com/duepebytx/image/upload/v1716734241/knife/yjj89audytmrsni5pzlc.avif",
          name: `Item ${index + 1}`,
          category: "category", // Replace with actual category if available
          market_price: seller.price,
          discount: Math.floor(Math.random() * 50) + 1, // Random discount between 1 and 50
          seller,
        }));

        setSkins(randomItems);
      } catch (error) {
        console.error("Error fetching skins:", error);
      }
    }

    fetchSkins();
  }, []);

  const getSkinData = (category: string) => {
    return skins.filter(skin => skin.category === category);
  };

  return (
    <div className='collection__overview'>
      <h1>Skin Collections</h1>
      {skinCategories.map((category, index) => (
        <Collection
          link={`/dashboard/${category}`}
          icon={`/icons/${category}.svg`}
          title={category}
          skins={getSkinData(category)}
          key={index}
        />
      ))}
    </div>
  );
}

export default CollectionOverview;
