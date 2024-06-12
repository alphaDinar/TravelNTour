'use client';
import TopNav from "../components/TopNav/TopNav";
import styles from '../styles/visa.module.css';
import student from '../../../public/student.webp';
import Image from "next/image";
import { useState } from "react";
import ExploreBox from "../components/Visa/ExploreBox";
import ServiceBox from "../components/Visa/ServiceBox";
import { FaPeopleGroup } from "react-icons/fa6";
import FooterBox from "../components/FooterBox/FooterBox";
import { GiHealthIncrease } from "react-icons/gi";
import { IoBriefcaseOutline, IoCloudUploadOutline, IoHappyOutline } from "react-icons/io5";
import { TiWorldOutline } from "react-icons/ti";
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { MdArrowDropDownCircle, MdOutlineControlPoint, MdOutlineTaskAlt, MdTaskAlt, MdTimer } from "react-icons/md";
import { checkContact } from "../External/auth";
import { IoIosArrowDropdown } from "react-icons/io";
// import { checkFullContact } from "../External/auth";

const StudentVisa = () => {
  const [formStep, setFormStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState('');

  const [passportImageScanned, setPassportImageScanned] = useState<File | null>(null);
  const [passportImageWhite, setPassportImageWhite] = useState<File | null>(null);
  const [bankStatement, setBankStatement] = useState<File | null>(null);
  const [residence, setResidence] = useState<File | null>(null);

  const [purpose, setPurpose] = useState('');
  const [processing, setProcessing] = useState('');
  const [visaType, setVisaType] = useState('');
  const [dateOfTravel, setDateOfTravel] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [bankPaymentSlip, setBankPaymentSlip] = useState<File | null>(null);
  const [momoShot, setMomoShot] = useState<File | null>(null);

  const [activeFAQ, setActiveFAQ] = useState(-1);


  const channelList = ["Call", "WhatsApp", 'Email', "Botim", "Other"];
  const processingList = [
    "Normal(Guaranteed Within 3 business days)",
    "(Guaranteed Within 48 hours)",
    "Top Urgent (Within 24 Business hours)"
  ]

  const visaTypeList = [
    "30 Days",
    "30 Days Multi Entry",
    "60 Days",
    "60 Days Multi",
    "Visa Extension",
    "A2A Extension",
    "Transit Visa"
  ]


  const faqList = [
    { tag: 'Is visa on arrival available for the UAE?', text: "Yes, Residents of select countries do not require advance visa arrangements to enter the UAE and can receive a visa on arrival. Indian nationals with a regular passport, a current visa, or residency in the UK, the EU, or the USA are eligible to apply for an on-site UAE visa for stays up to 14 days. The duration of validity for the US visa, Green Card, UK residency permit, and EU residency permit must be at least six months from the date of entry into the UAE. The duration of the visa-on-arrival is 14 days, with a single extension of the same length of time. The passport must have a minimum remaining validity of six months, and an entry permit will cost Dirham 100." },
    {
      tag: 'What requirements must be met before applying for a UAE visa?', text: "You must distinctly state the following in order for the authorities to process your application:", points:
        [
          'What brings you to the UAE?',
          'How long do you want to stay in the UAE?',
          'During your stay in the UAE, how will you support yourself?',
          'What brings you to the United Arab Emirates?',
          'Your passport type and its validity period',
          'Where do you plan to go after your visit to the UAE?',
          'Whether you are authorized to enter the country following your stay in the UAE'
        ]
    },
    { tag: 'How can I apply online for a visa to the UAE?', text: "With the ease of online UAE Visa application processes, OUR team can easily assist you to obtain a UAE visa." },
    {
      tag: 'How do I apply online for a UAE visa?', text: '', points: [
        'Depending on your intended mode of travel, select your preferred form of UAE visa.',
        'Make an online payment',
        'Use our website to submit documents online.',
        'Once it has been approved, get your UAE visa.'
      ]
    },
    {
      tag: 'What size photo do you need for a UAE visa?', text: "The prerequisites listed below must be met by the UAE visa photo. If not, the application will be postponed until the proper images are provided.", points: [
        'A 45 mm by 35 mm photo is required.',
        '70-80% of the image should be taken up by the face.',
        'Vivid colors. No photos in black and white will be accepted.',
        'Taken with a background of pure white',
        'Taken in the last three months',
        'Your head should directly face the camera. It must not be even slightly rotated or tilted.',
        'In the photograph, the head must be centered. You must face the camera directly and show your entire face.',
        'Avoid using sunglasses or coloured or tinted glasses. Your eyes must be clearly visible in the picture if you often use spectacles.',
        'You must send us a scanned copy of your digital size photo in JPEG format by email or WhatsApp.'
      ]
    },
    { tag: 'What is the cost of an arrival visa for the UAE?', text: 'AED 100 will get you a 14-day maximum stay UAE visa when you arrive. By paying a renewal charge of AED 250, you may extend your stay by an extra 14 days just once.' },
    {
      tag: 'Can my visa for the UAE be rejected?', text: 'Yes. Your application for a UAE visa, like those for other nations, may be denied for a variety of reasons. Rejections of UAE visas are most frequently:', points: [
        'Visa Application Mistakes',
        'Photograph that is hazy',
        'A criminal background (past or current)',
        'Prior Employment Visa',
        'Unused previous UAE visa',
        'Profession listed in the passport',
        'Woman Traveling Alone'
      ]
    }
  ]

  const point = <VscDebugBreakpointLogUnverified />;


  const handleFormNext = () => {
    if (formStep === 0) {
      if (checkContact(phone.slice(0, 3), phone.slice(3))) {
        setFormStep(1);
      } else {
        alert('Enter Valid Phone Number (+ phone code)');
      }
    } else if (formStep === 1) {
      if (passportImageScanned && passportImageWhite && bankStatement && residence) {
        setFormStep(2);
      } else {
        alert('Upload All Files');
      }
    } else if (formStep === 2) {
      setFormStep(3)
    }
    else if (formStep === 3) {
      alert('submitting');
    }
  }

  const handleFormPrev = () => {
    setFormStep(formStep - 1);
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const handlePassportImageScannedDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPassportImageScanned(event.dataTransfer.files[0])
  }

  const handlePassportImageWhiteDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setPassportImageWhite(event.dataTransfer.files[0])
  }

  const handleBankStatementDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setBankStatement(event.dataTransfer.files[0])
  }

  const handleResidenceDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setResidence(event.dataTransfer.files[0])
  }

  const handleBankPaymentSlipDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setBankPaymentSlip(event.dataTransfer.files[0])
  }

  const handleMomoShotDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMomoShot(event.dataTransfer.files[0])
  }

  return (
    <main>
      <TopNav />

      <section className={styles.formBox} id="horMargin">
        <section className={styles.left}>
          <header>
            <strong>Dubai Visa</strong>
          </header>

          <hr />

          <form onSubmit={(e) => { e.preventDefault(); handleFormNext(); }}>
            {formStep === 0 ?
              <>
                <p>
                  <span>First Name *</span>
                  <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </p>

                <p>
                  <span>Second Name *</span>
                  <input type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} required />
                </p>

                <p>
                  <span>Passport Number *</span>
                  <input type="text" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} required />
                </p>

                <p>
                  <span>Gender *</span>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option hidden>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </p>

                <p>
                  <span>Nationality *</span>
                  <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
                </p>

                <p>
                  <span>E-mail *</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </p>

                <p>
                  <span>Phone Number(eg : &apos;233550000000&apos;)*</span>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </p>

                <p>
                  <span>Communication Channel *</span>
                  <select value={channel} onChange={(e) => setChannel(e.target.value)} required>
                    <option hidden>Communication Channel</option>
                    {channelList.map((el, i) => (
                      <option value={el} key={i}>{el}</option>
                    ))}
                  </select>
                </p>
                <button className={styles.nextTab}>Continue</button>
              </>
              : formStep === 1 ?
                <>
                  <p className={styles.fileBox}>
                    <span>Passport Picture (Scanned Copy) *</span>
                    <div className={styles.dropBox}
                      onDragOver={handleDragOver}
                      onDrop={handlePassportImageScannedDrop}
                    >
                      <label className={styles.fileLabel}>
                        <legend> <span>Select Image Or Drop File Here</span> <IoCloudUploadOutline /> </legend>
                        <input type="file" onChange={(e) => setPassportImageScanned(e.target.files![0])} />
                      </label>
                    </div>

                    {passportImageScanned &&
                      <div className={styles.nameBox}>
                        <MdOutlineTaskAlt /> <span>{passportImageScanned.name}</span>
                      </div>
                    }
                  </p>

                  <p className={styles.fileBox}>
                    <span>Passport Picture (White Background) *</span>
                    <div className={styles.dropBox}
                      onDragOver={handleDragOver}
                      onDrop={handlePassportImageWhiteDrop}
                    >
                      <label className={styles.fileLabel}>
                        <legend> <span>Select Image Or Drop File Here</span> <IoCloudUploadOutline /> </legend>
                        <input type="file" onChange={(e) => setPassportImageWhite(e.target.files![0])} />
                      </label>
                    </div>

                    {passportImageWhite &&
                      <div className={styles.nameBox}>
                        <MdOutlineTaskAlt /> <span>{passportImageWhite.name}</span>
                      </div>
                    }
                  </p>

                  <p className={styles.fileBox}>
                    <span>Bank Statement *</span>
                    <div className={styles.dropBox}
                      onDragOver={handleDragOver}
                      onDrop={handleBankStatementDrop}
                    >
                      <label className={styles.fileLabel}>
                        <legend> <span>Select Image Or Drop File Here</span> <IoCloudUploadOutline /> </legend>
                        <input type="file" onChange={(e) => setBankStatement(e.target.files![0])} />
                      </label>
                    </div>

                    {bankStatement &&
                      <div className={styles.nameBox}>
                        <MdOutlineTaskAlt /> <span>{bankStatement.name}</span>
                      </div>
                    }
                  </p>

                  <p className={styles.fileBox}>
                    <span>Proof Of Residence *</span>
                    <div className={styles.dropBox}
                      onDragOver={handleDragOver}
                      onDrop={handleResidenceDrop}
                    >
                      <label className={styles.fileLabel}>
                        <legend> <span>Select Image Or Drop File Here</span> <IoCloudUploadOutline /> </legend>
                        <input type="file" onChange={(e) => setResidence(e.target.files![0])} />
                      </label>
                    </div>

                    {residence &&
                      <div className={styles.nameBox}>
                        <MdOutlineTaskAlt /> <span>{residence.name}</span>
                      </div>
                    }
                  </p>

                  <nav className={styles.controlBox}>
                    <legend className={styles.nextTab} onClick={handleFormPrev}>Previous</legend>
                    <button className={styles.nextTab}>Continue</button>
                  </nav>
                </>
                : formStep === 2 ?
                  <>
                    <p>
                      <span>Purpose Of Visit *</span>
                      <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} required />
                    </p>
                    <p>
                      <span>Processing *</span>
                      <select value={processing} onChange={(e) => setProcessing(e.target.value)} required>
                        <option hidden>Processing</option>
                        {processingList.map((el, i) => (
                          <option value={el} key={i}>{el}</option>
                        ))}
                      </select>
                    </p>
                    <p>
                      <span>Visa Type *</span>
                      <select value={visaType} onChange={(e) => setVisaType(e.target.value)} required>
                        <option hidden>visa type</option>
                        {visaTypeList.map((el, i) => (
                          <option value={el} key={i}>{el}</option>
                        ))}
                      </select>
                    </p>

                    <p>
                      <span>Date Of Travel *</span>
                      <input type="date" value={dateOfTravel} onChange={(e) => setDateOfTravel(e.target.value)} required />
                    </p>

                    <p>
                      <span>Return Date *</span>
                      <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
                    </p>

                    <nav className={styles.controlBox}>
                      <legend className={styles.nextTab} onClick={handleFormPrev}>Previous</legend>
                      <button className={styles.nextTab}>Continue</button>
                    </nav>
                  </>
                  :
                  <>
                    <p className={styles.fileBox}>
                      <span>Bank Payment Slip Copy</span>
                      <div className={styles.dropBox}
                        onDragOver={handleDragOver}
                        onDrop={handleBankPaymentSlipDrop}
                      >
                        <label className={styles.fileLabel}>
                          <legend> <span>Select Image Or Drop File Here</span> <IoCloudUploadOutline /> </legend>
                          <input type="file" onChange={(e) => setBankPaymentSlip(e.target.files![0])} />
                        </label>
                      </div>

                      {bankPaymentSlip &&
                        <div className={styles.nameBox}>
                          <MdOutlineTaskAlt /> <span>{bankPaymentSlip.name}</span>
                        </div>
                      }
                    </p>

                    <p className={styles.fileBox}>
                      <span>MTN Mobile Money (screen shot)</span>
                      <div className={styles.dropBox}
                        onDragOver={handleDragOver}
                        onDrop={handleMomoShotDrop}
                      >
                        <label className={styles.fileLabel}>
                          <legend> <span>Select Image Or Drop File Here</span> <IoCloudUploadOutline /> </legend>
                          <input type="file" onChange={(e) => setMomoShot(e.target.files![0])} />
                        </label>
                      </div>

                      {momoShot &&
                        <div className={styles.nameBox}>
                          <MdOutlineTaskAlt /> <span>{momoShot.name}</span>
                        </div>
                      }
                    </p>

                    <nav className={styles.controlBox}>
                      <legend className={styles.nextTab} onClick={handleFormPrev}>Previous</legend>
                      <button className={styles.nextTab}>Continue</button>
                    </nav>
                  </>
            }

          </form>
        </section>
        <section className={styles.right} style={{ height: 'auto' }}>
          <section className={styles.promptBox}>
            <legend>
              {point}
              <span> Dear partner our company will not be responsible for any delay in immigration system or eChannel down</span>
            </legend>

            <legend>
              {point}
              <span>DO NOT ISSUE THE TICKET UNTIL THE VISA APPROVAL(COMPANY WILL NOT BE RESPONSIBLE FOR ANY LOSS).</span>
            </legend>

            <legend>
              {point}
              <small>We are announcing that you can upload your payment slips as well as upload the payment details online by yourself. Once you have done it , in the next go, just drop us an email (visa@prymetravels.com) for approval.</small>
            </legend>

            <legend>
              {point}
              <span>NAME MANDATORY FOR ALL SHARJAH APPLICATION</span>
            </legend>

            <p>
              <legend>
                {point}
                <small>please apply your visa before 6 pm</small>
              </legend>

              <legend>
                {point}
                <small>don&apos;t delay your work after 6 pm</small>
              </legend>
            </p>
          </section>
          {/* <Image alt="" src={student} fill className="cover" /> */}
        </section>
      </section>



      <section className={styles.bannerBox}>

        <header>
          <strong>Unmatched Global Expertise And Connections</strong>
        </header>

        <section className={styles.skills} id="hor">
          <div className={styles.skill}>
            <FaPeopleGroup />
            <strong className='big'>350+</strong>
            <span>Happy Clients</span>
          </div>

          <div className={styles.skill}>
            <MdTimer />
            <strong className='big'>99%</strong>
            <span>On Time Delivery</span>
          </div>

          <div className={styles.skill}>
            <IoBriefcaseOutline />
            <strong className='big'>5+</strong>
            <span>Years Of Experience</span>
          </div>

          <div className={styles.skill}>
            <MdTaskAlt />
            <strong className='big'>95%</strong>
            <span>Success Rate</span>
          </div>
        </section>
      </section>


      {/* <section> */}
      <section className={styles.faqBox} id='hor'>
        <h3>UAE..VISA..F.A.Q</h3>

        <section className={styles.faqs}>
          {faqList.map((faq, i) => (
            <div className={styles.faq} key={i} onClick={() => setActiveFAQ(i)}>
              <strong><span>{faq.tag}</span> <IoIosArrowDropdown /> </strong>

              <article style={i === activeFAQ ? { display: 'grid' } : { display: 'none' }}>
                <span>{faq.text}</span>
                {faq.points &&
                  <ul>
                    {faq.points.map((point, ii) => (
                      <li key={ii}> <MdOutlineControlPoint /> {point}</li>
                    ))}
                  </ul>
                }
              </article>
            </div>
          ))}
        </section>
      </section>
      <FooterBox />
      {/* </section> */}
    </main >
  );
}

export default StudentVisa;