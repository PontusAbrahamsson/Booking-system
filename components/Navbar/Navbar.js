import { StyledNavbar, AuthLink, AuthBtnCol } from "./NavbarStyle";
import Button from "../Button/Button";
import Link from "next/link";
import { useSelector } from "react-redux";
import WithAuth from "../../hoc/withAuth";
import WithBusinessAuth from "../../hoc/withBusinessAuth";

export default function Navbar() {
  const { defaultUser, businessAccount } = useSelector((state) => state.users);
  console.log(businessAccount)
  console.log(defaultUser)

  return (
    <StyledNavbar>
      <h1>FÖRETAG</h1>
      <AuthBtnCol>
        {businessAccount !== null &&
          <WithBusinessAuth>
            <Link href="/mina-tjanster">
              <AuthLink>
                Mina tjänster
              </AuthLink>
            </Link>
            <Link href="/konto">
              <AuthLink>
                Konto
              </AuthLink>
            </Link>
          </WithBusinessAuth>
        }

        {defaultUser !== null &&
          <>
            <Link href="/konto">
              <AuthLink>
                Konto
              </AuthLink>
            </Link>
          </>
        }

        {defaultUser === null && businessAccount === null &&
          <>
            <Link href="/signin">
              <AuthLink>
                Logga in
              </AuthLink>
            </Link>
            /
            <Link href="/signup">
              <AuthLink>
                Registrera
              </AuthLink>
            </Link>
            <Link href="/anslut-foretag">
              <a>
                <Button
                  margin="0 0 0 20px"
                  height="35px"
                  text="anslut ditt företag"
                />
              </a>
            </Link>
          </>
        }

      </AuthBtnCol>
    </StyledNavbar>
  )
}