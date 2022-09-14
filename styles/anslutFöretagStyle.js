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
    }

    .input {
      height: 100%;
      width: 95%;
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
  margin-top: 20px;
  position: relative;

  .day {
    font-size: 16px;
    font-weight: 600;
  }

  .closed {
    font-size: 16px;
    font-weight: 600;
    position: absolute;
    left: 100px;
  }
`