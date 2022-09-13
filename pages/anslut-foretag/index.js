import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, functions } from "../../firebase/db";
import { httpsCallable } from "firebase/functions";
import { businessUserLogin } from "../../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";

export default function SignupAsBusiness() {
  const dispatch = useDispatch();
  const currentUser = auth.currentUser;
  const router = useRouter();

  const [förnamn, setFörnamn] = useState('');
  const [efternamn, setEfternamn] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [företag, setFöretag] = useState('');
  const [telefonnummer, setTelefonnummer] = useState('');
  const [address, setAddress] = useState('');

  const [hemsida, setHemsida] = useState('');
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

  async function handleSignupAsBusiness() {
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
      })
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

  return (
    <div>
      page1
      <br />
      <input
        type="text"
        placeholder="Förnamn"
        onChange={(e) => setFörnamn(e.target.value)}
        value={förnamn}
      />
      <br />
      <input
        type="text"
        placeholder="Efternamn"
        onChange={(e) => setEfternamn(e.target.value)}
        value={efternamn}
      />
      <br />
      <input
        type="email"
        placeholder="E-post"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <input
        type="password"
        placeholder="Lösenord"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input
        type="text"
        placeholder="Företag"
        onChange={(e) => setFöretag(e.target.value)}
        value={företag}
      />
      <br />
      <input
        type="number"
        placeholder="Telefonnummer"
        onChange={(e) => setTelefonnummer(e.target.value)}
        value={telefonnummer}
      />
      <br />
      <input
        type="text"
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <br />
      <br />
      page2 -
      <br />
      <input
        type="text"
        placeholder="hemsida"
        onChange={(e) => setHemsida(e.target.value)}
        value={hemsida}
      />
      <br />
      <textarea
        rows="4"
        cols="40"
        placeholder="Om oss"
        onChange={(e) => setOmOss(e.target.value)}
        value={omOss}
      />
      <br />
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
      <br />
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
    </div>
  )
}