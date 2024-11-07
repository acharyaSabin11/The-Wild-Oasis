import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { usePopOff } from "../hooks/usePopOff";

const StyledModal = styled.div`
  position: absolute;
  background-color: var(--color-grey-0);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: end;
  padding: 2rem;
`;

const OverLay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const ModalButton = styled.button`
  background-color: var(--color-brand-700);
  color: var(--color-grey-0);
  font-weight: 700;
  height: 3rem;
  width: 3rem;
  border-radius: var(--border-radius-sm);
  border: none;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openedName, setOpenedName] = useState("");

  function openModal(name) {
    setOpenedName(name);
  }

  function closeModal() {
    setOpenedName("");
  }
  return (
    <ModalContext.Provider value={{ openedName, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function OpenModal({ children, name }) {
  const { openModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => openModal(name) });
}

function Window({ children, name }) {
  //HOOKS
  const { closeModal, openedName } = useContext(ModalContext);
  const ref = usePopOff(closeModal, true);
  if (!name)
    throw new Error(
      "Modal Windonw needs to have a unique name to be identified"
    );

  if (openedName !== name) return null;

  return createPortal(
    <OverLay>
      <StyledModal ref={ref}>
        <ModalButton onClick={closeModal}>
          <HiXMark />
        </ModalButton>
        <div>{cloneElement(children, { onCLoseModal: closeModal })}</div>
      </StyledModal>
    </OverLay>,
    document.body
  );
}

Modal.OpenModal = OpenModal;
Modal.Window = Window;

export default Modal;
