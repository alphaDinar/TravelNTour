'use client';
import { useEffect, useState } from "react";
import styles from './tours.module.css';
import Panel from "../components/Panel/Panel";
import { useIsLoading } from "../contexts/isLoadingContext";
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { fireAuth, fireStoreDB } from '@/Firebase/base';
import { getDaysLeft, getRealDate } from "../External/time";
import { FaRegClock, FaStar } from "react-icons/fa";
import { MdEdit, MdOutlineFavoriteBorder } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

interface defType extends Record<string, any> { };
const Tours = () => {
  const { setIsLoading } = useIsLoading();
  const [tours, setTours] = useState<defType[]>([]);

  useEffect(() => {
    const toursRef = collection(fireStoreDB, 'Tours/');
    const tourStream = onSnapshot(toursRef, (snapshot) => {
      // setAllTours(snapshot.docs.map((tour) => ({ id: tour.id, ...tour.data() })));
      setTours(snapshot.docs.map((tour) => ({ id: tour.id, ...tour.data() })));
      setIsLoading(false);
    });
    return () => tourStream();
  }, [setIsLoading])

  return (
    <Panel>
      <section>
        <h3 id="title">Tours</h3>

        <section className={styles.trends}>
          {tours.map((tour, i) => (
            <div className={styles.trend} key={i}>
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
                <Link href={{ pathname: '/manager/editTour', query: { tour: JSON.stringify(tour) } }}><MdEdit /></Link>
              </div>
            </div>
          ))}

        </section>
      </section>
    </Panel>
  );
}

export default Tours;