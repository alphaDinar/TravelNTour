'use client'
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdDoneAll } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';
import logo from '../../../public/logo.png';
import place from '../../../public/register.jpg';
import { sendOTP, verifyOTP } from '../External/arkesel';
import { countryList } from '../External/lists';
import { checkUser, makePassword } from '../External/phoneBook';
import { useAuthTarget } from '../contexts/authTargetContext';
import styles from '../register/register.module.css';
import { fireStoreDB } from '@/Firebase/base';
import { checkContact, checkPassLength, checkPassLower, checkPassSpecial, checkPassUpper } from '../External/auth';

const ForgotPassword = () => {
  const router = useRouter();
  const { authTarget } = useAuthTarget();

  const [formLoading, setFormLoading] = useState(false);

  const [contact, setContact] = useState('');
  const [phoneCode, setPhoneCode] = useState('233');
  const [contactTemp, setContactTemp] = useState('');

  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');

  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [contactExists, setContactExists] = useState(false);
  const [contactVerified, setContactVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passSpecial, setPassSpecial] = useState(false);
  const [passLower, setPassLower] = useState(false);
  const [passUpper, setPassUpper] = useState(false);


  useEffect(() => {
    const blacklistRef = collection(fireStoreDB, 'Blacklist/');
    const blacklistStream = onSnapshot(blacklistRef, (snapshot) => {
      setBlacklist(snapshot.docs.map((con) => con.id));
    });
    return () => blacklistStream();
  }, [])


  const handleContact = (val: string) => {
    setContact(val);
    setContactTemp(phoneCode + val);
    if (blacklist.includes(phoneCode + val)) {
      setContactExists(true);
    } else {
      setContactExists(false);
      setContactVerified(false);
    }
  }

  const handlePassword = (pass1: string) => {
    setPassword(pass1);
    setPassLength(checkPassLength(pass1));
    setPassSpecial(checkPassSpecial(pass1));
    setPassUpper(checkPassUpper(pass1));
    setPassLower(checkPassLower(pass1));
  }


  const runOTP = async () => {
    if (contactExists) {
      if (checkContact(phoneCode, contact)) {
        const res = await sendOTP(contactTemp);
        if (res.status === 200) {
          alert(`OTP sent to +${contactTemp}`);
        } else {
          alert('Please try again');
        }
      } else {
        console.log('z')
      }
    } else {
      alert("contact Doesn't Exist");
    }
  }

  const checkOTP = async () => {
    if (otp.length === 6) {
      const res = await verifyOTP(contactTemp, otp);
      if (res.status === 200) {
        setContactVerified(true);
      } else {
        alert('wrong');
      }
    } else {
      console.log('zzz');
    }
  }

  const resetPassword = async () => {
    if (checkContact(phoneCode, contact) && contact && password) {
      setErrorMessage(false);
      setFormLoading(true);
      const customer = await getDoc(doc(fireStoreDB, 'PhoneBook/' + contactTemp));
      if (customer) {
        const newPassword = await makePassword(password);
        await updateDoc(doc(fireStoreDB, 'PhoneBook/' + contactTemp), {
          password: newPassword,
        })
          .then(async () => {
            const isCorrect = await checkUser(contactTemp, password);
            if (isCorrect) {
              router.push(authTarget);
            } else {
              setFormLoading(false);
              setErrorMessage(true);
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      setFormLoading(false);
    }
  }

  return (
    <section className={styles.formBox}>
      <section className={styles.left}>
        <Image alt='' src={place} fill sizes='auto' />
        <div className={styles.statBox} >
          <p>
            {contactExists ?
              <span>Contact Check</span>
              :
              <span>Contact Doesn&apos;t Exist</span>
            }
            <sub style={!contactExists ? { background: 'tomato' } : { background: 'springgreen' }}></sub>
          </p>
          <p>
            <span>At Least 8 Characters</span>
            <sub style={passLength ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
          <p>
            <span>At Least 1 Special symbol</span>
            <sub style={passSpecial ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
          <p>
            <span>At Least 1 Upper Case</span>
            <sub style={passUpper ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
          <p>
            <span>At Least 1 Lower Case</span>
            <sub style={passLower ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
        </div>
      </section>
      <section className={styles.right}>
        <form onSubmit={(e) => e.preventDefault()}>
          <header>
            <Link href={'/'}>
              <MdArrowBack />
            </Link>
            <Image alt='' className='contain' src={logo} height={40} width={100} />
          </header>
          <section>
            <div>
              <span>Phone</span>
              <article className={styles.contactRow}>
                <select value={phoneCode} onChange={(e) => { setPhoneCode(e.target.value); setContactTemp(e.target.value + contact); }}>
                  {countryList.map((item, i) => (
                    <option key={i} value={item.phoneCode}>
                      + {item.phoneCode}
                    </option>
                  ))}
                </select>
                <input type="text" readOnly={contactVerified} value={contact} onChange={(e) => handleContact(e.target.value)} />
              </article>
            </div>
            {!contactVerified &&
              <p>
                <legend onClick={runOTP}>Send OTP</legend>
              </p>
            }
            <p>
              {!contactVerified &&
                <input type="text" placeholder='OTP' style={{ width: 150, letterSpacing: '10px' }} value={otp} onChange={(e) => e.target.value.length < 7 && setOTP(e.target.value)} />
              }
              <sub onClick={checkOTP} style={contactVerified ? { background: 'var(--pass)' } : { background: 'tomato' }}>
                {contactVerified ?
                  <IoMdDoneAll />
                  :
                  <span>check</span>
                }
              </sub>
            </p>
            
            <div style={!contactVerified ? { opacity: 0.5 } : { opacity: 1 }}>
              <span>Password</span>
              <input type="password" readOnly={contactVerified ? false : true} className='cash' value={password} onChange={(e) => handlePassword(e.target.value)} />
            </div>

            <>
              <ul className={styles.errorList}>
                <p>
                  <span>At Least 8 Characters</span>
                  <sub style={passLength ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
                </p>
                <p>
                  <span>At Least 1 Special symbol</span>
                  <sub style={passSpecial ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
                </p>
                <p>
                  <span>At Least 1 Upper Case</span>
                  <sub style={passUpper ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
                </p>
                <p>
                  <span>At Least 1 Lower Case</span>
                  <sub style={passLower ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
                </p>
              </ul>
            </>

            <button onClick={resetPassword} style={contactVerified && passLength && passSpecial && passUpper && passLower ? { opacity: 1 } : { opacity: 0.3, pointerEvents: 'none' }}>
              {!formLoading ?
                <span>Reset</span>
                :
                <legend className='miniLoader'>
                  <sub></sub>
                  <sub></sub>
                  <sub></sub>
                </legend>
              }
            </button>
          </section>

          <Link href={'/login'}>
            <small>Do you already have an account? login here</small>
          </Link>
        </form>
      </section>
    </section>
  );
}

export default ForgotPassword;