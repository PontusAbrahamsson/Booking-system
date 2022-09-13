import { useState } from "react"
import { auth, storage } from "../../../firebase/db";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function AddService() {
  const currentUser = auth.currentUser;

  const [hemsida, setHemsida] = useState('');
  const [omOss, setOmOss] = useState('');
  const [telefonnummer, setTelefonnummer] = useState('');
  const [bilder, setBilder] = useState([]);

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

  const [tjänstTitel, setTjänstTitel] = useState();

  const [addServiceModal, setAddServiceModal] = useState(false);

  console.log(bilder)

  function handlePhotoUrl(e) {
    console.log(e)
    const storageRef = ref(storage, `service/uid/${currentUser.uid}/photoUrl/${e.name}`);
    const uploadTask = uploadBytesResumable(storageRef, e);

    uploadTask.on('state_changed',
      (snapshot) => {

      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setBilder([...bilder, downloadURL]);
        });
      }
    )
  };

  function removeImage(removeIndex) {
    setBilder(bilder.filter((_, index) => index !== removeIndex));
  };

  return (
    <div>
      <b> Hemsida:</b>
      <br />
      <input
        type="text"
        placeholder="hemsida"
        onChange={(e) => setHemsida(e.target.value)}
        value={hemsida}
      />
      <br />
      <br />
      <b> Om oss:</b>
      <br />
      <textarea
        rows="4"
        cols="40"
        placeholder="Om oss"
        onChange={(e) => setOmOss(e.target.value)}
        value={omOss}
      />
      <br />
      <br />
      <b>Telefonnummer</b>
      <br />
      <input
        type="number"
        placeholder="Telefonnummer"
        onChange={(e) => setTelefonnummer(e.target.value)}
        value={telefonnummer}
      />
      <br />
      <br />
      <b>Bilder</b>
      <br />
      {bilder.map((bild, index) => {
        return (
          <img key={index} style={{ 'width': '150px', 'height': '150px', 'objectFit': 'cover', 'cursor': 'pointer' }} src={bild} onClick={() => removeImage(index)} />
        )
      })}
      <p></p>
      <input type="file" onChange={e => handlePhotoUrl(e.target.files[0])} />
      <br />
      <br />
      <b> Tjänst:</b>
      <br />
      <button onClick={() => setAddServiceModal(true)}>Lägg till tjänst</button>
      <br />
      {addServiceModal === true &&
        <div>
          <input
            type="text"
            placeholder="Namn på tjänst"
            onChange={(e) => setTjänstTitel(e.target.value)}
            value={tjänstTitel}
          />
          <button onClick={() => setAddServiceModal(false)}>Lägg till</button>
        </div>
      }
      <br />
      <br />
      <b> Adress:</b>
      <br />
      <br />
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
      <br />

    </div>
  )
};