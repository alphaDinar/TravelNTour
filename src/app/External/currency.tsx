import axios from 'axios';

const key = "dc5d8ab51de1b1f60805961c";
export const getExchangeRate = async (currencyTag: string) => {
  const url = `https://v6.exchangerate-api.com/v6/${key}/pair/USD/${currencyTag}`;

  const response = await axios.get(url)
  return response.data['conversion_rate'].toFixed(2);
}

export const convertToCedis = async (amount: number) => {
  const url = `https://v6.exchangerate-api.com/v6/${key}/pair/USD/GHS`;

  const response = await axios.get(url)
  return (response.data['conversion_rate'] * amount).toFixed(2);
}