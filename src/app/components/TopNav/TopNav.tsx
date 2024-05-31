'use client'
import Link from 'next/link';
import styles from './topNav.module.css';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';

const TopNav = () => {
  const [navToggled, setNavToggled] = useState(false);
  const toggleNav = () => {
    navToggled ? setNavToggled(false) : setNavToggled(true);
  }
  return (
    <section className={styles.topNav} id='hor'>
      <section className={styles.left}>
        <strong>Logo</strong>
        <nav className={navToggled ? styles.change : ''}>
          <Link href={'/'}>Destination</Link>
          <Link href={'/'}>Activities</Link>
          <Link href={'/'}>Specials</Link>

          <Link href={'/'} className={styles.hide}>Login</Link>
          <Link href={'/'} className={styles.hide}>Register</Link>
          <MdMenu className={styles.menuTab} onClick={toggleNav} />
        </nav>
      </section>
      <section className={styles.right}>
        <Link href={'/'} className={styles.show}>Login</Link>
        <Link href={'/'} className={styles.registerTab}>Get Started</Link>
      </section>
    </section>
  );
}

export default TopNav;