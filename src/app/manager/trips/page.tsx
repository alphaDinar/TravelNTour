'use client';
import { useEffect, useState } from "react";
import styles from '../../myTours/myTours.module.css';
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { fireAuth, fireStoreDB } from '@/Firebase/base';
import { FaRegClock, FaStar } from "react-icons/fa";
import { MdEast, MdEdit, MdOutlineFavoriteBorder } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Panel from "@/app/components/Panel/Panel";
import { useIsLoading } from "@/app/contexts/isLoadingContext";
import { getDaysLeft, getRealDate } from "@/app/External/time";

interface defType extends Record<string, any> { };
const Tours = () => {
  const { setIsLoading } = useIsLoading();
  const [trips, setTrips] = useState<defType[]>([]);

  useEffect(() => {
    const tripsRef = collection(fireStoreDB, 'Trips/');
    const tripStream = onSnapshot(query(tripsRef, orderBy("timestamp", "desc")), (snapshot) => {
      // setAllTrips(snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() })));
      setTrips(snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() })));
      setIsLoading(false);
    });
    return () => tripStream();
  }, [setIsLoading])

  return (
    <Panel>
      <section>
        <h3>Trips</h3>

        <section className={styles.tours}>
          {trips.map((trip: defType, i: number) => (
            <Link href={{ pathname: '/manager/viewTrip', query: { tour: JSON.stringify(trip.tour), contact: trip.contact, email: trip.email } }} className={styles.tour} key={i}>
              <div className={styles.imgBox}>
                <Image alt='' src={trip.tour.image.url} fill className='cover' />
              </div>

              <article>
                <h4>{trip.tour.id}</h4>
                <small>{trip.tour.category}</small>
                <small style={{ color: 'salmon' }}>{trip.username}</small>

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
                <h4 className='big'>GHS {trip.price.toLocaleString()}</h4>
                <MdEast />
              </div>
            </Link>
          ))}
        </section>
      </section>
    </Panel>
  );
}

export default Tours;