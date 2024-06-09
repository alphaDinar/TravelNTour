'use client';
import { logo } from '@/app/External/assets';
import styles from './login.module.css';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { fireAuth } from '@/Firebase/base';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginManager = () => {
    signInWithEmailAndPassword(fireAuth, email, password)
      .then((res) => {
        if (res) {
          if (res.user.email === 'pryme@manager.com') {
            router.push('/manager');
          } else {
            signOut(fireAuth)
              .then(() => window.location.reload());
          }
        } else {
          signOut(fireAuth)
            .then(() => window.location.reload());
        }
      })
  }

  return (
    <section className={styles.loginBox}>
      <form onSubmit={(e) => { e.preventDefault(); loginManager() }}>
        {logo}

        <p>
          <span>E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </p>

        <p>
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </p>

        <button>Login</button>
      </form>
    </section>
  );
}

export default Login;