import Panel from '@/app/components/Panel/Panel';
import styles from './viewApplication.module.css';
import Image from 'next/image';



interface defType extends Record<string, any> { };
const ViewApplication = ({ searchParams }: { searchParams: { application: string } }) => {
  const app = JSON.parse(searchParams.application);

  return (
    <Panel>
      <section id="managerPage">
        <h3 id="title">{app.firstName} {app.secondName}</h3>

        <section className={styles.appBox}>
          <article>
            <span>First Name</span>
            <p>{app.firstName}</p>
          </article>

          <article>
            <span>Second Name</span>
            <p>{app.secondName}</p>
          </article>

          <article>
            <span>Passport Number</span>
            <p>{app.passportNumber}</p>
          </article>

          <article>
            <span>Gender</span>
            <p>{app.gender}</p>
          </article>

          <article>
            <span>Nationality</span>
            <p>{app.nationality}</p>
          </article>

          <article>
            <span>E-mail</span>
            <p>{app.email}</p>
          </article>

          <article>
            <span>Phone Number</span>
            <p>{app.phone}</p>
          </article>

          <article>
            <span>Communication Channel</span>
            <p>{app.email}</p>
          </article>

          <hr />

          {/* {app.mediaSet.map((media: defType, i: number) => (
            <div key={i}>
              <span>{media.id}</span>
              <legend>
              </legend>
            </div>
          ))} */}
        </section>
      </section>
    </Panel>
  );
}

export default ViewApplication;