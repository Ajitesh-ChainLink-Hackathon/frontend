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
    }
}