import styled from "styled-components";

export const AuthPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 150px;
`

export const AuthFormWrapper = styled.div`
  max-height: 75%;
  margin: auto 0;
  height: 100%;
  max-width: 340px;
  width: 100%;
`

export const AuthForm = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`

export const AuthFormTitle = styled.h1`
  color: ${({ theme }) => theme.colors.title};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 35px;
`

export const GoogleAuthButton = styled.button`
  border-radius: 10px;
  border: none;
  background-color: white;
  padding: 5px 0;
  border: 1px solid lightgrey;
  cursor: pointer;
`

export const AlternativeSignIn = styled.span`
  font-size: 16px;
  text-align: center;
  cursor: pointer;
`