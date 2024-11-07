import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { usePopOff } from "../hooks/usePopOff";

const ContextMenuContext = createContext();
const menuWidth = "190";
const Menu = styled.div`
  background-color: var(--color-grey-0);
  position: absolute;
  top: ${({ $position }) => $position?.y ?? 0}px;
  left: ${({ $position }) => $position?.x ?? 0}px;
  width: ${menuWidth}px;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-400);
`;

const ListButton = styled.button`
  display: flex;
  gap: 1rem;
  border: none;
  background-color: transparent;
  font-size: 1.7rem;
  color: var(--color-grey-500);
  padding: 1rem 2rem;
  font-weight: medium;
  align-items: center;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const StyledButton = styled.button`
  background-color: transparent;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 1000px;
  color: var(--color-grey-700);
  border: none;
  outline: none;
  height: 30px;
  width: 30px;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

function ContextMenu({ children }) {
  const [openedId, setOpenedId] = useState("");
  const [position, setPosition] = useState({});

  const openMenu = setOpenedId;
  function closeMenu() {
    setOpenedId("");
  }
  return (
    <ContextMenuContext.Provider
      value={{
        openedId,
        setOpenedId,
        closeMenu,
        openMenu,
        position,
        setPosition,
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}

function OpenMenu({ id }) {
  const { openedId, openMenu, closeMenu, setPosition } =
    useContext(ContextMenuContext);
  function handleClick(e) {
    e.stopPropagation();
    openedId === "" || openedId !== id ? openMenu(id) : closeMenu();
    const buttonDim = e.target.closest("button").getBoundingClientRect();
    const position = {};
    position.x = buttonDim.left - menuWidth;
    position.y = buttonDim.top + buttonDim.height;
    setPosition(position);
  }
  return (
    <StyledButton onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledButton>
  );
}

function MenuList({ children, id }) {
  const { openedId, position, closeMenu } = useContext(ContextMenuContext);
  const ref = usePopOff(closeMenu, false);

  if (openedId !== id) return null;

  return createPortal(
    <Menu ref={ref} $position={position}>
      {children}
    </Menu>,
    document.body
  );
}

function Button({ children, onClick, disabled }) {
  const { closeMenu } = useContext(ContextMenuContext);
  return (
    <ListButton disabled={disabled} onClick={() => onClick(closeMenu)}>
      {children}
    </ListButton>
  );
}

ContextMenu.OpenMenu = OpenMenu;
ContextMenu.MenuList = MenuList;
ContextMenu.Button = Button;

export default ContextMenu;
