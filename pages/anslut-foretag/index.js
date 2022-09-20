import {
  AnslutFöretagPage,
  Container,
  UserInfoContainer,
  ProfileInput,
  FlexBetweenWrapper,
  CardTitle,
  TextArea,
  TimeInput,
  AddTimeModal,
  StepperT,
  ServiceTab,
  SelectServiceModal
} from "../../styles/anslutFöretagStyle";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, functions } from "../../firebase/db";
import { httpsCallable } from "firebase/functions";
import { businessUserLogin } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import fitnessImg from '../../resources/images/serviceIcons/fitness.png';
import Image from "next/image";

export default function SignupAsBusiness() {
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const router = useRouter();

  const [förnamn, setFörnamn] = useState('');
  const [efternamn, setEfternamn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [telefonnummer, setTelefonnummer] = useState('');

  const [företag, setFöretag] = useState('');
  const [hemsida, setHemsida] = useState('');
  const [address, setAddress] = useState('');
  const [value, setValue] = useState();
  const [omOss, setOmOss] = useState('');

  const [mån, setMån] = useState('');
  const [tis, setTis] = useState('');
  const [ons, setOns] = useState('');
  const [tor, setTor] = useState('');
  const [fre, setFre] = useState('');
  const [lör, setLör] = useState('');
  const [sön, setSön] = useState('');
  const [månSlut, setMånSlut] = useState('');
  const [tisSlut, setTisSlut] = useState('');
  const [onsSlut, setOnsSlut] = useState('');
  const [torSlut, setTorSlut] = useState('');
  const [freSlut, setFreSlut] = useState('');
  const [lörSlut, setLörSlut] = useState('');
  const [sönSlut, setSönSlut] = useState('');

  const huvudTjänst = [
    {
      'img': fitnessImg,
      'title': 'frisör'
    },
    {
      'img': fitnessImg,
      'title': 'skönhet'
    },
    {
      'img': fitnessImg,
      'title': 'naglar'
    },
    {
      'img': fitnessImg,
      'title': 'hudvård'
    },
    {
      'img': fitnessImg,
      'title': 'fillers'
    },
    {
      'img': fitnessImg,
      'title': 'ögonbryn & fransar'
    },
    {
      'img': fitnessImg,
      'title': 'träning'
    },
    {
      'img': fitnessImg,
      'title': 'friskvård'
    },
    {
      'img': fitnessImg,
      'title': 'massage'
    },
    {
      'img': fitnessImg,
      'title': 'annat'
    },
  ];
  const [tjänstData, setTjänstData] = useState([]);
  const [tjänst, setTjänst] = useState([]);
  const [varaktighet, setVaraktighet] = useState('');
  const [kostnad, setKostnad] = useState('');

  const [addServiceInput, setAddServiceInput] = useState();
  const [changeTitleInput, setChangeTitleInput] = useState();
  const [changeServiceTitleInput, setChangeServiceTitleInput] = useState();
  const [displayChangeTitle, setDisplayChangeTitle] = useState();
  const [displayChangeServiceTitle, setDisplayServiceTitle] = useState();
  const [displayAddServiceInput, setDisplayAddServiceInput] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [selectedHuvudTjänst, setSelectedHuvudTjänst] = useState();

  const [selectServiceModal, setSelectServiceModal] = useState(true);
  const [addTimeModal, setAddTimeModal] = useState();

  const [activeStep, setActiveStep] = useState(0);
  const stepperData = ['Konto information', 'Anslut klenik', 'Öppetider', 'Tjänster', 'Slutför'];

  const [currentStartTime, setCurrentStartTime] = useState([]);
  const [currentEndTime, setCurrentEndTime] = useState([]);
  const öppetider = { 'mån': ['Måndag', mån, månSlut], 'tis': ['Tisdag', tis, tisSlut], 'ons': ['Onsdag', ons, onsSlut], 'tor': ['Torsdag', tor, torSlut], 'fre': ['Fredag', fre, freSlut], 'lör': ['Lördag', lör, lörSlut], 'sön': ['Söndag', sön, sönSlut] }

  async function handleSignupAsBusiness() {
    if (password === repeatPassword && password.length >= 6) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(businessUserLogin({ 'uid': user.uid }))
          setDoc(doc(db, "users", user.uid), {
            'förnamn': förnamn,
            'efternamn': efternamn,
            'email': email,
            'telefonnummer': telefonnummer,
            'address': address,
            'businessUser': true
          });
          addDoc(collection(db, "service"), {
            'uid': user.uid,
            'email': email,
            'företag': företag,
            'telefonnummer': telefonnummer,
            'hemsida': hemsida,
            'omOss': omOss,
            'öppetider': { 'mån': [mån, månSlut], 'tis': [tis, tisSlut], 'ons': [ons, onsSlut], 'tor': [tor, torSlut], 'fre': [fre, freSlut], 'lör': [lör, lörSlut], 'sön': [sön, sönSlut] },
            'tjänst': tjänstData
          })
          const addBusinessAccountFunction = httpsCallable(functions, 'addBusinessAccount');
          addBusinessAccountFunction({ email: email })
            .then((result) => {
              console.log(result)
            });
          router.push('/')
        })
    };
  };


  console.log(tjänstData)

  function addService(index) {
    const object = { 'namn': addServiceInput, 'kostnad': '', 'utförandeTid': '' }
    tjänstData[index].tjänster.push(object)
  };
  console.log(tjänstData)
  console.log(tjänstData)

  function addSelectedService() {
    const object = {}
    setTjänstData([...tjänstData, { 'huvudTjänst': huvudTjänst[selectedHuvudTjänst].title, 'tjänster': [] }]);
    setTjänst('')
  };

  function changeMainServiceTitle(...params) {
    const index = params[0]
    const data = params[1]
    tjänstData[index].huvudTjänst = data
    setDisplayChangeTitle()
  }

  function changeServiceTitle(...params) {
    const index = params[0]
    const tjänstIndex = params[1]
    const data = params[2]
    tjänstData[index].tjänster[tjänstIndex].namn = data
    setDisplayServiceTitle()
  }

  console.log(tjänstData)

  function getHeight(index) {
    let element = document.getElementsByClassName('flexGrow')[index];
    element.classList.toggle('toogleDropDown');

    if (element.classList.contains("toogleDropDown")) {
      const boxHeight = document.getElementsByClassName('serviceInputWrapper')[index].offsetHeight + 25
      document.getElementsByClassName('dropDownData')[index].style.height = boxHeight + 'px'
      document.getElementsByClassName('arrowIcon')[index].style.transform = 'rotate(-180deg)'
    } else {
      document.getElementsByClassName('dropDownData')[index].style.height = '0'
      document.getElementsByClassName('arrowIcon')[index].style.transform = 'rotate(0deg)'
    }
  };

  function addTimePrice(...params) {
    const huvudverksamhetIndex = params[0]
    const tjänstIndex = params[1]
    const data = params[2]
    const type = params[3]

    if (type === 'kostnad') {
      tjänstData[huvudverksamhetIndex].tjänster[tjänstIndex].kostnad = data
    }
    if (type === 'tid') {
      tjänstData[huvudverksamhetIndex].tjänster[tjänstIndex].utförandeTid = data
    }
  };

  function removeService(...params) {
    console.log(params)
    const huvudIndex = params[0]
    const tjänstIndex = params[1]
    const filter = tjänstData[huvudIndex].tjänster.filter((_, index) => index !== tjänstIndex)

    console.log(filter)
    setTjänstData(tjänstData)

  };

  function backStep() {
    // if (activeStep >= 1)
    setActiveStep(activeStep - 1)
  };

  function nextStep() {
    // if (activeStep <= 1)
    setActiveStep(activeStep + 1)
  };

  function addTime(...params) {
    console.log(params.length)
    switch ((params.length === 0 ? currentStartTime[0] : params[0])) {
      case 0:
        if (params.length === 0) {
          setMån(currentStartTime[1])
        } else {
          setMån(params[1])
        }
        break
      case 1:
        if (params.length === 0) {
          setTis(currentStartTime[1])
        } else {
          setTis(params[1])
        }
        break
      case 2:
        if (params.length === 0) {
          setOns(currentStartTime[1])
        } else {
          setOns(params[1])
        }
        break
      case 3:
        if (params.length === 0) {
          setTor(currentStartTime[1])
        } else {
          setTor(params[1])
        }
        break
      case 4:
        if (params.length === 0) {
          setFre(currentStartTime[1])
        } else {
          setFre(params[1])
        }
        break
      case 5:
        if (params.length === 0) {
          setLör(currentStartTime[1])
        } else {
          setLör(params[1])
        }
        break
      case 6:
        if (params.length === 0) {
          setSön(currentStartTime[1])
        } else {
          setSön(params[1])
        }
        break
    };
    switch ((params.length === 0 ? currentEndTime[0] : params[0])) {
      case 0:
        if (params.length === 0) {
          setMånSlut(currentEndTime[1])
        } else {
          setMånSlut(params[1])
        }
        break
      case 1:
        if (params.length === 0) {
          setTisSlut(currentEndTime[1])
        } else {
          setTisSlut(params[1])
        }
        break
      case 2:
        if (params.length === 0) {
          setOnsSlut(currentEndTime[1])
        } else {
          setOnsSlut(params[1])
        }
        break
      case 3:
        if (params.length === 0) {
          setTorSlut(currentEndTime[1])
        } else {
          setTorSlut(params[1])
        }
        break
      case 4:
        if (params.length === 0) {
          setFreSlut(currentEndTime[1])
        } else {
          setFreSlut(params[1])
        }
        break
      case 5:
        if (params.length === 0) {
          setLörSlut(currentEndTime[1])
        } else {
          setLörSlut(params[1])
        }
        break
      case 6:
        if (params.length === 0) {
          setSönSlut(currentEndTime[1])
        } else {
          setSönSlut(params[1])
        }
        break
    };
  };

  return (
    <AnslutFöretagPage>

      <StepperT>
        {stepperData.map((data, index) => {

          return (
            <>
              <div className="stepperBox" key={index}>

                {activeStep === index &&
                  <circle className={`circle ${activeStep === index ? 'active' : ''}`}>{index + 1}</circle>
                }
                {activeStep > index &&
                  <circle className={`circle ${activeStep > index ? 'pastActive' : ''}`}>
                    <svg className="checkIcon" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 17.3-4.975-4.95.725-.725 4.25 4.25 9.15-9.15.725.725Z" /></svg>
                  </circle>
                }
                {activeStep < index &&
                  <circle className={`circle ${activeStep > index ? 'pastActive' : ''}`}>{index + 1}</circle>
                }
                <span className="stepperText">{data}</span>
                {index !== 0 &&
                  <span className="line"></span>
                }

              </div>
            </>
          )
        })}
      </StepperT>

      <Container>
        <UserInfoContainer>
          {activeStep === 0 &&
            <>
              <CardTitle>Konto information</CardTitle>
              <ProfileInput>
                <label id='firstName' className='profileInputLabel'>Förnamn</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="text"
                    placeholder='Förnamn'
                    id='firstName'
                    onChange={(e) => setFörnamn(e.target.value)}
                    value={förnamn}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='lastName' className='profileInputLabel'>Efternamn</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="text"
                    placeholder='Efternamn'
                    id='lastName'
                    onChange={(e) => setEfternamn(e.target.value)}
                    value={efternamn}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='email' className='profileInputLabel'>E-post</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="email"
                    placeholder='E-post'
                    id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='number' className='profileInputLabel'>Telefonnummer</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="number"
                    placeholder='Telefonnummer'
                    id='number'
                    onChange={(e) => setTelefonnummer(e.target.value)}
                    value={telefonnummer}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='password' className='profileInputLabel'>Lösenord</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="password"
                    placeholder='Lösenord'
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='repeatPassword' className='profileInputLabel'>Repetera lösenord</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="password"
                    placeholder='Repetera lösenord'
                    id='repeatPassword'
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                  />
                </div>
              </ProfileInput>

            </>
          }
          {activeStep === 1 &&
            <>
              <CardTitle margin={activeStep === 1 ? '10px' : '30px'}>Anslut klinik</CardTitle>
              <h2 className="titleNote">Den här informationen kommer vara synlig för användare</h2>
              <ProfileInput>
                <label id='business' className='profileInputLabel'>Företag</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="text"
                    placeholder='Företagets namn'
                    id='business'
                    onChange={(e) => setFöretag(e.target.value)}
                    value={företag}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='website' className='profileInputLabel'>Hemsida</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="text"
                    placeholder='https://exempel.se'
                    id='website'
                    onChange={(e) => setHemsida(e.target.value)}
                    value={hemsida}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='address' className='profileInputLabel'>Address</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="text"
                    placeholder='Klinikens address'
                    id='address'
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
              </ProfileInput>
              <ProfileInput>
                <label id='klenikTel' className='profileInputLabel'>Telefonnummer</label>
                <PhoneInput
                  value={value === undefined ? '+46' : value}
                  defaultCountry="SE"
                  placeholder="Klenikens telefonnummer"
                  onChange={setValue} />
              </ProfileInput>
              <TextArea>
                <label id='aboutUs' className='profileInputLabel'>Om oss</label>
                <div className='textAreaBorders'>
                  <textarea
                    className="omOssTextarea"
                    rows="6"
                    cols="40"
                    id="aboutUs"
                    placeholder="Berätta om eran klinik"
                    onChange={(e) => setOmOss(e.target.value)}
                    value={omOss}
                  />
                </div>
              </TextArea>

            </>
          }
          {activeStep === 2 &&
            <>
              <CardTitle>Öppetider</CardTitle>
              {Object.values(öppetider).map((dag, index) => {
                // console.log(dag)

                return (
                  <div key={index}>
                    <TimeInput >
                      <span className="day">{dag[0]}</span>
                      {dag[1].length != 0 && dag[2].length != 0 ?
                        <button className="removeTimeBtn" onClick={() => { addTime(index, '', 'start'); addTime(index, '', 'end') }}>
                          <span>{dag[1]} - {dag[2]}</span>
                        </button>
                        :
                        <button className="closedBtn" onClick={() => { setAddTimeModal(index) }}>
                          <span>Stängt</span>
                        </button>
                      }
                    </TimeInput>

                    {addTimeModal === index &&
                      <AddTimeModal>
                        <div className="addTimeContainer">
                          <div className='wrapper'>
                            <CardTitle>Lägg till öppetid</CardTitle>
                            <svg onClick={() => setAddTimeModal()} className='exitIcon' xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="m10.583 30.417-1-1L19 20l-9.417-9.417 1-1L20 19l9.417-9.417 1 1L21 20l9.417 9.417-1 1L20 21Z" /></svg>
                          </div>

                          <input
                            className="timeInput"
                            type="time"
                            min="00:00"
                            max="24:00"
                            onChange={(e) => setCurrentStartTime([index, e.target.value, 'start'])}
                          />
                          -
                          < input
                            className="timeInput"
                            type="time"
                            min="00:00"
                            max="24:00"
                            onChange={(e) => setCurrentEndTime([index, e.target.value, 'end'])}
                          />
                          <div className="btnWrapper">
                            <button className="cancelBtn" onClick={() => setAddTimeModal()}>Avbryt</button>
                            <button className="saveTimeBtn" onClick={() => { setAddTimeModal(); addTime() }}>Spara</button>
                          </div>
                        </div>
                      </AddTimeModal>
                    }
                  </div>
                )
              })}

            </>
          }
          {activeStep === 3 && selectServiceModal === true &&
            <SelectServiceModal>
              <h1 className="headServiceTitlte">Företagets huvudsakliga verksamhet</h1>
              <div className="modalContainer">
                <div className="containerHeader">
                  <CardTitle>Välj din huvudsakliga verksamhet</CardTitle>
                </div>
                <div className="flexBox">
                  {huvudTjänst.map((data, index) => {

                    return (
                      <div className={`itemBox ${index === selectedHuvudTjänst ? 'itemBoxSelected' : ''}`} key={index} onClick={() => setSelectedHuvudTjänst(index)}>
                        <div className="imgContainer">
                          <Image src={data.img} layout="fill" objectFit="contain" objectPosition="center" />
                        </div>
                        <span className="serviceTitle">{data.title}</span>
                      </div>
                    )
                  })}
                </div>
                <FlexBetweenWrapper justifyContent={activeStep > 0 ? 'space-between' : 'flex-end'}>
                  {activeStep > 0 &&
                    <button className="backBtn" onClick={backStep}>Tillbaka</button>
                  }
                  {activeStep != 4 &&
                    <button className="nextBtn" onClick={() => { setSelectServiceModal(false); addSelectedService() }}>Spara</button>
                    // <button className="nextBtn" onClick={() => { addSelectedService() }}>Spara</button>
                  }
                </FlexBetweenWrapper>
              </div>
            </SelectServiceModal>
          }
          {activeStep === 3 &&
            <>
              <CardTitle>Tjänster</CardTitle>
              {tjänstData.map((tjänst, index) => {

                return (
                  <ServiceTab key={index} >
                    <div className="dropDownWrapper">

                      <div className="dropDownHead" >
                        <div className="wrapper">
                          {displayChangeTitle === index &&
                            <>
                              <input
                                className="changeTitleInput"
                                type="text"
                                placeholder="Ändra rubrik"
                                onKeyUp={e => e.key == "Enter" ? changeMainServiceTitle(index, e.target.value) : null}
                                onChange={e => setChangeTitleInput(e.target.value)}
                                value={changeTitleInput}
                              />
                              <svg onClick={() => changeMainServiceTitle(index, changeTitleInput)} className="editIcon" style={{ 'fill': '#8661ff' }} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m9.55 17.65-5.325-5.325 1.05-1.075 4.275 4.275 9.175-9.175 1.05 1.075Z" /></svg>
                            </>
                          }
                          {displayChangeTitle !== index &&
                            <>
                              <span>{tjänst.huvudTjänst}</span>
                              <svg onClick={() => { setChangeTitleInput(tjänst.huvudTjänst); setDisplayChangeTitle(index); setSelectedRow() }} className="editIcon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.375 15.75h1.104L13 8.229l-1.083-1.104-7.542 7.542Zm11.437-8.438-3-3.02.771-.771q.479-.459 1.136-.459.656 0 1.114.459l.938.937q.375.396.375.969t-.396.948Zm-.916.917-8.854 8.854h-3v-3l8.854-8.854Zm-2.438-.541-.541-.563L13 8.229Z" /></svg>
                            </>
                          }
                        </div>
                        <div className="flexGrow" onClick={() => { selectedRow === index ? setSelectedRow() : getHeight(index) }}>
                          <svg className='arrowIcon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 14.7 6.7 9.4l.7-.725 4.6 4.6 4.6-4.6.7.725Z" /></svg>
                        </div>
                      </div>

                      <div className='dropDownData'>
                        <div className="serviceInputWrapper">
                          {displayAddServiceInput === index &&
                            <ProfileInput>
                              <div className='inputBorder'>
                                <input
                                  className='input'
                                  type="text"
                                  placeholder='Namn på tjänsten'
                                  onChange={(e) => setAddServiceInput(e.target.value)}
                                  value={addServiceInput}
                                />
                                <svg onClick={() => { addService(index); setDisplayAddServiceInput() }} className="addIconInput" xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11.5 16.5h1v-4h4v-1h-4v-4h-1v4h-4v1h4ZM12 21q-1.875 0-3.512-.712-1.638-.713-2.85-1.926-1.213-1.212-1.926-2.85Q3 13.875 3 12t.712-3.513q.713-1.637 1.926-2.85 1.212-1.212 2.85-1.925Q10.125 3 12 3t3.513.712q1.637.713 2.85 1.925 1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85-1.213 1.213-2.85 1.926Q13.875 21 12 21Zm0-1q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z" /></svg>
                              </div>
                            </ProfileInput>
                          }

                          {tjänst.tjänster.map((tjänst, tjänstIndex) => {

                            return (
                              <div className="serviceWrapper" key={tjänstIndex}>
                                <div className="titleIconWrapper">
                                  {displayChangeServiceTitle !== tjänstIndex &&
                                    <span className="serviceTitle">{tjänst.namn}</span>
                                  }
                                  <div className="iconWrapper">
                                    {displayChangeServiceTitle === tjänstIndex &&
                                      <div className="flexWrap">
                                        <input
                                          className="changeTitleInput"
                                          type="text"
                                          placeholder="Ändra rubrik"
                                          onKeyUp={e => e.key == "Enter" ? changeServiceTitle(index, tjänstIndex, e.target.value) : null}
                                          onChange={e => setChangeServiceTitleInput(e.target.value)}
                                          value={changeServiceTitleInput}
                                        />

                                        <svg onClick={() => setDisplayServiceTitle()} className="editIcon" style={{ 'fill': '#8661ff' }} xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m8.229 14.229-3.687-3.708L5.75 9.312l2.479 2.459 6.021-6L15.458 7Z" /></svg>
                                      </div>
                                    }
                                    {displayChangeServiceTitle !== tjänstIndex &&
                                      <svg onClick={() => setDisplayServiceTitle(tjänstIndex)} className="editIcon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M4.375 15.75h1.104L13 8.229l-1.083-1.104-7.542 7.542Zm11.437-8.438-3-3.02.771-.771q.479-.459 1.136-.459.656 0 1.114.459l.938.937q.375.396.375.969t-.396.948Zm-.916.917-8.854 8.854h-3v-3l8.854-8.854Zm-2.438-.541-.541-.563L13 8.229Z" /></svg>
                                    }
                                    <svg onClick={() => removeService(index, tjänstIndex)} className="trashIcon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.75 16.583q-.542 0-.938-.395-.395-.396-.395-.938V5.5h-1V4.417H8v-.896h4v.896h3.583V5.5h-1v9.729q0 .583-.385.969-.386.385-.948.385ZM13.5 5.5h-7v9.75q0 .104.073.177t.177.073h6.5q.083 0 .167-.083.083-.084.083-.167ZM8.333 14h1.084V7H8.333Zm2.25 0h1.084V7h-1.084ZM6.5 5.5v10-.25Z" /></svg>
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="boxWrapper">
                                    <label id="time" className="serviceInputLabel">Varaktighet</label>
                                    <input
                                      className="serviceInput"
                                      type="number"
                                      id="time"
                                      placeholder="min"
                                      onChange={(e) => addTimePrice(index, tjänstIndex, e.target.value, 'tid')}
                                    />
                                  </div>
                                  <div className="boxWrapper">
                                    <label id="price" className="serviceInputLabel">Pris</label>
                                    <input
                                      className="serviceInput"
                                      type="number"
                                      id="price"
                                      placeholder="kr"
                                      onChange={(e) => addTimePrice(index, tjänstIndex, e.target.value, 'kostnad')}
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })}


                          <div className="wrapper">
                            <svg className="addServiceIcon" xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.458 13.792h1.084v-3.25h3.25V9.458h-3.25v-3.25H9.458v3.25h-3.25v1.084h3.25ZM10 17.583q-1.562 0-2.948-.593-1.385-.594-2.417-1.625-1.031-1.032-1.625-2.417-.593-1.386-.593-2.948 0-1.583.593-2.958.594-1.375 1.625-2.407Q5.667 3.604 7.052 3.01 8.438 2.417 10 2.417q1.583 0 2.958.593 1.375.594 2.407 1.625 1.031 1.032 1.625 2.417.593 1.386.593 2.948t-.593 2.948q-.594 1.385-1.625 2.417-1.032 1.031-2.417 1.625-1.386.593-2.948.593Zm0-1.083q2.708 0 4.604-1.896T16.5 10q0-2.708-1.896-4.604T10 3.5q-2.708 0-4.604 1.896T3.5 10q0 2.708 1.896 4.604T10 16.5Zm0-6.5Z" /></svg>
                            <span className="addService" onClick={() => { setDisplayAddServiceInput(index) }}>Lägg till tjänst</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ServiceTab>
                )
              })}
            </>
          }
          <FlexBetweenWrapper justifyContent={activeStep > 0 ? 'space-between' : 'flex-end'}>
            {activeStep > 0 &&
              <button className="backBtn" onClick={backStep}>Tillbaka</button>
            }
            {activeStep != 4 &&
              <button className="nextBtn" onClick={nextStep}>Nästa</button>
            }
          </FlexBetweenWrapper>
        </UserInfoContainer>
      </Container>

      {/* {tjänstData.map((item, index) => {

        return (
          <>
            <div key={index}>
              {item.tjänstNamn}
              <br />
              {item.kostnad}
              <br />
              {item.utförandeTid}
              <br />
              {item.frTid}
              <br />
              {item.frDatum}
              <br />
              <button onClick={() => removeService(index)}>Ta bort</button>
            </div>
          </>
        )
      })} */}
      <br />
      <br />
      <button onClick={handleSignupAsBusiness}>Registrera</button>
    </AnslutFöretagPage>
  )
}