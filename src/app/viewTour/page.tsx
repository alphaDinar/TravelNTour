'use client'
import { IoShareOutline } from 'react-icons/io5';
import TopNav from '../components/TopNav/TopNav';
import styles from './viewTour.module.css';
import { FaRegHeart } from 'react-icons/fa';
import Image from 'next/image';
import { MdCardTravel, MdOutlineModeOfTravel, MdStarOutline } from 'react-icons/md';
import { LiaAwardSolid } from 'react-icons/lia';
import { RiHomeHeartLine } from 'react-icons/ri';
import { createPayLink } from '@/External/paystack';
import { useRouter } from 'next/navigation';

const ViewTour = ({ searchParams }: { searchParams: { tid: string } }) => {
  const tid = searchParams.tid;
  const router = useRouter();

  const face = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715785291/travelntour/handsome-smiling-young-african-man_171337-9650_rwzpgc.jpg';

  const set = [
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406171/travelntour/TAL-dubai-DUBAITG1123-17390625954c4be3902a440d8fffde67_pz198o.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715787934/travelntour/dubai-palm-jumeirah-island-shutterstock_1291548640.jpg_3ab124c2b9_m74ve5.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715787981/travelntour/dubai-waterfront-800x450_xf39yk.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715788025/travelntour/The-Dubai-Marina-District_cxijgt.webp',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715788072/travelntour/375edbe5-city-6080-1666615a2c3_ml83ce.jpg'
  ]

  const makePayment = async () => {
    const payObj = await createPayLink(1000000, 'sample', 'customer@gmail.com');
    router.push(payObj.link);
  }

  return (
    <main>
      <TopNav />

      <section className={styles.tourBox} id='hor'>
        <header>
          <h3>{tid}</h3>

          <p>
            <IoShareOutline />
            <FaRegHeart />
          </p>
        </header>

        <section className={styles.gallery}>
          <section className={styles.left}>
            <Image src={set[0]} alt='' fill className='cover' />
          </section>
          <section className={styles.right}>
            <div>
              <Image src={set[1]} alt='' fill className='cover' />
            </div>
            <div>
              <Image src={set[2]} alt='' fill className='cover' />
            </div>
            <div>
              <Image src={set[3]} alt='' fill className='cover' />
            </div>
            <div>
              <Image src={set[4]} alt='' fill className='cover' />
            </div>
          </section>
        </section>

        <section className={styles.infoBox}>
          <section className={styles.left}>
            <div className={styles.ratingBox}>
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

            <div className={styles.guideBox}>
              <Image alt='' src={face} width={50} height={50} className='contain' />

              <p>
                <strong>Hosted by Samuel</strong>
                <small>10 years Experience</small>
              </p>
            </div>

            <div className={styles.serviceBox}>
              <legend>
                <RiHomeHeartLine />
                <p>
                  <strong>Accommodation</strong>
                  <small>City Hotel</small>
                </p>
              </legend>
              <hr />
              <legend>
                <MdCardTravel />
                <p>
                  <strong>Tour Type</strong>
                  <small>Adventure</small>
                </p>
              </legend>
              <hr />
              <legend>
                <MdOutlineModeOfTravel />
                <p>
                  <strong>Mode of travel</strong>
                  <small>Air</small>
                </p>
              </legend>
            </div>
          </section>
          <section className={styles.right}>
            <section className={styles.payBox}>
              <article>
                <p>
                  <strong>Start Date</strong>
                  <span>23rd May, 2024</span>
                </p>
                <p>
                  <strong>End Date</strong>
                  <span>23rd July, 2024</span>
                </p>
              </article>

              <hr />

              <h3>GHS 10,000</h3>

              <hr />

              <legend onClick={makePayment}>Book Tour</legend>
            </section>
          </section>
        </section>
      </section>
    </main>
  );
}

export default ViewTour;