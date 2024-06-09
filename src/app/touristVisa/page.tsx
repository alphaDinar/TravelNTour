'use client';
import TopNav from "../components/TopNav/TopNav";
import styles from '../styles/visa.module.css';
import tourist from '../../../public/tourist.jpg';
import Image from "next/image";
import { useState } from "react";
import ExploreBox from "../components/Visa/ExploreBox";
import FooterBox from "../components/FooterBox/FooterBox";

const TouristVisa = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const imgSet = [
    "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717847997/travelntour/230828105142-01-instagram-respectful-tourism-top_iwviqa.jpg",
    "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717848142/travelntour/kakum_canopy_walk_eyy8q2.jpg",
    "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717848067/travelntour/1440x810_cmsv2_9fd3e55d-8994-5043-a421-db603f303be9-7200970_rgzi8r.webp",
    "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717848150/travelntour/London_Eye_-_tunliweb.no_h6j0e2.jpg",
    "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717848071/travelntour/2017_05_09_26596_1494298189._large_syxhis.jpg",
    "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717848185/travelntour/247WallSt.com-247WS-549930-imageforentry1-pc0_puzlw3.webp"
  ]

  return (
    <main>
      <TopNav />

      <section className={styles.formBox} id="horMargin">
        <section className={styles.left}>
          <header>
            <strong>Tourist Visas</strong>
            <small>Pryme Travels unlocks the world for curious travelers, igniting a global perspective through exploration and unforgettable experiences</small>
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

            <p>
              <span>Message</span>
              <textarea></textarea>
            </p>

            <button>Contact Us</button>
          </form>
        </section>
        <section className={styles.right}>
          <Image alt="" src={tourist} fill className="cover" />
        </section>
      </section>

      <section>
        <ExploreBox
          title={"Unlock The Tourist In You"}
          smallTitle={"Discover a world of wonder with Pryme Travels. Immerse yourself in vibrant cultures, captivating languages, and unforgettable experiences."}
          imgSet={imgSet} />

        <FooterBox />
      </section>
    </main>
  );
}

export default TouristVisa;