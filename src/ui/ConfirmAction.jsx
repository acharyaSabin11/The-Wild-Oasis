import styled from "styled-components";
import Button from "./Button";
import SideBySide from "./SideBySide";

const StyledDialogue = styled.div`
  margin: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function ConfirmAction({ confirmText, actionOnConfirm, onCLoseModal }) {
  return (
    <StyledDialogue>
      <p>{confirmText}</p>
      <SideBySide>
        <Button
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
            onCLoseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button type="delete" onClick={() => actionOnConfirm(onCLoseModal)}>
          Delete
        </Button>
      </SideBySide>
    </StyledDialogue>
  );
}

export default ConfirmAction;
