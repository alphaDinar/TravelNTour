'use client'
import Link from 'next/link';
import styles from './topNav.module.css';
import { MdMenu, MdOutlinePowerSettingsNew } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { fireAuth } from '@/Firebase/base';
import { useState } from 'react';
import { useUser } from '@/app/contexts/userContext';
import { useIsLoading } from '@/app/contexts/isLoadingContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { logo } from '@/app/External/assets';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useWinSize } from '@/app/contexts/winSizeContext';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import CurrencyBox from './CurrencyBox';
import { useExchangeRate } from '@/app/contexts/exchangeRateContext';

interface defType extends Record<string, any> { };
const TopNav = () => {
  const { user } = useUser();
  const { winSize } = useWinSize();
  const { exchangeRate } = useExchangeRate();

  const [navToggled, setNavToggled] = useState(false);
  const { isLoading } = useIsLoading();

  const dropList = [
    {
      tag: 'Visa', items: [
        { link: 'Tourist', target: '/touristVisa', show: 'Tourist Visa', display: 'flex' },
        { link: 'Student', target: '/studentVisa', show: 'Student Visa', display: 'flex' },
        { link: 'Business', target: '/businessVisa', show: 'Business Visa', display: 'flex' }
      ]
    },
    {
      tag: 'More', items: [
        { link: 'Blog', target: '/blog', show: 'Blog', display: 'none' },
        { link: 'Careers', target: '/careers', show: 'Careers', display: 'flex' },
        { link: 'F.A.Q', target: '/faq', show: 'F.A.Q', display: 'none' },
        { link: 'Pryme Car Booking', target: '/carBooking', show: 'Pryme Car Booking', display: 'flex' }
      ]
    }
  ]

  const toggleNav = () => {
    navToggled ? setNavToggled(false) : setNavToggled(true);
  }

  const logoutUser = () => {
    signOut(fireAuth)
      .then(() => window.location.reload());
  }

  return (
    <section className={styles.topNav} id='hor'>
      <section className={styles.left}>
        {logo}
        <nav className={navToggled ? styles.change : ''}>
          {
            isLoading ?
              Array(3).fill(<AiOutlineLoading3Quarters />).map((el, i) => (
                <legend className={styles.loader} key={i}>
                  {el}
                </legend>
              ))
              :
              user ?
                <>
                  <Link href={'/myTours'}>My Tours</Link>
                  {dropList.map((drop, i) => (
                    <a className={styles.drop} key={i}>
                      <span>{drop.tag} <RiArrowDropDownLine /> </span>
                      <ul>
                        {drop.items.map((el, ii) => (
                          <Link href={el.target} key={ii}>{el.link}</Link>
                        ))}
                      </ul>
                    </a>
                  ))}
                  <p className={styles.socialBox}>
                    <Link href={''}><FaFacebookF /></Link>
                    <Link href={''}><FaInstagram /></Link>
                  </p>
                </>
                :
                <>
                  {dropList.map((drop, i) => (
                    <a className={styles.drop} key={i}>
                      <span>{drop.tag} <RiArrowDropDownLine /> </span>
                      <ul>
                        {drop.items.map((el, ii) => (
                          <Link href={el.target} key={ii}>{el.link}</Link>
                        ))}
                      </ul>
                    </a>
                  ))}
                  <Link href={'/'}>Contact Us</Link>
                  <Link href={'/dubaiVisa'}>Dubai Visa</Link>

                  <p className={styles.socialBox}>
                    <Link href={''}><FaFacebookF /></Link>
                    <Link href={''}><FaInstagram /></Link>
                  </p>
                </>
          }


          <Link href={'/login'} className={styles.hide}>Login</Link>
          <MdMenu className={styles.menuTab} onClick={toggleNav} />
        </nav>
      </section>
      <section className={styles.right}>
        {
          isLoading ?
            Array(2).fill(<AiOutlineLoading3Quarters />).map((el, i) => (
              <legend className={styles.loader} key={i}>
                {el}
              </legend>
            ))
            :
            user ?
              <>
                <CurrencyBox />
                <Link href={'/'} className={styles.registerTab}>{user.tourist.username}</Link>
                <legend className={styles.registerTab} onClick={logoutUser} style={{ background: 'var(--red)' }}><MdOutlinePowerSettingsNew /></legend>
              </>
              :
              <>
                <CurrencyBox />
                <Link href={'/login'} className={styles.show}>Login</Link>
                <Link href={'/register'} className={styles.registerTab}>Get Started</Link>
              </>
        }
      </section>
    </section>
  );
}

export default TopNav;