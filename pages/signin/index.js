import { AuthPage, AuthFormWrapper, AuthForm, AuthFormTitle, AlternativeSignIn } from "../../styles/LoginSignupSyle";
import Button from "../../components/Button/Button";
import AuthInput from "../../components/AuthInput/AuthInput";
import { useDispatch } from "react-redux";
import { login, signupAsBusiness } from "../../redux/features/userSlice";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/db";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter();
  const currentUser = auth.currentUser;
  const { defaultUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {

      })
      .catch((error) => {
        console.log(error)
      })
    router.push('/');
  };

  if (defaultUser) { return null }

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
          <Button onClick={handleLogin} height="65px" text="logga in" marginTop="35px" />
        </AuthForm>
      </AuthFormWrapper>
    </AuthPage>
  )
}