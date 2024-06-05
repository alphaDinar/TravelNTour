import Image from 'next/image';
import styles from './payBox.module.css';
import { FC } from 'react';

interface defType extends Record<string, any> { };
type PayBoxProps = {
  title: string,
  itemList: defType[]
}
const PayBox: FC<PayBoxProps> = ({ title, itemList }) => {
  return (
    <section className={styles.payBox}>
      <h4>{title}</h4>
      <div>
        {Array(4).fill('a').map((counter, ci) => (
          <article key={ci}>
            {itemList.map((el, i) => (
              <Image alt='' width={130} height={130} src={el.img} key={i} />
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

export default PayBox;