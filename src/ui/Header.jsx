import styled from "styled-components";
import Button from "./Button";
import { HiLogout, HiOutlineUser } from "react-icons/hi";
import useLogout from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import SideBySide from "./SideBySide";
import Avatar from "./Avatar";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import ToggleDarkMode from "./ToggleDarkMode";

const StyledHeader = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  padding: 1rem 5rem;
  display: flex;
  justify-content: end;
`;

function Header() {
  const { logout, isLoggingOut } = useLogout();
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    user_metadata: { fullName, avatar },
  } = user.user;
  function handleLogout() {
    logout();
  }
  return (
    <StyledHeader>
      <SideBySide $gap="1.5rem">
        <Avatar src={avatar || "./../../default-user.jpg"} alt="user-profile" />
        <span>{fullName}</span>
        <Button
          disabled={isLoggingOut}
          type="icon"
          size="icon"
          onClick={() => navigate("/account")}
        >
          <HiOutlineUser />
        </Button>
        <Button
          disabled={isLoggingOut}
          type="icon"
          size="icon"
          onClick={handleLogout}
        >
          {isLoggingOut ? <SpinnerMini /> : <HiLogout />}
        </Button>
        <ToggleDarkMode />
      </SideBySide>
    </StyledHeader>
  );
}

export default Header;
