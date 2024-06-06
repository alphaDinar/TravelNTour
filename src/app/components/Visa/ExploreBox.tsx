import Image from 'next/image';
import styles from '../../styles/visa.module.css';
import { FC } from 'react';

type ExploreBoxProps = {
  title : string,
  smallTitle : string,
  imgSet : string[]
}

const tes = "https://static1.s123-cdn-static-a.com/uploads/7452631/2000_6632efa942237.jpg?width=1600";


const ExploreBox : FC<ExploreBoxProps> = ({title, smallTitle, imgSet}) => {
  return ( 
    <section className={styles.exploreBox} id="hor">
        <header>
          <strong>Explore New Educational Horizons</strong>
          <small>Expand your horizons with Pryme Travels. Study abroad and experience new cultures, languages, and opportunities.</small>
        </header>

        <section className={styles.gallery}>
          {imgSet.map((el,i)=>(
            <div className={styles.imgBox}>
              <Image src={el} alt="" fill className="cover" />
            </div>
          ))}
        </section>
      </section>
   );
}
 
export default ExploreBox;