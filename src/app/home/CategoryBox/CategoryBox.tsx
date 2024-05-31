'use client';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from './categoryBox.module.css'
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { CiStar } from 'react-icons/ci';
import { TbBeach } from 'react-icons/tb';
import { useWinSize } from '@/app/contexts/winSizeContext';

const CategoryBox = () => {
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
    <section className={styles.categoryBox}>
      <header id='titleBoxMargin'>
        <div>
          <h3 id='title'>Select A Category</h3>
          <small>Lorem ipsum dolor sit amet consectetur adipisicing</small>
        </div>
        <nav>
          <MdChevronLeft onClick={categorySwiperPrev} />
          <MdChevronRight onClick={categorySwiperNext} />
        </nav>
      </header>

      <Swiper
        slidesPerView={winSize > 1100 ? 4 : winSize > 800 && winSize < 1100 ? 3 : winSize > 500 && winSize < 800 ? 2 : 1}
        spaceBetween={winSize > 500 ? 15 : 0}
        className={styles.slideBox}
        ref={categorySwiper}
      >
        {Array(10).fill('a').map((el,i) => (
          <SwiperSlide className={styles.slide} key={i}>
            <Link href={'/'} className={styles.category}>
              <sup><span>4.5</span> <CiStar /></sup>
              <article className={styles.info}>
                <TbBeach />
                <strong>Beach Activity</strong>
                <small>49 trips</small>
              </article>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section >
  );
}

export default CategoryBox;