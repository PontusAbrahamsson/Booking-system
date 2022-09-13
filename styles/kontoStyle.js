import styled from "styled-components";

export const Container = styled.div`
  max-width: 520px;
  height: auto;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 100px;

  .topSection {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .goBackArrow {
      position: absolute;
      left: 0;
      cursor: pointer;
      z-index: 99;
    }

    .logoContainer {
      width: 100%;
      height: 50px;
      position: relative;
    }
  }
`

export const UserInfoContainer = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 30px;
  background-color: white;
  border-radius: 10px;

  .cardTitle {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 40px;
  }

  .topUserInfoSection {
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;

    .profileImgWrapper {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.background2};
      display: flex;
      justify-content: center;
      align-items: center;

      .profileImgText {
        font-size: 22px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.link};
        text-transform: uppercase;
      }
    }

    .nameContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20px;

      .name {
        font-size: 16px;
        font-weight: 700;
        text-transform: capitalize;
      }

      .email {
        font-size: 15px;
        font-weight: 600;
        color: grey;
      }
    }
  }

  .logoutBtn {
    background-color: white;
    border: none;
    margin-top: 15px;
    font-weight: 600;
    font-size: 15px;
    color: grey;
    cursor: pointer;
  }

  .bottomContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .editProfileBtn {
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      color: white;
      background: linear-gradient(90deg, rgba(106,61,255,1) 0%, rgba(134,97,255,1) 100%);
      border: none;
      cursor: pointer;
    }

    .removeAccountBtn {
      background-color: white;
      border: none;
      color: red;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  }

  .changePasswordBtn {
    width: 100%;
    height: 55px;
    background: linear-gradient(90deg, rgba(106,61,255,1) 0%, rgba(134,97,255,1) 100%);
    font-size: 15px;
    font-weight: 600;
    color: white;
    border: none;
    border-radius: 10px;
    margin-top: 30px;
    cursor: pointer;
  }

  .centerBtnWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;

    .cancelChangePasswordBtn {
      background-color: white;
      border: none;
      color: red;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`

export const ChangeUserInfoContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  margin-top: 15px;
  padding: 30px 15px;
`

export const InfoItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;

  .itemBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .itemTitle {
    font-size: 16px;
    font-weight: 600;
  }

  .itemInfo {
    font-size: 16px;
    font-weight: 600;
    color: grey;
  }

  .itemChange {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.link};
    cursor: pointer;
  }
`

export const ProfileInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;

  .passwordLabel {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .inputBorder {
    width: 100%;
    height: 50px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.link};
    }

    .input {
      height: 100%;
      width: 95%;
      border: none;
      font-size: 16px;
      font-weight: 500;
      outline: none;
      /* background-color: white; */
      color: ${({ theme }) => theme.colors.text};
      background-color: white;
    }

    .eyeIcon {
      fill: grey;
    }
  }
`

export const DeletUserModal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  bottom: 0;
  background-color: grey;

  .deletUserContainer {
    background-color: white;
    max-width: 520px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 25%;
    box-sizing: border-box;
    padding: 30px;

    .cardTitle {
      font-weight: 600;
      font-size: 24px;
      margin-bottom: 40px;
    }

    .removeBtnWrapper {
      margin-top: 30px;
      width: 100%;
      display: flex;
      justify-content: center;

      .removeAccountBtn {
        background-color: white;
        border: none;
        color: red;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
    }
    }
  }
`