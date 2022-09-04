import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase/db";
import { logout } from "../../redux/features/userSlice";

export default function Konto() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  console.log(user)

  useEffect(() => {
    if (user === null) {
      router.push('/signup');
    }
  }, []);

  //Logout
  function handleLogout() {
    dispatch(logout())
    auth.signOut()
    router.push('/signin');
  }

  return (
    <>
      <h1>
        uid:  {user?.uid}
      </h1>
      <button onClick={handleLogout}>logout</button>
    </>
  )
}