import styles from '../styles/forms.module.css';

interface defType extends Record<string, any> { };


export const formHeader = (text: string) => {
  return <header className={styles.formHeader}><h3>{text} <sub></sub></h3></header>
}

type notify = {
  active: boolean,
  type: string,
  text: string
}

export const fixNote = (type: string, text: string): notify => {
  return {
    active: true,
    type: type,
    text: text
  }
}

export const resetNote = (type: string, text: string): notify => {
  return {
    active: false,
    type: type,
    text: text
  }
}


type prompt = {
  status: boolean,
  text: string,
  type: string,
}

export const fixPrompt = (type: string, text: string): prompt => {
  return {
    status: true,
    text: text,
    type: type
  }
}

export const resetPrompt = (text: string, type: string): prompt => {
  return {
    status: false,
    text: text,
    type: type
  }
}


export const checkValueExists = (value: string, valueList: string[]) => {
  const valueExists = valueList.includes(value.toLowerCase());
  return valueExists;
}

export const caps = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}