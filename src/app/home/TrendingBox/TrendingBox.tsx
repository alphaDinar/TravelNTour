'use client'
import styles from './trendingBox.module.css';
import { MdChevronLeft, MdChevronRight, MdEast, MdOutlineFavorite, MdOutlineFavoriteBorder, MdStar } from "react-icons/md";
import React, { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { CiStar } from 'react-icons/ci';
import { TbBeach } from 'react-icons/tb';
import { useWinSize } from '@/app/contexts/winSizeContext';
import Image from 'next/image';
import { FaRegClock, FaStar } from 'react-icons/fa';
import { sortByViews } from '@/app/External/sort';
import { getDaysLeft, getRealDate } from '@/app/External/time';


interface defType extends Record<string, any> { };
type TrendingBoxProps = {
  tours: defType[]
}
const TrendingBox: FC<TrendingBoxProps> = ({ tours }) => {
  const { winSize } = useWinSize();
  const trendingSwiper = useRef<{ swiper: any }>({ swiper: null });

  const trendingSwiperPrev = () => {
    console.log(trendingSwiper.current)
    if (trendingSwiper.current) {
      trendingSwiper.current.swiper.slidePrev();
    }
  }

  const trendingSwiperNext = () => {
    if (trendingSwiper.current) {
      trendingSwiper.current.swiper.slideNext();
    }
  }
  return (
    <section className={styles.trendingBox}>
      <header id='titleBoxMargin'>
        <div>
          <h3 id='title'>Trending</h3>
          <small>Here are the top trending tours.</small>
        </div>
        <nav>
          <MdChevronLeft onClick={trendingSwiperPrev} />
          <MdChevronRight onClick={trendingSwiperNext} />
        </nav>
      </header>

      <Swiper
        slidesPerView={winSize > 1100 ? 3 : winSize > 800 && winSize < 1100 ? 2 : winSize > 500 && winSize < 800 ? 2 : 1}
        spaceBetween={winSize > 500 ? 20 : 15}
        className={styles.slideBox}
        ref={trendingSwiper}
      >
        {sortByViews(tours).map((tour, i) => (
          <SwiperSlide className={styles.slide} key={i}>
            <div className={styles.trend}>
              <div className={styles.imgBox}>
                <Image alt='' src={tour.image.url} fill className='cover' />
              </div>
              <div className={styles.top}>
                <p>
                  <strong>{tour.id}</strong>
                  <small>{tour.description}</small>
                </p>
                <MdOutlineFavoriteBorder />
              </div>
              <div className={styles.mid}>
                <p>
                  <strong>GHS {tour.price.toLocaleString()} </strong>
                  <small>Price</small>
                </p>
                <p id='temp'>
                  <legend>
                    {Array(4).fill('a').map((ell, ii) => (
                      <FaStar key={ii} />
                    ))}
                  </legend>
                </p>
              </div>
              <div className={styles.low}>
                <p>
                  <legend><FaRegClock /> {getDaysLeft(tour.startDate)}</legend>
                  <small>{getRealDate(tour.startDate)} - {getRealDate(tour.endDate)}</small>
                </p>
                <Link href={{ pathname: '/viewTour', query: { tid: tour.id } }}><MdEast /></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrendingBox;