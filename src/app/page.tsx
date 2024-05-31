import TopNav from "./components/TopNav/TopNav";
import DestinationBox from "./home/DestinationBox/DestinationBox";
import HeadBox from "./home/HeadBox/HeadBox";
import styles from './home.module.css';
import CategoryBox from "./home/CategoryBox/CategoryBox";
import TrendingBox from "./home/TrendingBox/TrendingBox";
import TourBox from "./home/TourBox/TourBox";
import ContactBox from "./home/ContactBox/ContactBox";
import PayBox from "./home/PayBox/PayBox";
import FooterBox from "./components/FooterBox/FooterBox";

const Home = () => {
  return (
    <main>
      <TopNav />
      <HeadBox />

      <section className={styles.sizedBox}></section>

      <CategoryBox />
      <TrendingBox />
      <DestinationBox />
      <ContactBox />
      <TourBox />
      <PayBox />

      <section>
        <FooterBox />
      </section>
    </main>
  );
}

export default Home;