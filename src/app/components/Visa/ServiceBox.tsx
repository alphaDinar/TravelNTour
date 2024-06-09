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
        {serviceList.map((service, i) => (
          <div className={styles.service} key={i}>
            <div className={styles.imgBox}>
              <Image alt="" src={service.img} fill className="cover" />
            </div>
            <article>
              <strong>{service.tag}</strong>
              <span>{service.text}</span>
            </article>
          </div>
        ))}
      </section>
    </section>
  );
}

export default ServiceBox;