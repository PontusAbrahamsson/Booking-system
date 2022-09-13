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

  h1 {
    margin: 0;
    color: white;
    font-size: 24px;
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