import { StyledNavbar, AuthLink, AuthBtnCol } from "./NavbarStyle";
import Button from "../Button/Button";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <StyledNavbar>
      <h1>FÖRETAG</h1>
      <AuthBtnCol>
        {user === null ?
          <>
            <Link href="/signin">
              <AuthLink>
                Login
              </AuthLink>
            </Link>
            /
            <Link href="/signup">
              <AuthLink>
                Sign up
              </AuthLink>
            </Link>
          </>
          :
          <Link href="/konto">
            <AuthLink>
              Konto
            </AuthLink>
          </Link>
        }
        <Button
          margin="0 0 0 20px"
          height="35px"
          text="anslut ditt företag"
        />
      </AuthBtnCol>
    </StyledNavbar>
  )
}