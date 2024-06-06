import Image from 'next/image';
import styles from '../../styles/visa.module.css';
import { FC } from 'react';

interface defType extends Record<string, any> { };
type ServiceBoxProps = {
  serviceList : defType[]
}
const ServiceBox : FC<ServiceBoxProps> = ({serviceList}) => {
  const tes = "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717600037/travelntour/azer1_mpdyeo.jpg";

  return (
    <section className={styles.serviceBox} id="hor">
      <header>
        <strong>Our Services</strong>
      </header>

      <section className={styles.services}>
        {Array(8).fill('a').map((el, i) => (
          <div className={styles.service}>
            <div className={styles.imgBox}>
              <Image alt="" src={tes} fill className="cover" />
            </div>
            <article>
              <strong>Visa Assistance</strong>
              <span>
                Streamline your visa process with professional guidance and support.
              </span>
            </article>
          </div>
        ))}
      </section>
    </section>
  );
}

export default ServiceBox;