import styles from './tourBox.module.css';
import bg from '../../../../public/tourBg.jpg';
import Image from 'next/image';
import Link from 'next/link';

const TourBox = () => {
  return (
    <section className={styles.tourBox} id='horMargin'>
      <Image alt='' src={bg} fill />

      <section className={styles.con}>
        <article>
          <h3>Tour The World And Experience</h3>
          <h3>Unforgettable Journeys</h3>
          <span>To kickstart your digital adventures with Pryme Tourism</span>
        </article>
        <Link href={''}>Check All</Link>
      </section>
    </section>
  );
}

export default TourBox;