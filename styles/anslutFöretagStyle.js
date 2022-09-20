import styled from "styled-components";

export const AnslutFöretagPage = styled.div`

  .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed {
    color: ${({ theme }) => theme.colors.link};
  }

  .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active {
    color: ${({ theme }) => theme.colors.link};
    transform: scale(1.2);
    transition: ease-in-out 0.2s;
  }
`

export const Container = styled.div`
   max-width: 520px;
   height: auto;
   margin: 0 auto;
   margin-top: 20px;
`

export const UserInfoContainer = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 30px;
  background-color: white;
  border-radius: 10px;

  .titleNote {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 40px;
  }

  .PhoneInputInput {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid lightgray;
    width: 100%;
    outline: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.link};
    }
  }
`

export const CardTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: ${((props) => props.margin)};
`

export const TextArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  .profileInputLabel {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .textAreaBorders {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 4px;

    &:focus-within {
      border-color: ${({ theme }) => theme.colors.link};
    }

    .omOssTextarea {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      outline: none;
      border: none;
      font-size: 16px;
      font-weight: 500;
      font-family: 'arial';
      border-radius: 4px;
      resize: none;
      background-color: white;
    }
  }
`

export const FlexBetweenWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${((props) => props.justifyContent)};
    margin-top: 30px;

    .backBtn {
      border: none;
      background-color: white;
      font-size: 15px;
      font-weight: 600;
      color: ${(({ theme }) => theme.colors.link)};
      cursor: pointer;
    }

    .nextBtn {
      border: 1px solid ${(({ theme }) => theme.colors.link)};
      background-color: white;
      font-size: 15px;
      font-weight: 600;
      color: ${(({ theme }) => theme.colors.link)};
      padding: 8px 25px;
      border-radius: 4px;
      cursor: pointer;
      transition: ease-in-out .2s;

      &:hover {
        background-color: ${(({ theme }) => theme.colors.link)};
        color: white;
      }
    }
`

export const ProfileInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: hidden;

  .profileInputLabel {
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

      .addIconInput {
        fill: ${({ theme }) => theme.colors.linkLight} ;
      }
    }

    .input {
      height: 100%;
      width: 100%;
      border: none;
      font-size: 16px;
      font-weight: 500;
      outline: none;
      color: ${({ theme }) => theme.colors.text};
      background-color: white;
    }
  }
`

export const TimeInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  position: relative;

  .day {
    font-size: 16px;
    font-weight: 600;
  }

  .closedBtn {
    width: 130px;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    left: 100px;
    border: 1px solid lightgray;
    padding: 5px 15px;
    border-radius: 6px;
    transition: ease-in-out .1s;
    cursor: pointer;
    background-color: white;

    span {
      transition: ease-in-out;
      font-size: 15px;
      font-weight: 500;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colors.link};
    }

    &:hover > span {
      display: none;
    }

    &:hover::before {
      content: "Lägg till";
      color: ${({ theme }) => theme.colors.link};
    }
  }

  .removeTimeBtn {
    width: 130px;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    left: 100px;
    border: 1px solid lightgray;
    padding: 5px 15px;
    border-radius: 6px;
    transition: ease-in-out .1s;
    cursor: pointer;
    background-color: white;

    &:hover {
      border-color: red;
    }

    &:hover > span {
      display: none;
    }

    &:hover::before {
      content: "Ta bort";
      color: red;
    }
  }
`

export const AddTimeModal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  bottom: 0;
  left: 0;
  background-color: rgba(39, 39, 39, 0.178);

  .addTimeContainer {
    background-color: white;
    max-width: 520px;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 25%;
    box-sizing: border-box;
    padding: 30px;

    .wrapper {
      width: 100%;
      display: flex;
      /* height: 35px; */
      justify-content: space-between;

      .exitIcon {
        cursor: pointer;
      }
    }

    .timeInput {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 18px;
      padding: 10px 25px;
      border: 1px solid lightgray;
      border-radius: 4px;
      margin: 20px 20px 0 15px;
      cursor: pointer;
      outline: none;

      &:focus {
        border-color: ${({ theme }) => theme.colors.link};
      }
    }

    .btnWrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30px;

    .saveTimeBtn {
      width: 110px;
      height: 45px;
      background-color: white;
      border: 1px solid ${({ theme }) => theme.colors.link};
      font-size: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.link};
      border-radius: 10px;
      cursor: pointer;
      transition: ease-in-out .2s;
      
      &:hover {
        background-color: ${({ theme }) => theme.colors.link};
        color: white;
      }
    }

      .cancelBtn {
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

export const StepperT = styled.div`
  max-width: 726px;
  height: 60px;
  display: flex;
  margin: 60px auto 40px auto ;
  z-index: 1000;
  

  .stepperBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    position: relative;
    z-index: 1000;

    .circle {
      width: 25px;
      height: 25px;
      background-color: grey;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: white;
      margin-bottom: 15px;
      transition: ease-in-out .2s;

      .checkIcon {
        fill: white;
      }
    }

    .circle.active {
      background-color: ${({ theme }) => theme.colors.link};
      transform: scale(1.2);
    }

    .circle.pastActive {
      background-color: ${({ theme }) => theme.colors.link};
    }

    .stepperText {
      font-size: 15px;
    }

    .line {
      z-index: 1000;
      border-top: 1px solid grey;
      width: 100px;
      position: absolute;
      top: 12px;
      left: calc(-50% + 20px);
      right: calc(50% + 20px);
      height: 1px;
    }
  }
`

export const SelectServiceModal = styled.div`
  background-color: ${(({ theme }) => theme.colors.background)};
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;

  .headServiceTitlte {
    font-size: 28px;
    font-weight: 600;
  }

  .modalContainer {
    max-width: 1000px;
    margin: 0 auto;
    background-color: white;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
    padding: 20px;

    .containerHeader {
      top: 0;
      left: 0;
      position: absolute;
      border-bottom: 1px solid lightgray;
      width: 100%;
      box-sizing: border-box;
      padding: 20px;
    }

    .flexBox {
      margin-top: 70px;
      width: 100%;
      display: flex;
      flex-wrap: wrap; 
      box-sizing: border-box;
      justify-content: space-evenly;
      padding: 20px 40px;
      gap: 20px;

      .itemBox {
        border: 1px solid lightgray;
        height: 170px;
        border-radius: 10px;
        width: 150px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        cursor: pointer;

        .imgContainer {
          width: 40px;
          height: 40px;
          position: relative;
        }

        &:hover {
          box-shadow: rgba(0, 0, 0, 0) 0px 4px 12px;
        }

        .serviceTitle {
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          transition: 0s;
        }
      }

      .itemBox.itemBoxSelected {
        border: 2px solid ${({ theme }) => theme.colors.linkLight};
        background-color: ${({ theme }) => theme.colors.background};
        box-shadow: rgba(0, 0, 0, 0) 0px 4px 12px;
      }
    }
  }
`

export const ServiceTab = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid lightgray;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: flex-start;
  box-sizing: border-box;
  /* padding: 0 10px; */
  cursor: pointer;
  transition: ease-in-out .15s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: grey;
  }

  .dropDownWrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .dropDownHead {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: capitalize;
      overflow: hidden;

      &:hover > .wrapper > .editIcon {
        visibility: visible;
        opacity: 1;
      }

      .wrapper {
        display: flex;
        align-items: center;
        height: 45px;

        .changeTitleInput {
          outline: none;
          height: 35px;
          border: 1px solid lightgray;
          border-radius: 4px;
          padding: 0 10px;
          font-size: 16px;
        }

        span {
          font-weight: 500;
          font-size: 18px;
        }

        .editIcon {
          margin-left: 5px;
          visibility: hidden;
          opacity: 0;
          transition: ease-in-out .15s;
        }
      }

      .arrowIcon {
        transition: ease-in-out 0.15s;
        transform: rotate(0);
      }

      .flexGrow {
        height: 100%;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .openArrowIcon {
          transition: ease-in-out 0.15s;
          transform: rotate(-180deg);
        }
      }
    }
  }

  .dropDownData {
    width: 100%;
    transition: height 0.2s ease-in;
    height: 1px;
    overflow: hidden;

    .serviceInputWrapper {
      width: 100%;
      display: flex;
      flex-direction: column;

      .flex {
        justify-content: space-between;
        width: 100%;
        display: flex;
        margin-top: 10px;
        border-bottom: 1px solid lightgray;
        padding-bottom: 20px;

        .boxWrapper {
          display: flex;
          flex-direction: column;
          width: 45%;
          
          .serviceInputLabel {
            margin-bottom: 10px;
            font-size: 15px;
            font-weight: 400;
          }
        
          .serviceInput {
            border: 1px solid lightgray;
            outline: none;
            padding: 8px 15px;
            border-radius: 4px;
          
            &:focus {
              border-color: gray;
            }
          }
        }
      }

      .wrapper {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 25px;

        .addServiceIcon {
          fill: ${({ theme }) => theme.colors.link};
        }

        .addService {
          font-size: 15px;
          font-weight: 500;
          color: ${({ theme }) => theme.colors.linkLight};
        }
      }

      .serviceWrapper:hover > .titleIconWrapper > .iconWrapper  .editIcon {
        visibility: visible;
        opacity: 1;
      }

      .serviceWrapper:hover > .titleIconWrapper > .iconWrapper  .trashIcon {
        visibility: visible;
        opacity: 1;
      }

      .serviceWrapper {
        margin: 15px 0 5px 0;

        .serviceTitle {
          font-size: 16px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .titleIconWrapper {
          width: 100%;
          display: flex;

          .iconWrapper {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-left: 5px;

            .flexWrap {
              display: flex;
              align-items: center;
              height: 100%;

              .changeTitleInput {
                max-width: 170px;
                outline: none;
                height: 25px;
                border: 1px solid lightgray;
                border-radius: 4px;
                padding: 0 10px;
                font-size: 16px;
              }
            }

            .editIcon {
              visibility: hidden;
              opacity: 0;
              transition: ease-in-out .15s;
            }

            .trashIcon {
              fill: red;
              visibility: hidden;
              opacity: 0;
              transition: ease-in-out .15s;
            }
          }
        } 
      }
    }
  }
`