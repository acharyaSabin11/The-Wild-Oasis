import styled from "styled-components";
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  padding: 4rem 5rem;
  height: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <SideBar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
