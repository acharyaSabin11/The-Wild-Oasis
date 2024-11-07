import styled from "styled-components";
import Heading from "./../ui/Heading";
import UpdateSettinsForm from "../features/settings/UpdateSettinsForm";

const StyledSettings = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 120rem;
  margin: 0 auto;
  gap: 3rem;
`;

function Settings() {
  return (
    <StyledSettings>
      <Heading as="h1">Update Hotel Settings</Heading>
      <UpdateSettinsForm key={Math.random() * 10000} />
    </StyledSettings>
  );
}

export default Settings;
