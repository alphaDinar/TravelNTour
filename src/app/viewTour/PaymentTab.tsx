'use client'
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { createPayLink } from '../External/paystack';
import { fireStoreDB } from '@/Firebase/base';

interface defType extends Record<string, any> { };
type PaymentProps = {
  tour: defType,
}
const PaymentTab: FC<PaymentProps> = ({ tour }) => {
  const router = useRouter();
  const { user } = useUser();
  const [email, setEmail] = useState(user?.email);

  const makePayment = async () => {
    if (user) {
      const stamp = new Date().getTime();
      const tid = `tid${stamp}`;
      const payObj = await createPayLink(tour.price * 100, tid, email);
      await setDoc(doc(fireStoreDB, 'Trips/' + tid), {
        uid: user.uid,
        username: user.tourist.username,
        email: email,
        contact: user.tourist.contact,
        tour: tour,
        price: tour.price,
        payStatus: 0,
        payRef: payObj.ref,
        timestamp: stamp
      })
      router.push(payObj.link);
    } else {
      sessionStorage.setItem('authTarget', window.location.href);
      router.push('/register');
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); makePayment() }}>
      <input type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button>Book Tour</button>
    </form>
  );
}

export default PaymentTab;