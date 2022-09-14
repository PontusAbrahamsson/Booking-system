import { auth } from '../firebase/db';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { businessUserLogin, defaultUserLogin } from '../redux/features/userSlice';

export default function WithBusinessAuth(props) {
  const dispatch = useDispatch();
  const { businessAccount } = useSelector((state) => state.users);
  const [displayBusinessAccount, setDisaplyBusinessAccount] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdTokenResult(true)
          .then((idTokenResult) => {
            if (businessAccount?.uid === user.uid) {
              setDisaplyBusinessAccount(true)
              dispatch(businessUserLogin({ 'uid': idTokenResult.claims.user_id }))
              console.log('Business user signed in!')
              console.log(idTokenResult)
            }
          })
      }
    })

  }, [])

  if (displayBusinessAccount) { return props.children }
};