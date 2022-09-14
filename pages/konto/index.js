import {
  Container,
  UserInfoContainer,
  ChangeUserInfoContainer,
  InfoItem,
  ProfileInput,
  DeletUserModal
} from '../../styles/kontoStyle';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db, storage } from "../../firebase/db";
import { logout } from "../../redux/features/userSlice";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import Image from 'next/image';
import loggaBlackText from '../../resources/images/Logo-black-text.png';
import WithBusinessAuth from "../../hoc/withBusinessAuth";
import WithAuth from "../../hoc/withAuth";

export default function Konto() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = auth.currentUser
  const { defaultUser, businessAccount } = useSelector((state) => state.users);
  const [userCredentials, setUserCredentials] = useState();

  const [changeProfileModal, setChangeProfileModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [changeEmailModal, setChangeEmailModal] = useState(false);
  const [deletUserModal, setDeletUserModal] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReapeatPassword, setShowReapeatPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatePasswordInput, setUpdatePasswordInput] = useState();
  const [updateRepeatPassword, setUpdateRepeatPassowrd] = useState();

  const [updateEmailInput, setUpdateEmailInput] = useState();
  const [updateAddress, setUpdateAddress] = useState();
  const [updateFirstName, setUpdateFirstName] = useState();
  const [updateLastName, setUpdateLastName] = useState();
  const [updatePhoneNumber, setUpdatePhoneNumber] = useState();
  console.log(businessAccount)

  //Get businness or default user info
  useEffect(() => {
    async function getBusinessAccountCredentials() {
      const docRef = doc(db, 'users', businessAccount !== null ? businessAccount.uid : defaultUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserCredentials(docSnap.data());
        setUpdateFirstName(docSnap.data().förnamn);
        setUpdateLastName(docSnap.data().efternamn);
        setUpdatePhoneNumber(docSnap.data().telefonnummer);
        setUpdateAddress(docSnap.data().address);
      } else {
        console.log('No doc found!');
      };
    }
    getBusinessAccountCredentials();
  }, [])

  // Redirect if user logged out
  // useEffect(() => {
  //   if (defaultUser === null && businessAccount === null) {
  //     router.push('/signup');
  //   }
  // }, []);

  //Re authenticate
  async function reAuthenticate() {
    try {
      const credential = await EmailAuthProvider.credential(currentUser.email, confirmPassword);
      //Updates email
      if (updateEmailInput != undefined) {
        await reauthenticateWithCredential(currentUser, credential).then(() => {
          console.log('ReAuthenticated!')
          updateEmail(currentUser, updateEmailInput).then(() => {
            console.log('Email updated!')
            //Update email in firestore
            const userDocRef = doc(db, 'users', businessAccount !== null ? businessAccount.uid : defaultUser.uid)
            updateDoc(userDocRef, {
              'email': updateEmailInput
            })
          }).catch((error) => {
            console.log(error);
          });

        });
      };
      //Updates password 
      if (updatePasswordInput != undefined && updatePasswordInput === updateRepeatPassword) {
        await reauthenticateWithCredential(currentUser, credential).then(() => {
          console.log('ReAuthenticated!');
          updatePassword(currentUser, updatePasswordInput).then(() => {
            console.log('Password updated!')
          }).catch((error) => {
            console.log(error)
          })
        })
      };

    } catch (error) {
      console.log(error)
    }
  };

  console.log(currentUser)

  //Delet account and reauthenticate
  async function handleDeletUser() {
    const credential = EmailAuthProvider.credential(currentUser.email, confirmPassword);

    await reauthenticateWithCredential(currentUser, credential).then(() => {
      console.log('ReAuthenticated!')
      deleteUser(currentUser).then(() => {
        console.log('User deleted!')
        handleLogout();
      }).catch((error) => {
        console.log(error)
      })
    });
  }

  //Update user 
  async function handleUpdateUser() {
    const userDocRef = doc(db, 'users', businessAccount !== null ? businessAccount.uid : defaultUser.uid)
    await updateDoc(userDocRef, {
      'förnamn': updateFirstName,
      'efternamn': updateLastName,
      'telefonnummer': updatePhoneNumber
    })
    console.log('Doc updated!')
  };

  //Logout
  function handleLogout() {
    dispatch(logout());
    auth.signOut();
    router.push('/signin');
  };

  return (
    <>
      {changePasswordModal === false && changeProfileModal === false && changeEmailModal === false &&
        <Container>
          <div className='topSection'>
            <div className='logoContainer'>
              <Image src={loggaBlackText} layout="fill" objectFit="contain" objectPosition="center" />
            </div>
          </div>
          <UserInfoContainer>
            <>
              <h1 className='cardTitle'>Mitt konto</h1>
              <div className='topUserInfoSection'>
                <div className='profileImgWrapper'>
                  <span className='profileImgText'>{updateFirstName?.slice(0, 1)}{updateLastName?.slice(0, 1)}</span>
                </div>
                <div className='nameContainer'>
                  <span className='name'>{updateFirstName} {updateLastName}</span>
                  <span className='email'>{userCredentials?.email}</span>
                </div>
              </div>
              <button className='logoutBtn' onClick={handleLogout}>Logga ut</button>
              <ChangeUserInfoContainer>
                <InfoItem>
                  <span className='itemTitle'>Address</span>
                  <span className='itemInfo'>{userCredentials?.address}</span>
                </InfoItem>
                <InfoItem>
                  <span className='itemTitle'>Mobilnummer</span>
                  <span className='itemInfo'>{updatePhoneNumber}</span>
                </InfoItem>
                <InfoItem>
                  <span className='itemTitle'>Lösenord</span>
                  <div className='itemBox'>
                    <span className='itemInfo'>Lösenord satt</span>
                    <span className='itemChange' onClick={() => setChangePasswordModal(true)}>ändra</span>
                  </div>
                </InfoItem>
                <InfoItem>
                  <span className='itemTitle'>E-post</span>
                  <div className='itemBox'>
                    <span className='itemInfo'>{userCredentials?.email}</span>
                    <span className='itemChange' onClick={() => setChangeEmailModal(true)}>ändra</span>
                  </div>
                </InfoItem>
                <InfoItem>
                  <span className='itemTitle'>Säkerhet</span>
                  <div className='itemBox'>
                    <span className='itemInfo'>Säkerhet ej satt</span>
                    <span className='itemChange'>ändra</span>
                  </div>
                </InfoItem>
              </ChangeUserInfoContainer>
              <div className='bottomContainer'>
                <button className='editProfileBtn' onClick={() => setChangeProfileModal(true)}>Redigera Profil</button>
                <button className='removeAccountBtn' onClick={() => setDeletUserModal(true)}>Ta bort konto</button>
              </div>
            </>
          </UserInfoContainer>
        </Container>
      }
      {changePasswordModal === true &&
        <Container>
          <div className='topSection'>
            <svg className='goBackArrow' onClick={() => setChangePasswordModal(false)} xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M14.958 29.958 5 19.958 14.958 10l2 1.958-6.625 6.625H35v2.792H10.333l6.625 6.583Z" /></svg>
            <div className='logoContainer'>
              <Image src={loggaBlackText} layout="fill" objectFit="contain" objectPosition="center" />
            </div>
          </div>
          <UserInfoContainer>
            <h1 className='cardTitle'>Byt lösenord</h1>
            <ProfileInput>
              <label id='currentPassword' className='passwordLabel'>Nuvarande lösenord</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type={`${showCurrentPassword === true ? 'type' : 'password'}`}
                  placeholder='Nuvarande lösenord'
                  id='currentPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />

                {showCurrentPassword === true ?
                  <svg className='eyeIcon' onClick={() => setShowCurrentPassword(false)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488Q19.55 14.025 20.8 11.5q-1.25-2.525-3.612-4.013Q14.825 6 12 6 9.175 6 6.812 7.487 4.45 8.975 3.2 11.5q1.25 2.525 3.612 4.012Q9.175 17 12 17Z" /></svg>
                  :
                  <svg className='eyeIcon' onClick={() => setShowCurrentPassword(true)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m16.1 13.3-1.45-1.45q.225-1.175-.675-2.2-.9-1.025-2.325-.8L10.2 7.4q.425-.2.862-.3Q11.5 7 12 7q1.875 0 3.188 1.312Q16.5 9.625 16.5 11.5q0 .5-.1.938-.1.437-.3.862Zm3.2 3.15-1.45-1.4q.95-.725 1.688-1.588.737-.862 1.262-1.962-1.25-2.525-3.588-4.013Q14.875 6 12 6q-.725 0-1.425.1-.7.1-1.375.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm.5 6.15-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.587 4.012Q9.125 17 12 17q.5 0 .975-.062.475-.063.975-.138l-.9-.95q-.275.075-.525.112Q12.275 16 12 16q-1.875 0-3.188-1.312Q7.5 13.375 7.5 11.5q0-.275.037-.525.038-.25.113-.525Zm7.975 2.325ZM9.75 12.6Z" /></svg>
                }
              </div>
            </ProfileInput>
            <ProfileInput>
              <label id='newPassword' className='passwordLabel'>Nytt lösenord</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type={`${showNewPassword === true ? 'type' : 'password'}`}
                  placeholder='Nytt lösenord'
                  id='newPassword'
                  onChange={(e) => setUpdatePasswordInput(e.target.value)}
                  value={updatePasswordInput}
                />
                {showNewPassword === true ?
                  <svg className='eyeIcon' onClick={() => setShowNewPassword(false)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488Q19.55 14.025 20.8 11.5q-1.25-2.525-3.612-4.013Q14.825 6 12 6 9.175 6 6.812 7.487 4.45 8.975 3.2 11.5q1.25 2.525 3.612 4.012Q9.175 17 12 17Z" /></svg>
                  :
                  <svg className='eyeIcon' onClick={() => setShowNewPassword(true)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m16.1 13.3-1.45-1.45q.225-1.175-.675-2.2-.9-1.025-2.325-.8L10.2 7.4q.425-.2.862-.3Q11.5 7 12 7q1.875 0 3.188 1.312Q16.5 9.625 16.5 11.5q0 .5-.1.938-.1.437-.3.862Zm3.2 3.15-1.45-1.4q.95-.725 1.688-1.588.737-.862 1.262-1.962-1.25-2.525-3.588-4.013Q14.875 6 12 6q-.725 0-1.425.1-.7.1-1.375.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm.5 6.15-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.587 4.012Q9.125 17 12 17q.5 0 .975-.062.475-.063.975-.138l-.9-.95q-.275.075-.525.112Q12.275 16 12 16q-1.875 0-3.188-1.312Q7.5 13.375 7.5 11.5q0-.275.037-.525.038-.25.113-.525Zm7.975 2.325ZM9.75 12.6Z" /></svg>
                }
              </div>
            </ProfileInput>
            <ProfileInput>
              <label id='repeatPassword' className='passwordLabel'>Upprepa lösenord</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type={`${showReapeatPassword === true ? 'type' : 'password'}`}
                  placeholder='Upprepa lösenord'
                  id='repeatPassword'
                  onChange={(e) => setUpdateRepeatPassowrd(e.target.value)}
                  value={updateRepeatPassword}
                />
                {showReapeatPassword === true ?
                  <svg className='eyeIcon' onClick={() => setShowReapeatPassword(false)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488Q19.55 14.025 20.8 11.5q-1.25-2.525-3.612-4.013Q14.825 6 12 6 9.175 6 6.812 7.487 4.45 8.975 3.2 11.5q1.25 2.525 3.612 4.012Q9.175 17 12 17Z" /></svg>
                  :
                  <svg className='eyeIcon' onClick={() => setShowReapeatPassword(true)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m16.1 13.3-1.45-1.45q.225-1.175-.675-2.2-.9-1.025-2.325-.8L10.2 7.4q.425-.2.862-.3Q11.5 7 12 7q1.875 0 3.188 1.312Q16.5 9.625 16.5 11.5q0 .5-.1.938-.1.437-.3.862Zm3.2 3.15-1.45-1.4q.95-.725 1.688-1.588.737-.862 1.262-1.962-1.25-2.525-3.588-4.013Q14.875 6 12 6q-.725 0-1.425.1-.7.1-1.375.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm.5 6.15-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.587 4.012Q9.125 17 12 17q.5 0 .975-.062.475-.063.975-.138l-.9-.95q-.275.075-.525.112Q12.275 16 12 16q-1.875 0-3.188-1.312Q7.5 13.375 7.5 11.5q0-.275.037-.525.038-.25.113-.525Zm7.975 2.325ZM9.75 12.6Z" /></svg>
                }
              </div>
            </ProfileInput>
            <button className='changePasswordBtn' onClick={reAuthenticate}>Byt lösenord</button>
            <div className='centerBtnWrapper'>
              <button className='cancelChangePasswordBtn' onClick={() => { setChangePasswordModal(false); setConfirmPassword(); setUpdatePasswordInput(); setUpdateRepeatPassowrd() }}>Avbryt</button>
            </div>
          </UserInfoContainer>
        </Container>
      }

      {changeEmailModal === true &&
        <Container>
          <div className='topSection'>
            <svg className='goBackArrow' onClick={() => setChangeEmailModal(false)} xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M14.958 29.958 5 19.958 14.958 10l2 1.958-6.625 6.625H35v2.792H10.333l6.625 6.583Z" /></svg>
            <div className='logoContainer'>
              <Image src={loggaBlackText} layout="fill" objectFit="contain" objectPosition="center" />
            </div>
          </div>
          <UserInfoContainer>
            <h1 className='cardTitle'>Byt e-post</h1>
            <ProfileInput>
              <label id='newEmail' className='passwordLabel'>Ny e-post</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type="email"
                  placeholder='Ny e-post'
                  id='newEmail'
                  onChange={(e) => setUpdateEmailInput(e.target.value)}
                  value={updateEmailInput}
                />
              </div>
            </ProfileInput>
            <ProfileInput>
              <label id='currentPassword' className='passwordLabel'>Nuvarande lösenord</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type={`${showCurrentPassword === true ? 'type' : 'password'}`}
                  placeholder='Nuvarande lösenord'
                  id='currentPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />

                {showCurrentPassword === true ?
                  <svg className='eyeIcon' onClick={() => setShowCurrentPassword(false)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488Q19.55 14.025 20.8 11.5q-1.25-2.525-3.612-4.013Q14.825 6 12 6 9.175 6 6.812 7.487 4.45 8.975 3.2 11.5q1.25 2.525 3.612 4.012Q9.175 17 12 17Z" /></svg>
                  :
                  <svg className='eyeIcon' onClick={() => setShowCurrentPassword(true)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m16.1 13.3-1.45-1.45q.225-1.175-.675-2.2-.9-1.025-2.325-.8L10.2 7.4q.425-.2.862-.3Q11.5 7 12 7q1.875 0 3.188 1.312Q16.5 9.625 16.5 11.5q0 .5-.1.938-.1.437-.3.862Zm3.2 3.15-1.45-1.4q.95-.725 1.688-1.588.737-.862 1.262-1.962-1.25-2.525-3.588-4.013Q14.875 6 12 6q-.725 0-1.425.1-.7.1-1.375.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm.5 6.15-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.587 4.012Q9.125 17 12 17q.5 0 .975-.062.475-.063.975-.138l-.9-.95q-.275.075-.525.112Q12.275 16 12 16q-1.875 0-3.188-1.312Q7.5 13.375 7.5 11.5q0-.275.037-.525.038-.25.113-.525Zm7.975 2.325ZM9.75 12.6Z" /></svg>
                }
              </div>
            </ProfileInput>
            <button className='changePasswordBtn' onClick={reAuthenticate}>Byt lösenord</button>
            <div className='centerBtnWrapper'>
              <button className='cancelChangePasswordBtn' onClick={() => { setChangeEmailModal(false); setConfirmPassword(); setUpdateEmailInput(); setShowCurrentPassword() }}>Avbryt</button>
            </div>
          </UserInfoContainer>
        </Container>
      }

      {changeProfileModal === true &&
        <Container>
          <div className='topSection'>
            <svg className='goBackArrow' onClick={() => setChangeProfileModal(false)} xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M14.958 29.958 5 19.958 14.958 10l2 1.958-6.625 6.625H35v2.792H10.333l6.625 6.583Z" /></svg>
            <div className='logoContainer'>
              <Image src={loggaBlackText} layout="fill" objectFit="contain" objectPosition="center" />
            </div>
          </div>
          <UserInfoContainer>
            <h1 className='cardTitle'>Redigera profil</h1>
            <ProfileInput>
              <label id='name' className='passwordLabel'>Förnamn</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type="text"
                  placeholder='Förnamn'
                  id='name'
                  onChange={(e) => setUpdateFirstName(e.target.value)}
                  value={updateFirstName}
                />
              </div>
            </ProfileInput>
            <ProfileInput>
              <label id='lastName' className='passwordLabel'>Efternamn</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type="text"
                  placeholder='Efternamn'
                  id='lastName'
                  onChange={(e) => setUpdateLastName(e.target.value)}
                  value={updateLastName}
                />
              </div>
            </ProfileInput>
            <ProfileInput>
              <label id='streetAddress' className='passwordLabel'>Gatuadress</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type="text"
                  placeholder='Gatuadress'
                  id='streetAddress'
                  onChange={(e) => setUpdateAddress(e.target.value)}
                  value={updateAddress}
                />
              </div>
            </ProfileInput>
            <ProfileInput>
              <label id='phoneNumber' className='passwordLabel'>Mobilnummer</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type="text"
                  placeholder='Mobilnummer'
                  id='phoneNumber'
                  onChange={(e) => setUpdatePhoneNumber(e.target.value)}
                  value={updatePhoneNumber}
                />
              </div>
            </ProfileInput>
            <button className='changePasswordBtn' onClick={handleUpdateUser}>Spara</button>
            <div className='centerBtnWrapper'>
              <button className='cancelChangePasswordBtn' onClick={() => setChangeProfileModal(false)}>Avbryt</button>
            </div>
          </UserInfoContainer>
        </Container>
      }

      {deletUserModal === true &&
        <DeletUserModal>
          <div className='deletUserContainer'>
            <div className='wrapper'>
              <h1 className='cardTitle'>Ta bort konto</h1>
              <svg onClick={() => { setDeletUserModal(false); setConfirmPassword() }} className='exitIcon' xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="m10.583 30.417-1-1L19 20l-9.417-9.417 1-1L20 19l9.417-9.417 1 1L21 20l9.417 9.417-1 1L20 21Z" /></svg>
            </div>
            <ProfileInput>
              <label id='currentPassword' className='passwordLabel'>Bekräfta lösenord</label>
              <div className='inputBorder'>
                <input
                  className='input'
                  type={`${showCurrentPassword === true ? 'type' : 'password'}`}
                  placeholder='Bekräfta lösenord'
                  id='currentPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />

                {showCurrentPassword === true ?
                  <svg className='eyeIcon' onClick={() => setShowCurrentPassword(false)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 16q1.875 0 3.188-1.312Q16.5 13.375 16.5 11.5q0-1.875-1.312-3.188Q13.875 7 12 7q-1.875 0-3.188 1.312Q7.5 9.625 7.5 11.5q0 1.875 1.312 3.188Q10.125 16 12 16Zm0-1.8q-1.125 0-1.912-.788Q9.3 12.625 9.3 11.5t.788-1.913Q10.875 8.8 12 8.8t1.913.787q.787.788.787 1.913t-.787 1.912q-.788.788-1.913.788Zm0 4.8q-3.65 0-6.65-2.038-3-2.037-4.35-5.462 1.35-3.425 4.35-5.463Q8.35 4 12 4q3.65 0 6.65 2.037 3 2.038 4.35 5.463-1.35 3.425-4.35 5.462Q15.65 19 12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488Q19.55 14.025 20.8 11.5q-1.25-2.525-3.612-4.013Q14.825 6 12 6 9.175 6 6.812 7.487 4.45 8.975 3.2 11.5q1.25 2.525 3.612 4.012Q9.175 17 12 17Z" /></svg>
                  :
                  <svg className='eyeIcon' onClick={() => setShowCurrentPassword(true)} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m16.1 13.3-1.45-1.45q.225-1.175-.675-2.2-.9-1.025-2.325-.8L10.2 7.4q.425-.2.862-.3Q11.5 7 12 7q1.875 0 3.188 1.312Q16.5 9.625 16.5 11.5q0 .5-.1.938-.1.437-.3.862Zm3.2 3.15-1.45-1.4q.95-.725 1.688-1.588.737-.862 1.262-1.962-1.25-2.525-3.588-4.013Q14.875 6 12 6q-.725 0-1.425.1-.7.1-1.375.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm.5 6.15-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.587 4.012Q9.125 17 12 17q.5 0 .975-.062.475-.063.975-.138l-.9-.95q-.275.075-.525.112Q12.275 16 12 16q-1.875 0-3.188-1.312Q7.5 13.375 7.5 11.5q0-.275.037-.525.038-.25.113-.525Zm7.975 2.325ZM9.75 12.6Z" /></svg>
                }
              </div>
            </ProfileInput>
            <div className='removeBtnWrapper'>
              <button className='removeAccountBtn' onClick={handleDeletUser}>Ta bort konto</button>
            </div>
          </div>
        </DeletUserModal>
      }
    </>
  )
}