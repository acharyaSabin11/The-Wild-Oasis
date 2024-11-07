import styled from "styled-components";
import Heading from "../ui/Heading";
import CreateUserForm from "../features/authentication/CreateUserForm";

const StyledUsers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Users() {
  return (
    <StyledUsers>
      <Heading>Create a new user</Heading>
      <CreateUserForm />
    </StyledUsers>
  );
}

export default Users;
