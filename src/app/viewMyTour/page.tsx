import Image from 'next/image';
import { LiaAwardSolid } from 'react-icons/lia';
import { MdClose, MdOutlineModeOfTravel, MdStarOutline, MdTaskAlt } from 'react-icons/md';
import { RiHomeHeartLine } from 'react-icons/ri';
import TopNav from '../components/TopNav/TopNav';
import styles from '../viewTour/viewTour.module.css';
import { categoryList } from '../External/assets';
import { getDaysLeft, getRealDate } from '../External/time';
import PriceTag from '../components/PriceTag/PriceTag';

interface defType extends Record<string, any> { };
const ViewTour = ({ searchParams }: { searchParams: { tour: string } }) => {
  const tour: defType = JSON.parse(searchParams.tour);

  const face = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715785291/travelntour/handsome-smiling-young-african-man_171337-9650_rwzpgc.jpg';

  return (
    <main>
      <TopNav />

      <section className={styles.tourBox} id='hor'>
        <header>
          <h3>{tour.id}</h3>

          <p>
            {tour.payStatus ?
              <legend style={{ background: 'var(--pass)' }}>Booked <MdTaskAlt /> </legend>
              :
              <legend style={{ background: 'tomato' }}>Unpaid <MdClose /> </legend>
            }
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
              <h3><PriceTag amount={tour.price} /></h3>

            </section>
          </section>
        </section>
      </section>
    </main>
  );
}

export default ViewTour;