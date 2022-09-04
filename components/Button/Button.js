import { ButtonStyle } from "./ButtonStyle"

export default function Button({ text, margin, height, marginTop, onClick }) {

  return (
    <ButtonStyle margin={margin} height={height} marginTop={marginTop} onClick={onClick}>
      {text}
    </ButtonStyle>
  )
}