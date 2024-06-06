'use client';
import TopNav from "../components/TopNav/TopNav";
import styles from '../styles/visa.module.css';
import student from '../../../public/student.webp';
import Image from "next/image";
import { useState } from "react";
import ExploreBox from "../components/Visa/ExploreBox";
import ServiceBox from "../components/Visa/ServiceBox";
import { FaPeopleGroup } from "react-icons/fa6";
import FooterBox from "../components/FooterBox/FooterBox";
import { GiHealthIncrease } from "react-icons/gi";
import { IoHappyOutline } from "react-icons/io5";
import { TiWorldOutline } from "react-icons/ti";

const StudentVisa = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const imgSet = [
    "https://static1.s123-cdn-static-a.com/uploads/7452631/2000_6632efa942237.jpg",
    "https://static1.s123-cdn-static-a.com/uploads/7452631/800_6632efb3b6471.jpg",
    "https://static1.s123-cdn-static-a.com/uploads/7452631/2000_6632efbd771ef.jpg",
    "https://static1.s123-cdn-static-a.com/uploads/7452631/2000_6632efc5e8a37.jpg",
    "https://static1.s123-cdn-static-a.com/uploads/7452631/2000_6632efcd99d43.jpg",
    "https://static1.s123-cdn-static-a.com/uploads/7452631/2000_6632efd575455.jpg"
  ]

  return (
    <main>
      <TopNav />

      <section className={styles.formBox} id="horMargin">
        <section className={styles.left}>
          <header>
            <strong>Student Visa</strong>
            <small>Pryme Travels empowers students to explore the world and gain a global perspective through education and travel.</small>
            {/* <button>Read More</button> */}
          </header>

          <hr />

          <form>
            <p>
              <span>Name</span>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </p>

            <p>
              <span>Phone</span>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </p>

            <p>
              <span>E-mail</span>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>

            <button>Contact Us</button>
          </form>
        </section>
        <section className={styles.right}>
          <Image alt="" src={student} fill className="cover" />
        </section>
      </section>

      <ExploreBox imgSet={imgSet} />

      <ServiceBox />

      <section>
        <section className={styles.bannerBox}>
          <header>
            <strong>Unmatched Global Expertise And Connections</strong>
          </header>

          <section className={styles.skills} id="hor">
            <div className={styles.skill}>
              <FaPeopleGroup />
              <strong className='big'>70%</strong>
              <span>of students reported increased cultural awareness after studying abroad with PRYME TOURISM.</span>
            </div>

            <div className={styles.skill}>
              <GiHealthIncrease />
              <strong className='big'>65%</strong>
              <span>increase in students choosing PRYME TOURISM for study abroad programs in the past year.</span>
            </div>

            <div className={styles.skill}>
              <IoHappyOutline />
              <strong className='big'>50+</strong>
              <span>partner universities and institutions worldwide offering study abroad programs through PRYME TOURISM.</span>
            </div>

            <div className={styles.skill}>
              <TiWorldOutline />
              <strong className='big'>3+</strong>
              <span>different countries where PRYME TOURISM offers study abroad programs for students.</span>
            </div>
          </section>
        </section>

        <FooterBox />
      </section>
    </main>
  );
}

export default StudentVisa;