'use client'
import Link from 'next/link';
import PageHeader from '../components/PageHeader/PageHeader';
import TopNav from '../components/TopNav/TopNav';
import styles from './myTours.module.css';
import Image from 'next/image';
import { place } from '../External/temp';
import { MdEast } from 'react-icons/md';
import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { verifyPayment } from '../External/paystack';
import { fireStoreDB } from '@/Firebase/base';
import { useUser } from '../contexts/userContext';
import { useEffect, useState } from 'react';
import { getDaysLeft, getRealDate } from '../External/time';
import { cashSymbol } from '../External/assets';
import PriceTag from '../components/PriceTag/PriceTag';

interface defType extends Record<string, any> { };
const MyTours = ({ searchParams }: { searchParams: { tid: string, trxref: string, reference: string } }) => {
  const tid = searchParams.tid;
  const trxref = searchParams.trxref;
  const payRef = searchParams.reference;

  const { user } = useUser();
  const [trips, setTrips] = useState<defType>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPayStatus = async () => {
      if (payRef !== undefined && typeof payRef !== undefined) {
        const res = await verifyPayment(payRef);
        if (res === 200) {
          await updateDoc(doc(fireStoreDB, 'Trips/' + tid), {
            payStatus: 1,
          })
        }
      }
    }
    checkPayStatus();

    if (user) {
      console.log('king kong')
      const uid = user.uid;
      const tripsRef = collection(fireStoreDB, 'Trips/');
      const tripStream = onSnapshot(query(tripsRef, where("uid", "==", `${uid}`), orderBy("timestamp", "desc")), (snapshot) => {
        // setAllTrips(snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() })));
        setTrips(snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() })));
        setIsLoading(false);
      });
      return () => tripStream();
    } else {
      console.log('savage');
    }

  }, [tid, trxref, payRef, user])

  return (
    <main>
      <TopNav />

      <section id='pageBox'>
        <PageHeader title='My Tours' />

        <section className={styles.tourSet}>
          <header>Upcoming</header>
          <section className={styles.tours}>
            {trips.map((trip: defType, i: number) => (
              <Link href={{ pathname: '/viewMyTour', query: { tour: JSON.stringify(trip.tour) } }} className={styles.tour} key={i}>
                <div className={styles.imgBox}>
                  <Image alt='' src={trip.tour.image.url} fill className='cover' />
                </div>

                <article>
                  <h4>{trip.tour.id}</h4>
                  <small>{trip.tour.category}</small>
                </article>

                <article>
                  <legend>{getDaysLeft(trip.tour.startDate)}</legend>
                  <p>
                    <small>{getRealDate(trip.tour.startDate)}</small>
                    -
                    <small>{getRealDate(trip.tour.endDate)}</small>
                  </p>
                </article>

                <div className={styles.priceBox}>
                  <sub style={trip.payStatus ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
                  <h4 className='big'><PriceTag amount={trip.price} /></h4>
                  <MdEast />
                </div>
              </Link>
            ))}
          </section>
        </section>

        {/* <section className={styles.tourSet}>
          <header>Due</header>
          <section className={styles.tours}>
            {Array(2).fill('a').map((el, i) => (
              <Link href={''} className={styles.tour} key={i}>
                <div className={styles.imgBox}>
                  <Image alt='' src={place} fill className='cover' />
                </div>

                <article>
                  <h4>Hawaii</h4>
                  <small>Beach Activity</small>
                </article>

                <article>
                  <small>23rd June, 2024</small>
                  <small>23rd June, 2024</small>
                </article>

                <div className={styles.priceBox}>
                  <h4 className='big'>{cashSymbol} 3,500</h4>
                  <MdEast />
                </div>
              </Link>
            ))}
          </section>
        </section> */}

        <section className='sizedBox'></section>
      </section>
    </main>
  );
}

export default MyTours;