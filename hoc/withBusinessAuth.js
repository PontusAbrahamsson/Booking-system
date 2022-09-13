import { auth } from '../firebase/db';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { businessUserLogin, defaultUserLogin } from '../redux/features/userSlice';

export default function WithBusinessAuth(props) {
  const dispatch = useDispatch();
  const [businessAccount, setBusinessAccount] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult(true)
          .then((idTokenResult) => {
            if (idTokenResult.claims.businessAccount === true) {
              setBusinessAccount(true)
              dispatch(businessUserLogin({ 'uid': idTokenResult.claims.user_id }))
              console.log('Business user signed in!')
            };
            console.log(idTokenResult)
          })
      }
    })
  }, [])

  if (businessAccount) { return props.children }
};