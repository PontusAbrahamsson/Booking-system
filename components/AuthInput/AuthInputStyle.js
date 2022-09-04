import styled from "styled-components";

export const AuthInputBorder = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.link} ;
  }
`

export const AuthInputStyle = styled.input`
  color: ${({ theme }) => theme.colors.text};
  border: none;
  height: 48px;
  border-radius: 10px;
  width: 100%;
  padding-left: 20px;
  font-size: 16px;
  outline: 0;
  background-color: white;
`