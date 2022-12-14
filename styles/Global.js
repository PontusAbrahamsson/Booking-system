import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  /* background-color: ${({ theme }) => theme.colors.background}; */
  background-color: white;
}

h1,
h2,
h3, 
h4,
h5,
h6,
span,
label,
textarea,
p {
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
}

`

export default GlobalStyles
