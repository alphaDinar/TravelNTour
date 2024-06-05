'use client';
import { fireStoreDB } from "@/Firebase/base";
import Panel from "@/app/components/Panel/Panel";
import { useIsLoading } from "@/app/contexts/isLoadingContext";
import { useNotify } from "@/app/contexts/notifyContext";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fixNote, formHeader } from "../../External/forms";
import styles from '../../styles/forms.module.css';


interface defType extends Record<string, any> { };
const AddCategory = () => {
  const { setIsLoading } = useIsLoading();
  const { setNotify } = useNotify();

  const [name, setName] = useState('');

  useEffect(() => {
    setIsLoading(false);
  }, [])


  const createCategory = async () => {
    setIsLoading(true);
    await setDoc(doc(fireStoreDB, 'Categories/' + name), {
      name: name,
    })
      .then(() => {
        resetForm();
        setNotify(fixNote('pass', 'Category Created Successfully'));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const resetForm = () => {
    setName('');
  }

  return (
    <Panel>
      <section className={styles.formBox}>
        {formHeader('Add Category')}

        <form onSubmit={(e) => { e.preventDefault(); createCategory(); }} >
          <p>
            <span>Category Name</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </p>
          <button>Confirm</button>
        </form>
      </section>
    </Panel>
  );
}

export default AddCategory;