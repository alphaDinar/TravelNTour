'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { MdClose, MdSend } from 'react-icons/md';
import { logoImg } from '../../External/assets';
import styles from './whatsApp.module.css';

const WhatsApp = () => {
  const [message, setMessage] = useState('');
  const [finalMessage, setFinalMessage] = useState('👋 I want to know more');

  const name = "Pryme Tourism";
  const contact = "233546224111";

  const [chatBoxToggled, setChatBoxToggled] = useState(false);

  const toggleChatBox = () => {
    chatBoxToggled ? setChatBoxToggled(false) : setChatBoxToggled(true);
  }

  return (
    <section className={styles.box}>
      <legend className={styles.tag} onClick={toggleChatBox}>
        <FaWhatsapp />
      </legend>

      <article className={chatBoxToggled ? `${styles.chatBox} ${styles.change}` : styles.chatBox}>
        <header>
          <article>
            <Image alt='' src={logoImg} width={70} height={50} className='contain' />
            <p>
              <strong>{name}</strong>
              <small>Online</small>
            </p>
          </article>

          <MdClose className={styles.closeTag} onClick={toggleChatBox} />
        </header>

        <div>

          <article>
            <sub></sub>

            <span>Hey there 👋</span>
            <span>I&apos;m here to help, so let me know what&apos;s up and I&apos;ll be happy to find a solution 🤓</span>
          </article>

          <article>
            <sub></sub>

            <textarea value={message} onChange={(e) => { setMessage(e.target.value); setFinalMessage(e.target.value) }} placeholder='Type something Here...'>

            </textarea>
          </article>

          <Link href={`https://web.whatsapp.com/send?phone=${contact}&text=${finalMessage}`} target='_blank'>
            Send <MdSend />
          </Link>
        </div>
      </article>
    </section>
  );
}

export default WhatsApp;
