import styled, { css } from "styled-components";

const SideBySide = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  width: 100%;
  max-width: 100%;
  flex-wrap: wrap;
  align-items: center;
  ${({ $left }) =>
    $left &&
    css`
      justify-content: start;
    `}

  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
`;

export default SideBySide;
