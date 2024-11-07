import styled, { css } from "styled-components";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledStatsItem = styled.div`
  padding: 1.5rem 2rem;
  background-color: var(--color-grey-0);
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 2.5rem 4rem;
  column-gap: 1.5rem;
  align-items: center;
  border-radius: var(--border-radius-md);
  flex: 1;
  /* justify-content: center; */
`;

const IconContainer = styled.div`
  //Dynamic Colors
  ${({ $color }) =>
    $color === "blue" &&
    css`
      background-color: var(--color-blue-100);
      color: var(--color-blue-700);
    `}
  ${({ $color }) =>
    $color === "green" &&
    css`
      background-color: var(--color-green-100);
      color: var(--color-green-700);
    `}
  ${({ $color }) =>
    $color === "brand" &&
    css`
      background-color: var(--color-brand-100);
      color: var(--color-brand-700);
    `}
  ${({ $color }) =>
    $color === "yellow" &&
    css`
      background-color: var(--color-yellow-100);
      color: var(--color-yellow-700);
    `}


//Common Styles
  width: 5rem;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  font-size: 3rem;
  grid-column: 1/2;
  grid-row: 1/-1;
`;

const Title = styled.span`
  font-size: 1.2rem;
  color: var(--color-grey-400);
  text-transform: uppercase;
  font-weight: 700;
  grid-column: 2/-1;
  grid-row: 1/2;
`;

const Value = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  grid-column: 2/-1;
  grid-row: 2/-1;
  align-self: start;
`;

const StatsBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 1rem 2rem;
`;

const ErrorMessage = styled.span`
  color: var(--color-red-700);
  font-weight: 500;
`;

function StatsItem({ color, icon, title, value, loading, error }) {
  if (loading)
    return (
      <StatsBox>
        <SpinnerMini />
      </StatsBox>
    );

  if (error)
    return (
      <StatsBox>
        <ErrorMessage>{error}</ErrorMessage>
      </StatsBox>
    );

  return (
    <StyledStatsItem>
      <IconContainer $color={color}>{icon}</IconContainer>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStatsItem>
  );
}

export default StatsItem;
