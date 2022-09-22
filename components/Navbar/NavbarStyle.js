import styled from "styled-components";

export const StyledNavbar = styled.header`
  align-items: center;
  justify-content: space-between;
  display: flex;
  background-color: #1a1a1a;
  padding: 0 100px;
  height: 65px;
  /* position: fixed; */
  box-sizing: border-box;

  .logoContainer {
    width: 120px;
    position: relative;

    .logo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export const AuthBtnCol = styled.div`
  color: white;
`

export const AuthLink = styled.a`
  background-color: #1a1a1a;
  color: white;
  border: none;
  margin: 0 5px;
  cursor: pointer;
`