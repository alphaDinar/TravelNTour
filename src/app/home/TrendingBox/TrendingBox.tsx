'use client'
import styles from './trendingBox.module.css';
import { MdChevronLeft, MdChevronRight, MdEast, MdOutlineFavorite, MdOutlineFavoriteBorder, MdStar } from "react-icons/md";
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { CiStar } from 'react-icons/ci';
import { TbBeach } from 'react-icons/tb';
import { useWinSize } from '@/app/contexts/winSizeContext';
import Image from 'next/image';
import { FaRegClock, FaStar } from 'react-icons/fa';


const TrendingBox = () => {
  const places = [
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406123/travelntour/GettyImages-480604953-589aac555f9b5874ee32b9b1_vjfrxw.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406171/travelntour/TAL-dubai-DUBAITG1123-17390625954c4be3902a440d8fffde67_pz198o.jpg'
  ];

  const { winSize } = useWinSize();
  const categorySwiper = useRef<{ swiper: any }>({ swiper: null });

  const categorySwiperPrev = () => {
    console.log(categorySwiper.current)
    if (categorySwiper.current) {
      categorySwiper.current.swiper.slidePrev();
    }
  }

  const categorySwiperNext = () => {
    if (categorySwiper.current) {
      categorySwiper.current.swiper.slideNext();
    }
  }
  return (
    <section className={styles.trendingBox}>
      <header id='titleBoxMargin'>
        <div>
          <h3 id='title'>Trending</h3>
          <small>Lorem ipsum dolor sit amet consectetur adipisicing</small>
        </div>
        <nav>
          <MdChevronLeft />
          <MdChevronRight />
        </nav>
      </header>

      <Swiper
        slidesPerView={winSize > 1100 ? 3 : winSize > 800 && winSize < 1100 ? 2 : winSize > 500 && winSize < 800 ? 2 : 1}
        spaceBetween={winSize > 500 ? 20 : 15}
        className={styles.slideBox}
        ref={categorySwiper}
      >
        {Array(10).fill('a').map((el,i) => (
          <SwiperSlide className={styles.slide} key={i}>
            <div className={styles.trend}>
              <div className={styles.imgBox}>
                <Image alt='' src={places[1]} fill className='cover' />
              </div>
              <div className={styles.top}>
                <p>
                  <strong>Dubai</strong>
                  <small>Luxury Living at its Best</small>
                </p>
                <MdOutlineFavoriteBorder />
              </div>
              <div className={styles.mid}>
                <p>
                  <strong>GHS 895.00 </strong>
                  <small>Price</small>
                </p>
                <p>
                  <legend>
                    {Array(4).fill('a').map((ell, ii) => (
                      <FaStar key={ii}/>
                    ))}
                  </legend>
                </p>
              </div>
              <div className={styles.low}>
                <p>
                  <legend><FaRegClock /> 37 Days</legend>
                  <small>23rd October - 30th December</small>
                </p>
                <Link href={'/'}><MdEast /></Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TrendingBox;