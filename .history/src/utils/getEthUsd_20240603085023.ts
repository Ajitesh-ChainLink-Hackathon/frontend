import axios from 'axios';
import Web3 from 'web3';

//implemented chainLinks price feeds but didn't work well at end

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

    const ethPriceInUSD = response.data.USD;
    return ethPriceInUSD;
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    return null
    }
};


export const convertWeiToUSD = (wei: string): string => {  
  
      const etherValue = web3.utils.fromWei(wei, 'ether');
      return etherValue;
    
    
}
