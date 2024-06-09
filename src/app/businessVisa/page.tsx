'use client';
import { useState } from 'react';
import TopNav from '../components/TopNav/TopNav';
import styles from '../styles/visa.module.css'
import business from '../../../public/business.jpg';
import Image from 'next/image';
import ServiceBox from '../components/Visa/ServiceBox';
import FooterBox from '../components/FooterBox/FooterBox';

const BusinessVisa = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const serviceList = [
    { tag: "Customized Travel Itineraries", text: "Tailored travel plans for business executives.", img: "https://static1.s123-cdn-static-a.com/ready_uploads/media/3701701/400_5e31be16753ab.jpg" },
    { tag: "VIP Airport Assistance", text: "Exclusive services for hassle-free airport experiences.", img: "https://static1.s123-cdn-static-a.com/uploads/7452631/400_6632fe4dbf336.jpg" },
    { tag: "Luxury Accommodation Bookings", text: "Premium hotel reservations for corporate travelers.", img: "https://static1.s123-cdn-static-a.com/uploads/7452631/400_6632fe66e8e42.jpg" }
  ]

  return (
    <main>
      <TopNav />

      <section className={styles.formBox} id="horMargin">
        <section className={styles.left}>
          <header>
            <strong>Business Visas</strong>
            <small>Pryme Travels connects businesses and professionals with the world, fostering international partnerships and growth through strategic travel solutions.</small>
          </header>

          <hr />

          <form>
            <p>
              <span>Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </p>

            <p>
              <span>Phone</span>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </p>

            <p>
              <span>E-mail</span>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </p>

            <p>
              <span>Message</span>
              <textarea></textarea>
            </p>

            <button>Contact Us</button>
          </form>
        </section>
        <section className={styles.right}>
          <Image alt="" src={business} fill className="cover" />
        </section>
      </section>

      <ServiceBox serviceList={serviceList} />

      <FooterBox />
    </main>
  );
}

export default BusinessVisa;