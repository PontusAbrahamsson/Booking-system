import { AuthPage, AuthFormWrapper, AuthForm, AuthFormTitle } from "./indexStyle";
import Button from "../../components/Button/Button";
import AuthInput from "../../components/AuthInput/AuthInput";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/db";
import { useSelector } from "react-redux";

export default function Signin() {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(user)

  async function login() {

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          login({
            'uid': user.uid
          })
        )
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <AuthPage>
      <AuthFormWrapper>
        <AuthForm >
          <AuthFormTitle>Logga in</AuthFormTitle>
          <AuthInput
            type="email"
            placeholder="E-post"
            id="email"
            value={email}
            setState={setEmail}
          />
          <AuthInput
            type="password"
            placeholder="Lösenord"
            id="password"
            value={password}
            setState={setPassword}
          />
          <h1>{user?.uid}</h1>
          <Button onClick={login} height="65px" text="logga in" marginTop="35px" />
        </AuthForm>
      </AuthFormWrapper>
    </AuthPage>
  )
}