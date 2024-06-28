'use client';
import { useEffect, useState } from "react";
import styles from '../../myTours/myTours.module.css';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireStoreDB } from '@/Firebase/base';
import { MdEast } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Panel from "@/app/components/Panel/Panel";
import { useIsLoading } from "@/app/contexts/isLoadingContext";
import { getDaysLeft, getRealDate } from "@/app/External/time";
import { cashSymbol } from "@/app/External/assets";

interface defType extends Record<string, any> { };
const Tours = () => {
  const { setIsLoading } = useIsLoading();

  const [allTrips, setAllTrips] = useState<defType[]>([]);
  const [trips, setTrips] = useState<defType[]>([]);

  const [payStatus, setPayStatus] = useState('');
  // const [status, setStatus]
  const [destination, setDestination] = useState('');
  const [destinationList, setDestinationList] = useState<string[]>([]);

  useEffect(() => {
    const getDestinations = async () => {
      const destinationsTemp = (await getDocs(collection(fireStoreDB, 'Tours/'))).docs.map((el) => el.id);
      setDestinationList(destinationsTemp);
    }

    getDestinations();

    const tripsRef = collection(fireStoreDB, 'Trips/');
    const tripStream = onSnapshot(query(tripsRef, orderBy("timestamp", "desc")), (snapshot) => {
      setAllTrips(snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() })));
      setTrips(snapshot.docs.map((trip) => ({ id: trip.id, ...trip.data() })));
      setIsLoading(false);
    });
    return () => tripStream();
  }, [setIsLoading])

  return (
    <Panel>
      <section id="managerPage">
        <h3>Trips</h3>

        <section className={styles.filterBox}>
          <article>
            <span>Payment Status</span>
            <select>
              <option value="">choose payment</option>
              <option value="paid">Paid</option>
              <option value="not paid">Not Paid</option>
            </select>
          </article>

          <article>
            <span>Destination</span>
            <select name="" id="">
              <option hidden>choose destination</option>
              {destinationList.map((el, i) => (
                <option value={el} key={i}>{el}</option>
              ))}
            </select>
          </article>

          {/* <article>
            <span>Status</span>
            <select name="" id="">
              <option value=""></option>
            </select>
          </article> */}
        </section>

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
                {trip.payStatus ?
                  <small style={{ color: 'springgreen' }}>Paid</small>
                  :
                  <small style={{ color: 'tomato' }}>Not Paid</small>
                }
                <h4 className='big'>{cashSymbol} {trip.price.toLocaleString()}</h4>
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