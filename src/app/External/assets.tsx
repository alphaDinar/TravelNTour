import { MdOutlineDirectionsBoatFilled, MdOutlineForest } from 'react-icons/md';
import { PiAirplaneInFlightLight } from 'react-icons/pi';
import { IoBusOutline } from 'react-icons/io5';
import { TbBeach } from 'react-icons/tb';
import { GiOasis } from 'react-icons/gi';
import logoTemp from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export const logoImg = logoTemp;
export const logo = <Link href={'/'}> <Image alt='' src={logoTemp} width={70} height={60} className='contain' /></Link>;

export const categoryList = [
  { tag: 'Beach Activity', iconEl: <TbBeach /> },
  { tag: 'Desert Trip', iconEl: <GiOasis /> },
  { tag: 'Adventure Trip', iconEl: <MdOutlineForest /> }
]

export const travelModeList = [
  { tag: 'Air Travel', iconEl: <PiAirplaneInFlightLight /> },
  { tag: 'Land Travel', iconEl: <IoBusOutline /> },
  { tag: 'Water Travel', iconEl: <MdOutlineDirectionsBoatFilled /> }
]