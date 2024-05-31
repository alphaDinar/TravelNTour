import { MdChevronLeft, MdChevronRight, MdStar } from 'react-icons/md';
import styles from './destinationBox.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface defType extends Record<string, any> { };
const DestinationBox = () => {
  const places = [
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406123/travelntour/GettyImages-480604953-589aac555f9b5874ee32b9b1_vjfrxw.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406171/travelntour/TAL-dubai-DUBAITG1123-17390625954c4be3902a440d8fffde67_pz198o.jpg'
  ];

  const snap = (url: string, target: string, place: defType) => {
    return <Link href={''} className={styles.snap}>
      <Image alt='' src={url} fill></Image>
      <article className={styles.sheet}>
        <legend>4.5 <MdStar /></legend>
        <p>
          <span>Malaysia</span>
          <small>23rd may</small>
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
          <small>Lorem ipsum dolor sit amet consectetur adipisicing</small>
        </div>
        <nav>
          <MdChevronLeft />
          <MdChevronRight />
        </nav>
      </header>

      <section className={styles.gallery}>
        <section className={styles.left}>
          {snap(places[0], '/', place)}
          {snap(places[0], '/', place)}
        </section>
        <section className={styles.mid}>
          {snap(places[0], '/', place)}
        </section>
        <section className={styles.right}>
          {snap(places[0], '/', place)}
          <div className={styles.snaps}>
            {snap(places[0], '/', place)}
            {snap(places[0], '/', place)}
          </div>
        </section>
      </section>
    </section>
  );
}

export default DestinationBox;