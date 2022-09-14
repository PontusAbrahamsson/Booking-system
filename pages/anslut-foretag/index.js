import {
  AnslutFöretagPage,
  Container,
  UserInfoContainer,
  ProfileInput,
  FlexBetweenWrapper,
  CardTitle,
  TextArea,
  TimeInput
} from "../../styles/anslutFöretagStyle";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, functions } from "../../firebase/db";
import { httpsCallable } from "firebase/functions";
import { businessUserLogin } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { Stepper, Step, StepLabel } from '@mui/material';
import loggaBlackText from '../../resources/images/Logo-black-text.png';
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
  const [klenikTel, setKlenikTel] = useState('');
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

  const [tjänstData, setTjänstData] = useState([]);
  const [tjänst, setTjänst] = useState('');
  const [utförandeTid, setUtförandeTid] = useState('');
  const [kostnad, setKostnad] = useState('');

  const steps = ['Konto information', 'Anslut klinik', 'Slutför']
  const [activeStep, setActiveStep] = useState(0);

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

  function addService() {
    setTjänstData([
      ...tjänstData,
      {
        'tjänstNamn': tjänst,
        'utförandeTid': utförandeTid,
        'kostnad': kostnad,
      }]);
    setTjänst('');
    setUtförandeTid('');
    setKostnad('');
  };

  function removeService(removeIndex) {
    setTjänstData(tjänstData.filter((_, index) => index !== removeIndex));
  };

  function backStep() {
    // if (activeStep >= 1)
    setActiveStep(activeStep - 1)
  }

  function nextStep() {
    // if (activeStep <= 1)
    setActiveStep(activeStep + 1)
  }
  console.log(activeStep)

  return (
    <AnslutFöretagPage>


      <Stepper style={{ 'width': '50%', 'margin': '50px auto 50px auto' }} activeStep={activeStep} alternativeLabel>
        <Step >
          <StepLabel>Konto information</StepLabel>
        </Step>
        <Step >
          <StepLabel>Anslut kleniken</StepLabel>
        </Step>
        <Step >
          <StepLabel>Öppetider</StepLabel>
        </Step>
        <Step >
          <StepLabel>Tjänster</StepLabel>
        </Step>
        <Step >
          <StepLabel>Slutför</StepLabel>
        </Step>
      </Stepper>


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
                <label id='address' className='profileInputLabel'>Telefonnummer</label>
                <div className='inputBorder'>
                  <input
                    className='input'
                    type="number"
                    placeholder='Klenikens telefonnummer'
                    id='address'
                    onChange={(e) => setKlenikTel(e.target.value)}
                    value={klenikTel}
                  />
                </div>
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
              <TimeInput>
                <span className="day">Måndag</span>
                <span className="closed">Stängt</span>
              </TimeInput>
              <TimeInput>
                <span className="day">Måndag</span>
                <span className="closed">Stängt</span>
              </TimeInput>
              <TimeInput>
                <span className="day">Onsdddad</span>
                <span className="closed">Stängt</span>
              </TimeInput>
            </>
          }
          <FlexBetweenWrapper justifyContent={activeStep > 0 ? 'space-between' : 'flex-end'}>
            {activeStep > 0 &&
              <button className="backBtn" onClick={backStep}>Tillbaka</button>
            }
            <button className="nextBtn" onClick={nextStep}>Nästa</button>
          </FlexBetweenWrapper>
        </UserInfoContainer>
      </Container>


      {activeStep === 2 &&
        <>
          <b> Öppetider:</b>
          <br />
          mån:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setMån(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setMånSlut(e.target.value)}
          />
          <br />
          tis:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setTis(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setTisSlut(e.target.value)}
          />
          <br />
          ons:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setOns(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setOnsSlut(e.target.value)}
          />
          <br />
          tor:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setTor(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setTorSlut(e.target.value)}
          />
          <br />
          fre:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setFre(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setFreSlut(e.target.value)}
          />
          <br />
          lör:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setLör(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setLörSlut(e.target.value)}
          />
          <br />
          sön:
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setSön(e.target.value)}
          />
          <input
            type="time"
            min="00:00"
            max="24:00"
            onChange={(e) => setSönSlut(e.target.value)}
          />
        </>
      }
      {activeStep === 3 &&
        <>
          <b>Tjänster:</b>
          <br />
          - Namn tjänst
          <input
            type="text"
            placeholder="namn tjänst"
            onChange={(e) => setTjänst(e.target.value)}
            value={tjänst}
          />
          <br />
          - Utförande tid:
          <input
            type="number"
            placeholder="min"
            onChange={(e) => setUtförandeTid(e.target.value)}
            value={utförandeTid}
          />
          <br />
          - Kostnad:
          <input
            type="number"
            placeholder="kr"
            onChange={(e) => setKostnad(e.target.value)}
            value={kostnad}
          />
          <br />
          <button onClick={addService}>Lägg till</button>
          <br />
        </>
      }

      {tjänstData.map((item, index) => {

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
      })}
      <br />
      <br />
      <button onClick={handleSignupAsBusiness}>Registrera</button>
    </AnslutFöretagPage>
  )
}