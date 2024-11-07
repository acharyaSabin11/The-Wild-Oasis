import styled from "styled-components";
import MainNav from "./MainNav";
import Logo from "./Logo";

const StyledSidebar = styled.aside`
  grid-row: 1/-1;
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  align-items: center;
  padding: 3rem 2rem;
`;

function SideBar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default SideBar;
