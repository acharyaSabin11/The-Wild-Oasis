import styled, { css } from "styled-components";

const StyledCheckBox = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  gap: 2rem;

  & input {
    height: 2rem;
    width: 2rem;
    accent-color: var(--color-brand-700);
    border-radius: var(--border-radius-sm);

    &:checked {
      border-radius: var(--border-radius-sm);
      border: none;
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      accent-color: var(--color-grey-400);
    }
  }
`;

const Label = styled.span`
  ${(props) =>
    props.disabled &&
    css`
      color: var(--color-grey-400);
    `}
`;

function CheckBox({ onChange, label, isChecked, disabled }) {
  return (
    <StyledCheckBox>
      <input
        disabled={disabled}
        checked={isChecked}
        type="checkbox"
        onChange={onChange}
      />
      <Label disabled={isChecked}>{label}</Label>
    </StyledCheckBox>
  );
}

export default CheckBox;
