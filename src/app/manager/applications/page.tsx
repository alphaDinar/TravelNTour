import Panel from "@/app/components/Panel/Panel";
import styles from './applications.module.css';
import Link from "next/link";
import { CiFlag1 } from "react-icons/ci";
import { MdEast, MdMailOutline, MdPhone } from "react-icons/md";
import { BsChatText } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import { fireStoreDB } from "@/Firebase/base";

interface defType extends Record<string, any> { };
const Applications = async () => {
  const applications: defType[] = (await getDocs(collection(fireStoreDB, 'Applications/'))).docs.map((el) => ({ id: el.id, ...el.data() }));

  return (
    <Panel>
      <section id="managerPage">
        <h3 id="title">Dubai Applications</h3>

        <section className={styles.items}>
          {applications.map((el, i) => (
            <Link href={''} className={styles.item} key={i}>
              <strong>{el.firstName} {el.secondName}</strong>

              <article>
                <CiFlag1 />
                <span>{el.nationality}</span>
              </article>

              <article>
                <MdMailOutline />
                <span>{el.email}</span>
              </article>

              <article>
                <MdPhone />
                <span>{el.phone}</span>
              </article>

              <article>
                <BsChatText />
                <span>{el.channel}</span>
              </article>

              <MdEast className={styles.tab} />
            </Link>
          ))}
        </section>
      </section>
    </Panel>
  );
}

export default Applications;