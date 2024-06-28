'use client';
import styles from '../../viewTour/viewTour.module.css';
import Image from "next/image";
import Panel from "@/app/components/Panel/Panel";
import { getDaysLeft, getRealDate } from "@/app/External/time";
import { MdMail, MdOutlineModeOfTravel, MdPhone, MdStarOutline, MdTaskAlt } from 'react-icons/md';
import { LiaAwardSolid } from 'react-icons/lia';
import { RiHomeHeartLine } from 'react-icons/ri';
import { cashSymbol, categoryList } from '@/app/External/assets';
import { useEffect } from 'react';
import { useIsLoading } from '@/app/contexts/isLoadingContext';
import Link from 'next/link';

interface defType extends Record<string, any> { };
const Tours = ({ searchParams }: { searchParams: { tour: string, contact: string, email: string } }) => {
  const tour: defType = JSON.parse(searchParams.tour);
  const contact = searchParams.contact;
  const email = searchParams.email;

  const { setIsLoading } = useIsLoading();
  const face = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715785291/travelntour/handsome-smiling-young-african-man_171337-9650_rwzpgc.jpg';

  useEffect(() => {
    setIsLoading(false);
  }, [tour, contact, email, setIsLoading])

  return (
    <Panel>
      <section id='managerPage'>
        <section className={styles.tourBox}>
          <header>
            <h3>{tour.id}</h3>

            <p>

              {contact && <legend>{contact} <MdPhone /> </legend>}
              {email && <Link href={`mailto:${email}`}><legend>{email} <MdMail /> </legend></Link>}
            </p>
          </header>

          <section className={styles.gallery}>
            <section className={styles.left}>
              <Image src={tour.image.url} alt='' fill className='cover' />
            </section>
            <section className={styles.right}>
              {tour.mediaSet.map((el: defType, i: number) => (
                <div key={i}>
                  <Image src={el.url} alt='' fill className='cover' />
                </div>
              ))}
            </section>
          </section>

          <section className={styles.infoBox}>
            <section className={styles.left}>
              <div className={styles.ratingBox} style={{ display: 'none' }}>
                <p>
                  <LiaAwardSolid />
                  <span>One of the most loved tourist attractions</span>
                </p>

                <legend>
                  <strong>4.20</strong>
                  <sup>
                    <MdStarOutline /><MdStarOutline />
                    <MdStarOutline /><MdStarOutline />
                  </sup>
                </legend>
              </div>

              {/* <div className={styles.guideBox}>
              <Image alt='' src={face} width={50} height={50} className='contain' />

              <p>
                <strong>Hosted by Samuel</strong>
                <small>10 years Experience</small>
              </p>
            </div> */}

              <div className={styles.serviceBox}>
                <legend>
                  <Image alt='' src={face} width={50} height={50} className='contain' />

                  <p>
                    <strong>Hosted by Samuel</strong>
                    <small>10 years Experience</small>
                  </p>
                </legend>
                <hr />
                {tour.accommodation ?
                  <legend>
                    <RiHomeHeartLine />
                    <p>
                      <strong>Accommodation</strong>
                      <small>City Hotel</small>
                    </p>
                  </legend>
                  : <></>
                }
                <hr />
                <legend>
                  {categoryList.find((cat) => cat.tag === tour.category)?.iconEl}
                  <p>
                    <strong>Tour Type</strong>
                    <small>{tour.category}</small>
                  </p>
                </legend>
                <hr />
                <legend>
                  <MdOutlineModeOfTravel />
                  <p>
                    <strong>Mode of travel</strong>
                    <small>{tour.travelMode}</small>
                  </p>
                </legend>
              </div>
            </section>

            <section className={styles.right}>
              <section className={styles.payBox}>
                <article>
                  <p>
                    <strong>Start Date</strong>
                    <span>{getRealDate(tour.startDate)}</span>
                  </p>
                  <p>
                    <strong>End Date</strong>
                    <span>{getRealDate(tour.endDate)}</span>
                  </p>
                </article>

                <hr />

                <sub>{getDaysLeft(tour.startDate)}</sub>
                <hr />
                <h3>{cashSymbol} {tour.price.toLocaleString()}</h3>


                {!tour.payStatus ?
                  <span style={{ background: 'tomato', padding: '10px', color: 'wheat', borderRadius: '5px' }}>Not Paid</span>
                  :
                  <span style={{ background: 'springgreen', padding: '10px', color: 'white', borderRadius: '5px' }}>Paid</span>
                }

              </section>
            </section>
          </section>
        </section>
      </section>
    </Panel>
  );
}

export default Tours;