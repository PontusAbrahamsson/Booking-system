import styled from "styled-components";

export const ButtonStyle = styled.button`
  border: none;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(106,61,255,1) 0%, rgba(134,97,255,1) 100%);
  color: white;
  cursor: pointer;
  margin: ${({ margin }) => margin};
  height: ${({ height }) => height};
  margin-top: ${({ marginTop }) => marginTop};
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 600;
`