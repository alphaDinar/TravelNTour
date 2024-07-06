'use client';
import Image from 'next/image';
import styles from './topNav.module.css';
import { currencyList } from '@/app/External/lists';
import { useCurrency } from '@/app/contexts/currencyContext';
import { useExchangeRate } from '@/app/contexts/exchangeRateContext';
import { getExchangeRate } from '@/app/External/currency';

type currency = {
  tag: string,
  symbol: string,
  img: string,
}

const CurrencyBox = () => {
  const { setExchangeRate } = useExchangeRate();
  const { currency, setCurrency } = useCurrency();

  const handleCurrency = async (item: currency) => {
    setCurrency(item);
    const exchangeRate = await getExchangeRate(item.tag);
    setExchangeRate(exchangeRate);
  }

  return (
    <article className={styles.currencyBox}>
      <p><Image alt='' className='contain' src={currency.img} width={20} height={30} /> <span>{currency.tag} | {currency.symbol}</span></p>
      <ul>
        {currencyList.filter((item) => item.tag !== currency.tag).map((item, i) => (
          <li key={i} onClick={() => handleCurrency(item)}><Image alt='' className='contain' src={item.img} width={20} height={30} /> <span>{item.tag} | {item.symbol}</span></li>
        ))}
      </ul>
    </article>
  );
}

export default CurrencyBox;