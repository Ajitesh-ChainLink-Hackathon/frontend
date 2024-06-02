import axios from 'axios';
import Web3 from 'web3';

const web3 = new Web3();
const COINGECKO_API_URL = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

export const getEthPriceInUSD = async (): Promise<number | null> => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: 'ethereum',
        vs_currencies: 'usd'
      }
    });

    const ethPriceInUSD = response.data.ethereum.usd;
    return ethPriceInUSD;
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    return null
    }
};


export const convertWeiToUSD = async (wei: string): Promise<number | null> => {
    try {
      const ethPriceInUSD = await getEthPriceInUSD();
      if (!ethPriceInUSD) {
        throw new Error('Failed to fetch Ethereum price');
      }
  
      const etherValue = web3.utils.fromWei(wei, 'ether');
      const usdValue = parseFloat(etherValue) * ethPriceInUSD;
  
      return usdValue;
    } catch(e){
        console.log(e);
        return null;
    }
}
