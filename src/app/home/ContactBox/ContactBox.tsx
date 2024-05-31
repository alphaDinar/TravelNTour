import Image from 'next/image';
import styles from './contactBox.module.css';
import { MdCall, MdMail, MdMailOutline } from 'react-icons/md';

const ContactBox = () => {
  const set = [
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715406171/travelntour/TAL-dubai-DUBAITG1123-17390625954c4be3902a440d8fffde67_pz198o.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715787934/travelntour/dubai-palm-jumeirah-island-shutterstock_1291548640.jpg_3ab124c2b9_m74ve5.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715787981/travelntour/dubai-waterfront-800x450_xf39yk.jpg',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715788025/travelntour/The-Dubai-Marina-District_cxijgt.webp',
    'https://res.cloudinary.com/dvnemzw0z/image/upload/v1715788072/travelntour/375edbe5-city-6080-1666615a2c3_ml83ce.jpg'
  ]


  return (
    <section className={styles.contactBox} id='hor'>
      <section className={styles.left}>
        <div className={styles.imgBox}>
          <Image alt='' src={set[0]} fill />
        </div>

        <section className={styles.imgSet}>
          <div className={styles.imgBox}>
            <Image alt='' src={set[1]} fill />
          </div>
          <div className={styles.imgBox}>
            <Image alt='' src={set[2]} fill />
          </div>
        </section>
      </section>
      <section className={styles.right}>
        <article>
          <small>Subscribe Today</small>
          <strong>Adventures Calling You Guys!</strong>
          <small>Lorem ipsum dolor sit amet consectetur.</small>
        </article>

        <div>
          <legend>
            <MdMailOutline />
            <input type="text" placeholder='Enter your email' />
          </legend>
          <button>Send Now!</button>
        </div>

        <hr />
        <p>
          <span>Contact Us</span>
          <legend><MdCall /> <span>+233 55 00 000</span></legend>
          <legend><MdMailOutline /> <span>info@gmail.com</span></legend>
        </p>
      </section>
    </section>
  );
}

export default ContactBox;