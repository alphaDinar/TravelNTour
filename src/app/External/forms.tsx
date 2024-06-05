import styles from '../styles/forms.module.css';

interface defType extends Record<string, any> { };


export const formHeader = (text: string) => {
  return <header className={styles.formHeader}><h3>{text} <sub></sub></h3></header>
}

export const fixNote = (type: string, text: string) => {
  return {
    active: true,
    type: type,
    text: text
  }
}

export const resetNote = (type: string, text: string) => {
  return {
    active: false,
    type: type,
    text: text
  }
}

export const checkValueExists = (value: string, valueList: string[]) => {
  const valueExists = valueList.includes(value.toLowerCase());
  return valueExists;
}

export const caps = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}