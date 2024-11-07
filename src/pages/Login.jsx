import styled from "styled-components";
import Logo from "./../ui/Logo";
import Heading from "./../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";

const StyledLogin = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-100);
`;

function Login() {
  return (
    <StyledLogin>
      <Logo />
      <Heading as="h1">Login to your account</Heading>
      <LoginForm />
    </StyledLogin>
  );
}

export default Login;
