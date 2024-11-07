import styled, { css } from "styled-components";

const BookingStatus = styled.div`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  justify-self: start;
  border-radius: 1000px;
  ${(prop) =>
    prop.type === "checked-in" &&
    css`
      color: var(--color-green-700);
      background-color: var(--color-green-100);
      border: 1px solid var(--color-green-700);
    `}
  ${(prop) =>
    prop.type === "checked-out" &&
    css`
      color: var(--color-grey-700);
      background-color: var(--color-grey-100);
      border: 1px solid var(--color-grey-700);
    `}
      ${(prop) =>
    prop.type === "unconfirmed" &&
    css`
      color: var(--color-blue-700);
      background-color: var(--color-blue-100);
      border: 1px solid var(--color-blue-700);
    `}
`;
export default BookingStatus;
