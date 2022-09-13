import { auth } from '../firebase/db';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { businessUserLogin, defaultUserLogin } from '../redux/features/userSlice';

export default function WithAuth(props) {
  const [defaultUserAccount, setDefaultUserAccout] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult()
          .then((idTokenResult) => {
            console.log(idTokenResult)
            if (idTokenResult.claims.businessAccount === false) {
              setDefaultUserAccout(true)
              dispatch(defaultUserLogin({ 'uid': idTokenResult.claims.user_id }))
              console.log('Default user signed in!')
            };
          }).catch((error) => {
            console.log(error);
          });
      }
    })
  }, [])

  if (defaultUserAccount) { return props.children }
};