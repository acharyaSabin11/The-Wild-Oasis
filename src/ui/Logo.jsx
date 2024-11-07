import styled from "styled-components";
import { useThemeContext } from "../contexts/ThemeContext";

const StyledImage = styled.img`
  width: 15rem;
`;
function Logo() {
  const { mode } = useThemeContext();
  const src = mode === "dark-mode" ? "logo-dark.png" : "logo-light.png";
  return <StyledImage src={src} />;
}

export default Logo;
