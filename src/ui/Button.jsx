import styled, { css } from "styled-components";

const size = {
  fullWidth: css`
    width: 100%;
  `,

  medium: css`
    padding: 0.7rem 1.5rem;
    font-size: 1.4rem;
  `,

  small: css`
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
  `,

  icon: css`
    padding: 0.5rem 0.5rem;
    font-size: 1.3rem;
  `,

  square: css`
    padding: 0.5rem 0.5rem;
    font-size: 1.5;
  `,
};

const type = {
  primary: css`
    background-color: var(--color-brand-700);
    color: var(--color-brand-100);
    border: none;
  `,

  secondary: css`
    background-color: var(--color-grey-200);
    border: 1px solid var(--color-grey-400);
    color: var(--color-grey-700);
  `,

  formButton: css`
    background-color: var(--color-brand-700);
    color: var(--color-grey-100);
    margin-left: auto;
  `,

  edit: css`
    background-color: var(--color-green-700);
    color: var(--color-green-100);
    border: none;
    font-weight: 700;
  `,

  delete: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);
    border: none;
    font-weight: 700;
  `,

  duplicate: css`
    background-color: var(--color-blue-700);
    color: var(--color-red-100);
    border: none;
    font-weight: 700;
  `,

  icon: css`
    background-color: var(--color-brand-100);
    border: 2px solid var(--color-brand-500);
    color: var(--color-brand-700);
    font-weight: bold;
    border-radius: 1000px;
    font-size: 1.7rem;
  `,
};

const hover = {
  icon: css`
    background-color: var(--color-brand-500);
    color: var(--color-brand-100);
  `,
};

const Button = styled.button`
  font-weight: 500;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: var(--border-radius-sm);
  ${(props) => size[props.size]}
  ${(props) => type[props.type]}

  &:disabled {
    background-color: var(--color-grey-300);
    color: var(--color-grey-600);
    /* border: 1px solid var(--color-grey-700); */
    border: none;
  }

  &:hover {
    ${(props) => hover[props.type]}
  }
`;

export default Button;
