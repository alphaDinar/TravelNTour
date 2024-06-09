// import Lottie from 'lottie-react';
// import itemLoaderRef from '../../public/itemLoader.json';
import { MdArrowBack, MdOutlineAssignment, MdOutlineNotifications, MdOutlinePayment, MdOutlineSupportAgent } from 'react-icons/md';
import { CiWallet } from 'react-icons/ci';
import { RiCoupon3Line } from 'react-icons/ri';
import { GoReport } from 'react-icons/go';
import { RxDashboard } from 'react-icons/rx';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';


export const sampleImg = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707928017/pixel_oweiao.png';

export const place = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1708045670/maqete/place_qlf6zd.jpg';

// export const itemLoader = <Lottie animationData={itemLoaderRef} />;


export const userList = [
  // { tag: 'My Dashboard', iconEl: <RxDashboard />, target : '' },
  { tag: 'My Orders', iconEl: <MdOutlineAssignment />, target: '/orders' },
  { tag: 'My Profile', iconEl: <CgProfile />, target: '/profile' },
  { tag: 'Notifications', iconEl: <MdOutlineNotifications />, target: '/notifications' },
  { tag: 'My Wallet', iconEl: <CiWallet />, target: '' },
  { tag: 'Payment', iconEl: <MdOutlinePayment />, target: '' },
  { tag: 'My Coupons', iconEl: <RiCoupon3Line />, target: '' },
  { tag: 'Help Center', iconEl: <MdOutlineSupportAgent />, target: '' },
  { tag: 'Disputes & Reports', iconEl: <GoReport />, target: '' }
]

export const paymentMethodList = [
  { tag: 'Paystack', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707772904/Agrivestafrica/paystack_elrs9j.png' },
  { tag: 'MTN', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773080/Agrivestafrica/mtn_tlljga.png' },
  { tag: 'Vodafone', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773155/Agrivestafrica/voda-removebg-preview_1_c8njum.png' },
  { tag: 'AirtelTigo', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773220/Agrivestafrica/airtel-removebg-preview_1_possew.png' },
  { tag: 'Visa', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773591/Agrivestafrica/visa-removebg-preview_1_gvzm2h.png' },
  { tag: 'Master', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1707773592/Agrivestafrica/master_mhgszl.webp' }
]

export const collaboratorList = [
  { tag: 'Best Western', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717596377/travelntour/1200px-Best_Western_logo.svg-removebg-preview_frwp8d.png" },
  { tag: 'Virgin Hotels', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717596731/travelntour/897_virgin_hotels__1_-removebg-preview_begmgn.png" },
  { tag: 'Singapore Airlines', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717596807/travelntour/png-transparent-singapore-airlines-hd-logo-thumbnail-removebg-preview_dsk2jg.png" },
  { tag: 'Air Canada', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717597002/travelntour/png-transparent-air-canada-removebg-preview_fbasvj.png" },
  { tag: 'America Airlines', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717597759/travelntour/normal_664904c0a4e01__1_-removebg-preview_wsj24z.png" },
  { tag: 'Canadian Tourism Commission', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717597377/travelntour/normal_664904b0b4827__2_-removebg-preview_gsqmkw.png" },
  { tag: 'Gulf Air', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717597125/travelntour/normal_66490605a7d59_tbjjzm.svg" },
  { tag: 'Holiday Inn', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717597691/travelntour/Holiday_Inn_Logo.svg-removebg-preview_xmswmc.png" },
  { tag: 'Croatia Airlines', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717597826/travelntour/1280px-Croatia_Airlines_Logo_2.svg-removebg-preview_rzeelt.png" },
  { tag: 'World Travel', img: "https://res.cloudinary.com/dvnemzw0z/image/upload/v1717598199/travelntour/400_filter_nobg_655392d96e0a6-removebg-preview_u2frml.png" },
]


export const pageHeader = (title: string, target: string) => {
  return <section className='pageHeader'>
    <Link href={target} className='back'>
      <MdArrowBack />
      <strong>{title}</strong>
    </Link>
  </section>
}

export const countryList = [
  { country: 'Ghana', countryCode: 'GH', phoneCode: '233', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711548556/maqete/Flags/ghana_l7rhko.png' },
  { country: 'US', countryCode: 'US', phoneCode: '1', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711548557/maqete/Flags/us_pdgqo5.png' },
  { country: 'US', countryCode: 'US', phoneCode: '1', img: 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711548557/maqete/Flags/us_pdgqo5.png' },
];


import { MdBolt, MdOutlineConstruction, MdOutlineGroupAdd } from "react-icons/md";
import { TbBeach } from 'react-icons/tb';
import { GiMoneyStack, GiOasis } from 'react-icons/gi';


export const targetList = [
  {
    tag: 'home',
    linkList: [
      // { type: 'normal', tag: 'Overview', iconEl: <MdBolt />, target: '/' },
      { type: 'normal', tag: 'Tours', iconEl: <GiOasis />, target: '/manager' },
      { type: 'normal', tag: 'Add Tour', iconEl: <TbBeach />, target: '/manager/addTour' },
      { type: 'normal', tag: 'Booked Trips', iconEl: <GiMoneyStack />, target: '/manager/trips' },
      {
        type: 'dropDown', tag: 'Dropped', iconEl: <MdOutlineConstruction />, index: 0,
        subList: [
          { tag: 'Posts', target: '/posts' },
          { tag: 'Blog', target: '/blog' }
        ]
      }
    ]
  },
  // {
  //   tag: 'Guests',
  //   linkList: [
  //     { type: 'normal', tag: 'Check-Ins', iconEl: <MdBolt />, target: '/' },
  //     { type: 'normal', tag: 'Payments', iconEl: <MdBolt />, target: '/' },
  //     { type: 'normal', tag: 'Check-Outs', iconEl: <MdBolt />, target: '/' },
  //   ]
  // },
  // {
  //   tag: 'Rooms',
  //   linkList: [
  //     { type: 'normal', tag: 'Available Rooms', iconEl: <MdBolt />, target: '/' },
  //     { type: 'normal', tag: 'Rates', iconEl: <MdBolt />, target: '/' }
  //   ]
  // },
  // {
  //   tag: 'Events',
  //   linkList: [
  //     { type: 'normal', tag: 'Delivery', iconEl: <MdBolt />, target: '/' },
  //     {
  //       type: 'dropDown', tag: 'Logistics', iconEl: <MdOutlineConstruction />, index: 1,
  //       subList: [
  //         { tag: 'Dispatch', target: '/posts' },
  //         { tag: 'Warehouse', target: '/blog' }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   tag: 'Rooms',
  //   linkList: [
  //     { type: 'normal', tag: 'Room Types', iconEl: <MdBolt />, target: '/admin/roomTypes' },
  //     { type: 'normal', tag: 'Room Lists', iconEl: <MdBolt />, target: '/admin/rooms' },
  //   ]
  // }
]


