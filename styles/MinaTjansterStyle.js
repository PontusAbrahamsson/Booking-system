import styled from "styled-components"

export const Container = styled.div`
  width: 85vw;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  padding-top: 50px;
`

export const ServiceCard = styled.div`
  width: 400px;
  height: 270px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: white;
  transition: ease-in-out 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }

  .imgBox {
    width: 100%;
    height: 65%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
  }

  .infoBox {
    width: 100%;
    height: 35%;
    display: flex;
    box-sizing: border-box;
    padding: 15px;

    .leftInfoBox {
      flex-grow: 1;

      .cardTitle {
        font-size: 20px;
        font-weight: 600;
      }

      .cardLocation {
        font-size: 16px;
        font-weight: 500;
        margin: 2px 0;
      }

      .cardTime {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.link};
      }
    }

    .rightInfoBox {
      display: flex;
      align-items: center;

      .manageBtn {
        width: 110px;
        height: 40px;
        background: linear-gradient(90deg, rgba(106,61,255,1) 0%, rgba(134,97,255,1) 100%);
        border: none;
        border-radius: 10px;
        color: white;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`

export const AddServiceCard = styled.a` 
  width: 400px;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 1px solid lightgray;
  transition: ease-in-out .2s;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.linkLight};

    .addNewIcon {
      border-color: ${({ theme }) => theme.colors.linkLight};
      fill: ${({ theme }) => theme.colors.linkLight};
    }
  }

  .addNewIcon {
    border: 1px solid lightgray;
    border-radius: 50%;
    fill: lightgray;
    transition: ease-in-out .2s;
  }
`