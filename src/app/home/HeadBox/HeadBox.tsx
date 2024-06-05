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
import { FC, useRef } from 'react';
import { sortByPriority } from '@/app/External/sort';
import { getDaysLeft, getRealDate } from '@/app/External/time';

interface defType extends Record<string, any> { };
type HeadBoxProps = {
  tours: defType[]
}
const HeadBox: FC<HeadBoxProps> = ({ tours }) => {
  const headSwiper = useRef<{ swiper: any }>({ swiper: null });

  const headSwiperPrev = () => {
    console.log(headSwiper.current)
    if (headSwiper.current) {
      headSwiper.current.swiper.slidePrev();
    }
  }

  const headSwiperNext = () => {
    if (headSwiper.current) {
      headSwiper.current.swiper.slideNext();
    }
  }
  return (
    <section className={styles.headBox} id='horMargin'>
      <Swiper
        ref={headSwiper}
        spaceBetween={30}
        effect={'fade'}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className={styles.slideBox}
      >
        {sortByPriority(tours).map((tour, i) => (
          <SwiperSlide className={styles.slide} key={i}>
            <Image alt='' src={tour.image.url} fill className='cover' />
            <Link href={{ pathname: '/viewTour', query: { tid: tour.id } }} className={styles.sheet}>
              <span>- {tour.description}</span>
              <article>
                <h3>{tour.id}</h3>
                <span>{getDaysLeft(tour.startDate)}</span>
              </article>
              <strong>{getRealDate(tour.startDate)} - {getRealDate(tour.endDate)}</strong>
              <nav>
                <MdWest onClick={headSwiperPrev} />
                <MdEast onClick={headSwiperNext} />
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