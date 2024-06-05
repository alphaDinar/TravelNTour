import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import styles from './destinationBox.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getRealDate } from '@/app/External/time';

interface defType extends Record<string, any> { };
type DestinationBoxProps = {
  tours: defType[]
}
const DestinationBox: FC<DestinationBoxProps> = ({ tours }) => {
  const snap = (tour: defType) => {
    return <Link href={{ pathname: '/viewTour', query: { tid: tour.id } }} className={styles.snap}>
      <Image alt='' src={tour.image.url} fill></Image>
      <article className={styles.sheet}>
        <legend id='temp'>4.5 <MdStar /></legend>
        <p>
          <span>{tour.id}</span>
          <small>{getRealDate(tour.startDate)}</small>
        </p>
      </article>
    </Link>
  }

  const place = {
    rating: 4.5,
    location: 'Malaysia',
    startDate: '23rd May'
  }

  return (
    <section id='box' className={styles.destinationBox}>
      <header id='titleBox'>
        <div>
          <h3 id='title'>Top Destinations</h3>
          <small>Make a choice from our top Destinations.</small>
        </div>
        <nav>
          <MdChevronLeft />
          <MdChevronRight />
        </nav>
      </header>

      <section className={styles.gallery}>
        <section className={styles.left}>
          {tours.length > 1 &&
            <>
              {snap(tours[0])}
              {snap(tours[1])}
            </>
          }
        </section>
        <section className={styles.mid}>
          {tours.length > 2 && snap(tours[2])}
        </section>
        <section className={styles.right}>
          {tours.length > 3 && snap(tours[3])}
          <div className={styles.snaps}>
            {tours.length > 4 && snap(tours[4])}
            {tours.length > 5 && snap(tours[5])}
          </div>
        </section>
      </section>
    </section>
  );
}

export default DestinationBox;