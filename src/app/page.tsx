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
import { fireStoreDB } from "@/Firebase/base";
import { collection, getDocs } from "firebase/firestore";
import { categoryList } from "./External/assets";
import { collaboratorList, paymentMethodList } from "./External/lists";

const Home = async () => {
  // const categories = (await getDocs(collection(fireStoreDB, 'Categories/'))).docs.map((el) => ({ id: el.id, ...el.data() }));
  const tours = (await getDocs(collection(fireStoreDB, 'Tours/'))).docs.map((el) => ({ id: el.id, ...el.data() }));

  return (
    <main>
      <TopNav />
      <HeadBox tours={tours} />

      <section className={styles.sizedBox}></section>
      <PayBox title={"Our Collaborators"} itemList={collaboratorList} />

      <CategoryBox categories={categoryList} />
      <TrendingBox tours={tours} />


      <DestinationBox tours={tours} />
      <ContactBox />
      <TourBox />
      <PayBox title={'You Can Pay With'} itemList={paymentMethodList} />

      <section>
        <FooterBox />
      </section>
    </main>
  );
}

export default Home;