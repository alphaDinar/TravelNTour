'use client';
import { fireStoreDB, storageDB } from "@/Firebase/base";
import { useIsLoading } from "@/app/contexts/isLoadingContext";
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { BaseOptions } from "flatpickr/dist/types/options";
import { useEffect, useRef, useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import styles from '../../styles/forms.module.css';
import { useNotify } from "@/app/contexts/notifyContext";
import Panel from "@/app/components/Panel/Panel";
import { fixNote, formHeader } from "@/app/External/forms";
import { getDuration, getRealDate } from "@/app/External/time";
import { categoryList, travelModeList } from "@/app/External/assets";
import Image from "next/image";
import gStyles from '../../viewTour/viewTour.module.css';
import { MdAddAPhoto } from "react-icons/md";
import { getDownloadURL, uploadBytes, ref as sRef } from "firebase/storage";

interface defType extends Record<string, any> { };
const AddTour = () => {
  const place = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1708045670/maqete/place_qlf6zd.jpg';

  const { setIsLoading } = useIsLoading();
  const { setNotify } = useNotify();

  const [destination, setDestination] = useState('');
  const [description, setDescription] = useState('');
  // const [tourGuide, setTourGuide] = useState('');
  const [category, setCategory] = useState('');
  const [travelMode, setTravelMode] = useState('Air Travel');

  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);

  const [accommodation, setAccommodation] = useState(0);

  const [price, setPrice] = useState(10);

  const [dayCount, setDayCount] = useState(1);

  const [checkInDate, setCheckInDate] = useState('');
  const checkInDateIn = useRef<HTMLInputElement>(null);
  const checkInTimeIn = useRef(null);

  const [checkInDateVal, setCheckInDateVal] = useState(getRealDate(new Date().getTime()));
  const [checkOutDateVal, setCheckOutDateVal] = useState(getRealDate(new Date().setDate(new Date().getDate() + 1)));

  const [imagePreview, setImagePreview] = useState(place);
  const [image, setImage] = useState<defType>({});
  const [mediaSet, setMediaSet] = useState(Array(4).fill({ type: 'image', format: 'jpg' }));
  const [mediaPreviewSet, setMediaPreviewSet] = useState<string[]>(Array(4).fill(place));

  const [priority, setPriority] = useState(1);

  const flatpickrInstance = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    const dateOptions: Partial<BaseOptions> = {
      altInput: false,
      mode: "range",
      altFormat: "J F, Y",
      dateFormat: "Y-m-d",
      minDate: "today",
      defaultDate: [new Date(), new Date().setDate(new Date().getDate() + 1)],
      onChange: (selectedDates: Date[]) => {
        const checkIn = selectedDates[0];
        const checkOut = selectedDates[1];
        setDayCount(getDuration(checkIn, checkOut));
        setCheckInDateVal(getRealDate(checkIn.getTime()));
        setStartDate(checkIn.getTime());
        setCheckOutDateVal(getRealDate(checkOut.getTime()));
        setEndDate(checkOut.getTime());
      },
    }
    if (checkInDateIn.current) {
      flatpickr(checkInDateIn.current, dateOptions);
    }


    const timeOptions = {
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
      defaultDate: new Date()
    }


    setIsLoading(false);
  }, [setIsLoading])

  const handleImage = (media: File) => {
    if (media.size / 1000 > 5000) {
      alert(`${media.size / 1000}kb File size exceeded, max of 5 mb`);
    } else {
      const imageData = {
        name: media.name,
        type: media.type.split('/')[0],
        format: media.type.split('/')[1],
        blob: media
      }
      setImage(imageData);
      setImagePreview(URL.createObjectURL(media));
    }
  }

  const handleMediaSet = (media: File, i: number) => {
    if (media.size / 1000 > 3000) {
      alert(`${media.size / 10000}mb File size exceeded, max of 3 mb`);
    } else {
      const mediaPrevTemp = [...mediaPreviewSet];
      mediaPrevTemp[i] = URL.createObjectURL(media);
      setMediaPreviewSet(mediaPrevTemp);
      const mediaSetTemp = [...mediaSet];
      mediaSetTemp[i] = {
        name: media.name,
        type: media.type.split('/')[0],
        format: media.type.split('/')[1],
        blob: media,
      };
      setMediaSet(mediaSetTemp);
    }
  }

  const uploadObj = async (obj: defType) => {
    let set = null;
    const stamp = new Date().getTime();
    const objName = `${obj.name}${stamp}`;
    await uploadBytes(sRef(storageDB, 'Tours/' + objName), obj.blob)
      .then((res) =>
        getDownloadURL(res.ref)
          .then((urlRes) => {
            image['url'] = urlRes;
            delete image.blob
            set = urlRes
          })
          .catch((error) => console.log(error)))
    return set;
  }

  const uploadSet = (mediaSet: defType[]) => {
    const uploadPromises = mediaSet.map((media) => {
      if (media.blob) {
        return uploadBytes(sRef(storageDB, 'Tours/' + media.name), media.blob)
          .then((res) => getDownloadURL(res.ref))
          .catch((error) => console.log(error))
      } else {
        return Promise.resolve('empty');
      }
    })

    return Promise.all(uploadPromises)
      .then((urls) => {
        urls.forEach((urlRes, i) => {
          if (urlRes) {
            mediaSet[i] = {
              ...mediaSet[i],
              url: urlRes
            }
            delete mediaSet[i].blob;
          }
        });
        return mediaSet;
      });
  }

  const resetDates = () => {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 1);

    setStartDate(defaultStartDate.getTime());
    setEndDate(defaultEndDate.getTime());
    setCheckInDateVal(getRealDate(defaultStartDate.getTime()));
    setCheckOutDateVal(getRealDate(defaultEndDate.getTime()));
    if (flatpickrInstance.current) {
      flatpickrInstance.current.setDate([defaultStartDate, defaultEndDate], true);
    }
  };

  const createTour = async () => {
    setIsLoading(true);
    const imageUrl = await uploadObj(image);
    if (imageUrl) {
      await uploadSet(mediaSet)
        .then(async () => {
          await setDoc(doc(fireStoreDB, 'Tours/' + destination), {
            description: description,
            startDate: startDate,
            endDate: endDate,
            accommodation: 1,
            category: category,
            travelMode: travelMode,
            price: price,
            priority: priority,
            status: 1,
            image: image,
            mediaSet: mediaSet,
            views: 0,
            ratings: [],
            reviews: []
          })
        })
        .then(() => {
          setIsLoading(false);
          setCheckInDate('');
          setDayCount(1);
          resetDates();
          resetForm();
          setNotify(fixNote('pass', 'Tour Created Successfully'));
        })
        .catch((error) => console.log(error))
    }
  }

  const resetForm = () => {
    setDestination('');
    setDescription('');
    setCategory('');
    setTravelMode('Air Travel');
    setStartDate(0);
    setEndDate(0);
    setAccommodation(0);
    setPrice(10);
    setImagePreview(place);
    setImage({});
    setMediaSet(Array(4).fill({ type: 'image', format: 'jpg' }));
    setMediaPreviewSet(Array(4).fill(place));
    setPriority(1);
  }

  return (
    <Panel>
      <section className={styles.formBox}>
        {formHeader('Add Tour')}
        <form onSubmit={(e) => { e.preventDefault(); createTour(); }} >
          <p>
            <span>Destination</span>
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          </p>

          <p>
            <span>Description</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </p>

          {/* <p>
            <span>Tour Guide</span>
            <select value={tourGuide} onChange={(e) => setTourGuide(e.target.value)} required>
              <option value="James">James</option>
            </select>
          </p> */}

          <p>
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option hidden>Select Category</option>
              {categoryList.map((cat, i) => (
                <option value={cat.tag} key={i}>{cat.tag}</option>
              ))}
            </select>
          </p>

          <p>
            <span>Mode Of Travel</span>
            <select value={travelMode} onChange={(e) => setTravelMode(e.target.value)} required>
              <option hidden>Select mode of travel</option>
              {travelModeList.map((mot, i) => (
                <option value={mot.tag} key={i}>{mot.tag}</option>
              ))}
            </select>
          </p>

          <article className={styles.dateRangeBox}>
            <p>
              <span>Duration</span>
              <label htmlFor="checkInDate" className={styles.dateLabel}>
                <input type="date" style={{}} id="checkInDate" value={checkInDate} ref={checkInDateIn} onChange={(e) => setCheckInDate(e.target.value)} required />
                <legend>{checkInDateVal}</legend>
                <FaArrowRightArrowLeft />
                <legend>{checkOutDateVal}</legend>
                <hr />
                <sub>{dayCount} days</sub>
              </label>
            </p>
          </article>

          <p>
            <span>Accommodation</span>
            <select value={accommodation.toString()} onChange={(e) => setAccommodation(parseInt(e.target.value))} required>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </p>

          <p>
            <span>Price</span>
            <input type="number" min={10} value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </p>

          <section className={gStyles.gallery}>
            <article className={gStyles.left} style={{ border: '1px solid var(--primary)' }}>
              <Image alt='Add Image' className='cover' fill src={imagePreview} />
              <label htmlFor="addImage">
                <input className="cover" type="file" id="addImage" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImage(e.target.files![0])} required />
                <MdAddAPhoto className={styles.addPhoto} />
              </label>
            </article>
            <section className={gStyles.right}>
              {mediaSet.map((el, i) => (
                <div key={i} style={{ border: '1px solid var(--primary)' }}>
                  <Image alt='Add Image' className="cover" fill src={mediaPreviewSet[i]} />
                  <label htmlFor={`addMedia${i}`}>
                    <input type="file" accept="image/*" id={`addMedia${i}`} style={{ display: 'none' }} onChange={(e) => handleMediaSet(e.target.files![0], i)} />
                    <MdAddAPhoto className={styles.addPhoto} />
                  </label>
                </div>
              ))}
            </section>
          </section>

          <p>
            <span>Priority</span>
            <input type="number" min={1} value={priority} onChange={(e) => setPriority(Number(e.target.value))} required />
          </p>

          <button>Confirm</button>
        </form>
      </section>
    </Panel>
  );
}

export default AddTour;