'use client'
import { sendOTP, verifyOTP } from '@/app/External/arkesel';
import { makePassword } from '@/app/External/phoneBook';
import { fireAuth, fireStoreDB, googleProvider } from '@/Firebase/base';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { checkContact, checkPassLength, checkPassLower, checkPassSpecial, checkPassUpper } from '@/app/External/auth';
import { countryList } from '@/app/External/lists';
import place from '../../../public/register.jpg';
import { useAuthTarget } from '../contexts/authTargetContext';
import styles from './register.module.css';
import { logo } from '../External/assets';

const Register = () => {
  const router = useRouter();
  const { authTarget } = useAuthTarget();

  const [formLoading, setFormLoading] = useState(false);

  const [stepCounter, setStepCounter] = useState(0);
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [phoneCode, setPhoneCode] = useState('233');
  const [contactTemp, setContactTemp] = useState('');

  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [errorText, setErrorText] = useState('');
  const [infoText, setInfoText] = useState('');
  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [contactExists, setContactExists] = useState(false);
  const [contactCorrect, setContactCorrect] = useState(false);
  const [contactVerified, setContactVerified] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
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

  const googleRegister = () => {
    signInWithPopup(fireAuth, googleProvider)
      .then(async (user) => {
        const username = user.user.displayName || 'Dashboard';
        const tourist = await getDoc(doc(fireStoreDB, 'Tourists/' + user.user.uid))
        if (tourist !== undefined && tourist.data() !== undefined) {
          router.push(authTarget);
        } else {
          const keywords = JSON.parse(sessionStorage.getItem('maqKeywords') || '[]');
          setDoc(doc(fireStoreDB, 'Tourists/' + user.user.uid), {
            email: user.user.email,
            contact: '',
            username: username,
            favorites: []
          })
            .then(() => router.push(authTarget))
            .catch((error) => console.log(error));
        }
      })
  }

  const handleContact = (val: string) => {
    setContact(val);
    setContactTemp(phoneCode + val);
  }

  const handlePassword = (pass1: string, pass2: string) => {
    setPassword(pass1);
    setConPassword(pass2);
    setPassLength(checkPassLength(pass1));
    setPassSpecial(checkPassSpecial(pass1));
    setPassUpper(checkPassUpper(pass1));
    setPassLower(checkPassLower(pass1));

    if (pass1 === pass2) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }


  const runOTP = async () => {
    const res = await sendOTP(contactTemp);
    if (res.status === 200) {
      setStepCounter(1);
      setInfoText('OTP Sent To Your Device')
    } else {
      alert('Please try again');
    }
  }

  const checkOTP = async () => {
    if (otp.length === 6) {
      const res = await verifyOTP(contactTemp, otp);
      if (res.status === 200) {
        setErrorText('');
        setStepCounter(2);
        setContactVerified(true);
      } else {
        alert('wrong');
      }
    } else {
      setErrorText('OTP must be 6 digits')
    }
  }

  const createTourist = async () => {
    if (contactVerified && passLength && passMatch && passUpper && passLower && passSpecial && !contactExists) {
      setFormLoading(true);
      const passKey = await makePassword(password);
      const email = contactTemp + '@gmail.com';
      createUserWithEmailAndPassword(fireAuth, email, passKey)
        .then((user) => {
          const updatedContact = contactTemp;
          setDoc(doc(fireStoreDB, 'Tourists/' + user.user.uid), {
            email: '',
            contact: updatedContact,
            username: username,
            favorites: [],
          })
            .then(() => {
              setDoc(doc(fireStoreDB, 'Blacklist/' + contactTemp), {})
                .then(() => addToPhoneAuth(passKey))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
    } else {
      setFormLoading(false);
    }
  }

  const addToPhoneAuth = async (passKey: string) => {
    setDoc(doc(fireStoreDB, 'PhoneBook/' + contactTemp), {
      contactKey: contactTemp,
      passKey: passKey,
      contact: contactTemp,
      password: passKey
    })
      .then(() => router.push(authTarget))
      .catch((error) => console.log(error));
  }


  const nextStep = () => {
    if (stepCounter === 0) {
      if (checkContact(phoneCode, contact)) {
        if (!blacklist.includes(phoneCode + contact)) {
          runOTP();
          setStepCounter(1);
          setErrorText('');
        } else {
          setErrorText('Contact Already Exists');
        }
      } else {
        setErrorText('Enter A Valid Contact');
      }
    } else if (stepCounter === 1) {
      checkOTP();
      setStepCounter(2);
    } else if (stepCounter === 2) {
      if (passLength && passMatch && passUpper && passLower && passSpecial) {
        setInfoText('Almost Done');
        setStepCounter(3);
      } else {
        console.log('wrong');
      }
    }
  }

  return (
    <section className={styles.formBox}>
      <section className={styles.left}>
        <Image alt='' className='contain' src={place} fill sizes='auto' />
      </section>
      <section className={styles.right}>
        <form onSubmit={(e) => { e.preventDefault(); createTourist() }}>
          <header>
            <Link href={'/'}>
              <MdArrowBack />
            </Link>
            {logo}
          </header>
          <section>

            <article className={styles.stepBox}>
              {Array(4).fill('a').map((el, i) => (
                <p className={i <= stepCounter ? styles.change : ''} key={i}>
                  <sup></sup>
                </p>
              ))}
            </article>

            {errorText &&
              <legend className={styles.errorBox}>{errorText}</legend>
            }

            {infoText &&
              <legend className={styles.infoBox}>{infoText}</legend>
            }

            {stepCounter === 0 ?
              <div>
                <span>Phone Number</span>
                <article className={styles.contactRow}>
                  <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                    {countryList.map((item, i) => (
                      <option key={i} value={item.phoneCode}>
                        + {item.phoneCode}
                      </option>
                    ))}
                  </select>
                  <input type="text" value={contact} readOnly={contactVerified} onChange={(e) => handleContact(e.target.value)} required />
                </article>
              </div>
              : stepCounter === 1 ?
                <div>
                  <span>Enter OTP</span>
                  <input type="number" placeholder='OTP' style={{ letterSpacing: '10px' }} value={otp} onChange={(e) => e.target.value.length < 7 && setOTP(e.target.value)} />
                </div>
                : stepCounter == 2 ?
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
                      <p>
                        <span>Password Match</span>
                        <sub style={passMatch ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
                      </p>
                    </ul>
                    <div>
                      <span>Password</span>
                      <input type="password" value={password} onChange={(e) => handlePassword(e.target.value, conPassword)} required />
                    </div>
                    <div>
                      <span>Confirm Password</span>
                      <input type="password" value={conPassword} onChange={(e) => handlePassword(password, e.target.value)} required />
                    </div>
                  </>
                  :
                  <>
                    <div>
                      <span>Username</span>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                  </>
            }

            {stepCounter !== 3 ?
              <legend className={styles.nextTab} onClick={nextStep}>Next <MdArrowForward /></legend>
              :
              <button>
                {!formLoading ?
                  <span>Register</span>
                  :
                  <legend className='miniLoader'>
                    <sub></sub>
                    <sub></sub>
                    <sub></sub>
                  </legend>
                }
              </button>
            }

          </section>

          <footer>
            <FcGoogle onClick={googleRegister} />
          </footer>

          <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
            <Link href={'/login'}>
              <small>Do you already have an account? login here</small>
            </Link>

            <Link href={'/forgotPassword'}>
              <small style={{ color: 'tomato', fontWeight: 600 }}>Forgot Password? Reset here</small>
            </Link>
          </article>
        </form>
      </section>
    </section>
  );
}

export default Register;