import styled from "styled-components";

const TextArea = styled.textarea`
  padding: 0.75rem 2rem;
  border: 2px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  height: 10rem;
  max-height: 10rem;
  width: 100%;
  max-width: 30rem;
  background-color: var(--color-grey-100);
  color: var(--color-grey-700);

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TextArea;
