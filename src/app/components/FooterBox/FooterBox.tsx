import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from './footerBox.module.css'
import { FaXTwitter } from 'react-icons/fa6';

const FooterBox = () => {
  return (
    <section className={styles.footerBox} id='hor'>
      <h1>Logo</h1>
      <hr />
      <section className={styles.con}>
        <article>
          <strong>Services</strong>
          <p>
            {Array(6).fill('a').map((el, i) => (
              <span key={i}>Loremsesque</span>
            ))}
          </p>
        </article>
        <article>
          <strong>Services</strong>
          <p>
            {Array(6).fill('a').map((el, i) => (
              <span key={i}>Loremsesque</span>
            ))}
          </p>
        </article>
        <article>
          <strong>Contact</strong>
          <p>
            {Array(6).fill('a').map((el, i) => (
              <span key={i}>Loremsesque</span>
            ))}
          </p>
        </article>
      </section>
      <hr />

      <section className={styles.socialBox}>
        <FaFacebookF />
        <FaInstagram />
        <FaXTwitter />
      </section>
    </section>
  );
}

export default FooterBox;