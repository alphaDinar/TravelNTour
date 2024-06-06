'use client';
import TopNav from "../components/TopNav/TopNav";
import styles from '../styles/visa.module.css';
import tourist from '../../../public/tourist.jpg';
import Image from "next/image";
import { useState } from "react";

const TouristVisa = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <main>
      <TopNav />

      <section className={styles.formBox} id="horMargin">
        <section className={styles.left}>
          <header>
            <strong>Student Visa</strong>
            <small>Pryme Travels empowers students to explore the world and gain a global perspective through education and travel.</small>
            <button>Read More</button>
          </header>

          <hr />

          <form>
            <p>
              <span>Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </p>

            <p>
              <span>Phone</span>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </p>

            <p>
              <span>E-mail</span>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>

            <button>Contact Us</button>
          </form>
        </section>
        <section className={styles.right}>
          <Image alt="" src={tourist} fill className="cover" />
        </section>
      </section>

      <section className={styles.exploreBox} id="hor">
        <header>
          <strong>Explore New Educational Horizons</strong>
          <small>Expand your horizons with Pryme Travels. Study abroad and experience new cultures, languages, and opportunities.</small>
        </header>
      </section>
    </main>
  );
}

export default TouristVisa;