'use client'
import { FC } from 'react';
import styles from './pageHeader.module.css';
import { MdWest } from 'react-icons/md';
import { useRouter } from 'next/navigation';

type PageHeaderProps = {
  title: string
}
const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <header className={styles.pageHeader}>
      <h3> <MdWest onClick={() => router.back()} /> <span>{title}</span></h3>
    </header>
  );
}

export default PageHeader;