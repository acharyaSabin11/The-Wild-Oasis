import styled from "styled-components";
import Heading from "../ui/Heading";
import UpdateUserForm from "../features/authentication/UpdateUserForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

function Account() {
  return (
    <StyledAccount>
      <Heading>Update your account</Heading>
      <Title>Update user data</Title>
      <UpdateUserForm />
      <Title>Update password</Title>
      <UpdatePasswordForm />
    </StyledAccount>
  );
}

export default Account;
