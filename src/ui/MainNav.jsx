import { NavLink } from "react-router-dom";
import styled from "styled-components";

import {
  HiOutlineCalendar,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavElement = styled(NavLink)`
  font-weight: 900;
  padding: 1.2rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 2.5rem;

  & span {
    font-size: 1.5rem;
    color: var(--color-grey-700);
  }

  &:hover,
  &.active {
    color: var(--color-brand-600);
  }

  &.active {
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }
`;

const NavList = styled.ul`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function MainNav() {
  return (
    <nav style={{ width: "100%" }}>
      <NavList>
        <li>
          <NavElement to="dashboard">
            {" "}
            <HiOutlineHome />
            <span>Home</span>
          </NavElement>
        </li>
        <li>
          <NavElement to="bookings">
            <HiOutlineCalendar />
            <span>Bookings</span>
          </NavElement>
        </li>
        <li>
          <NavElement to="cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </NavElement>
        </li>
        <li>
          <NavElement to="users">
            <HiOutlineUsers />
            <span>Users</span>
          </NavElement>
        </li>
        <li>
          <NavElement to="settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </NavElement>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
