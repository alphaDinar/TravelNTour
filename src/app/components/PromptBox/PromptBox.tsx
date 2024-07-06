'use client';
import { FC } from 'react';
import styles from './promptBox.module.css';
import { MdClose, MdTaskAlt } from 'react-icons/md';
import { usePrompt } from '@/app/contexts/promptContext';
import { resetPrompt } from '@/app/External/forms';


const PromptBox = () => {
  const { prompt, setPrompt } = usePrompt();

  return (
    <article
      onClick={() => setPrompt(resetPrompt(prompt.text, prompt.type))}
      style={prompt.type === 'pass' ? { background: 'var(--pass)' } : { background: 'var(--red)' }}
      className={prompt.status ? styles.prompt : `${styles.prompt} ${styles.hidden}`}
    >
      {prompt.type === 'pass' ?
        <MdTaskAlt />
        :
        <MdClose />
      }

      <small className='cash'>{prompt.text}</small>
    </article>
  );
}

export default PromptBox;