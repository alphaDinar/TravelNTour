import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from './footerBox.module.css'
import { FaXTwitter } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { GiWorld } from 'react-icons/gi';
import { MdEast, MdOutlineSend } from 'react-icons/md';
import Link from 'next/link';

const FooterBox = () => {
  const serviceList = [
    { tag: 'Travel and Tour', target: '/' },
    { tag: 'Visa Assistance', target: '/' },
    { tag: 'Scholarships Abroad', target: '/' },
    { tag: 'VIP Airport Assistance', target: '/' },
    { tag: 'Luxury Accommodation Booking', target: '/' }
  ]

  const countryList = [
    { tag: 'Canada' },
    { tag: 'Dubai' },
    { tag: 'USA' },
    { tag: 'UK' },
    { tag: 'Turkey' }
  ]

  return (
    <section className={styles.footerBox} id='hor'>
      <section className={styles.quickBox}>
        <p>
          <IoIosAddCircleOutline />
          <strong>Quick Contacts</strong>
        </p>

        <p>
          <span>+233 55 888 9023</span>
          <span>|</span>
          <span>zolo@pryme.com</span>
        </p>
      </section>

      <hr />

      <section className={styles.officeBox}>
        <article className={styles.left}>
          <small>Get In Touch</small>
          <strong>Adventures Calling You Guys!</strong>
        </article>

        <div className={styles.right}>
          <GiWorld />
          <p>
            <small>Our Office</small>
            <strong>Accra, Ghana</strong>
            <MdEast />
          </p>
        </div>
      </section>

      <hr />

      <section className={styles.linkBox}>
        <section className={styles.left}>
          <article>
            <strong>Services</strong>
            <p>
              {serviceList.map((service, i) => (
                <Link href={service.target} key={i}>{service.tag}</Link>
              ))}
            </p>
          </article>
          <article>
            <strong>Countries</strong>
            <p>
              {countryList.map((country, i) => (
                <a key={i}>{country.tag}</a>
              ))}
            </p>
          </article>
        </section>
        <form className={styles.right}>
          <strong>Contact Us</strong>
          <textarea placeholder='message'>
          </textarea>
          <input type="text" placeholder='E-Mail' />
          <button>Send Now <MdOutlineSend /> </button>
        </form>
      </section>
      <hr />

      <Link href={'https://www.yotabyt.com/'} className={styles.yotaTag}>Powered By Yotabyt</Link>
    </section>
  );
}

export default FooterBox;