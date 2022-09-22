import styled from "styled-components";

export const SingleClinic = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 60px;
  box-sizing: border-box;
  padding: 32px 16px;
  background-color: white;
`

export const BookingSection = styled.div`
  max-width: 640px;
  width: 800px;
  display: flex;
  flex-direction: column;

  .title {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .serviceUl {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0;
    margin: 0;

    .headServiceLi {
      list-style: none;
      width: 100%;

      .flexBetween {
        background-color: ${({ theme }) => theme.colors.background};
        border-radius: 10px;
        cursor: pointer;
        box-sizing: border-box;
        padding: 15px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .headServiceTitle {
          text-transform: capitalize;
          font-size: 18px;
          font-weight: 600;
        }
      }

      .singleServiceLi {
        list-style: none;
        box-sizing: border-box;
        padding: 15px;

        .ServiceFlexBetween {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .wrapper {
            display: flex;
            flex-direction: column;

            .singleTitle {
              font-size: 16px;
              font-weight: 500;
            }

            .signleUnderText {
              font-size: 14px;
              color: grey;
              font-weight: 500;
            }
          }

          .bookBtn {
            background-color: white;
            border: 1px solid ${({ theme }) => theme.colors.link};
            border-radius: 20px;
            padding: 8px 20px;
            font-size: 16px;
            font-weight: 500;
            transition: ease-in-out .2s;
            cursor: pointer;

            &:hover {
              background-color: ${({ theme }) => theme.colors.link};
              color: white;
            }
          }
        }

        .singleTitle {
          font-size: 16px;
          font-weight: 500;
        }

        .signleUnderText {
          font-size: 14px;
          color: grey;
          font-weight: 500;
        }
      }
    }
  }
`

export const AboutContainer = styled.div`
  max-width: 400px;
  width: 400px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;

  .title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 40px;
  }

  p {
    font-size: 16px;
    font-weight: 400;
  }

  .showMoreBtn {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.link};
    border: none;
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    margin-top: 10px;
    cursor: pointer;
  }

  .flexBetween {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    padding: 10px 0;

    .wrap {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .callBtn {
      background-color: ${({ theme }) => theme.colors.link};
      border: 1px solid ${({ theme }) => theme.colors.link};
      border-radius: 4px;
      padding: 8px 25px;
      color: white;
      font-size: 15px;
      font-weight: 600;
      margin-left: 10px;
    }
  }

  .opentimeUl {
    display: flex;
    flex-direction: column;
    margin: 0 0 30px 0;
    padding: 0;

    .timeLi {
      list-style: none;
      padding: 5px 0;
      position: relative;

      .day {
        font-size: 16px;
        font-weight: 400;
        color: grey;
      }

      .time {
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        left: 75px;
      }
    }
  }

  .flexBox {
    display: flex;
    align-items: center;
    border-top: 1px solid lightgray;
    padding: 15px 0;
    margin-top: ${({ marginTop }) => marginTop};

    .infoIcon {
      fill: ${({ theme }) => theme.colors.link};
    }

    .infoText {
      color: ${({ theme }) => theme.colors.link};
      margin-left: 10px;
      cursor: pointer;
    }
  }
`