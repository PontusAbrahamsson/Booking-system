import { AuthInputStyle, AuthInputBorder } from "./AuthInputStyle"

export default function AuthInput({ type, placeholder, id, value, setState }) {

  return (
    <AuthInputBorder>
      <AuthInputStyle
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={(e) => setState(e.target.value)}
      />
    </AuthInputBorder>
  )
}