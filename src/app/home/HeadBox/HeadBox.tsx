'use client';
import styles from './headBox.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { MdEast, MdLocationPin, MdWest } from 'react-icons/md';
import { CiCalendar, CiCalendarDate, CiLocationOn, CiSearch } from 'react-icons/ci';
import { RiSearch2Line } from 'react-icons/ri';

const HeadBox = () => {
  const places = [
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406123/travelntour/GettyImages-480604953-589aac555f9b5874ee32b9b1_vjfrxw.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406171/travelntour/TAL-dubai-DUBAITG1123-17390625954c4be3902a440d8fffde67_pz198o.jpg'
  ];

  const locs = ['Nepal Country', 'Dubai City']

  return (
    <section className={styles.headBox} id='horMargin'>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className={styles.slideBox}
      >
        {places.map((el, i) => (
          <SwiperSlide className={styles.slide} key={i}>
            <Image alt='' src={el} fill className='cover' />
            <Link href={{ pathname: '/viewTour', query: { tid: locs[i] } }} className={styles.sheet}>
              <span>- The Himalayan  Mountain Ranges</span>
              <h3>{locs[i]}</h3>
              <strong>23rd march - 30th May</strong>
              <nav>
                <MdWest />
                <MdEast />
              </nav>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className={styles.searchBox}>
        <div>
          <CiLocationOn />
          <p>
            <strong>Location</strong>
            <input type="text" />
          </p>
        </div>
        <hr />
        <div>
          <CiCalendarDate />
          <p>
            <strong>Tour Date</strong>
            <input type="date" />
          </p>
        </div>
        <hr />

        <button><RiSearch2Line /></button>
      </section>
    </section>
  );
}

export default HeadBox;