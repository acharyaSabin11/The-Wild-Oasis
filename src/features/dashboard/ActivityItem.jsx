import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import useCheckOut from "../check-in-out/useCheckOut";
import useCheckIn from "../check-in-out/useCheckIn";

const StyledActivityItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  overflow-wrap: anywhere;
  border-bottom: 1px solid var(--color-grey-300);
  width: 100%;
  height: 5rem;
  max-height: 5rem;
  align-items: center;
  justify-content: center;
  column-gap: 2rem;
`;

const ActivityStatus = styled.div`
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
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
    prop.type === "unconfirmed" &&
    css`
      color: var(--color-blue-700);
      background-color: var(--color-blue-100);
      border: 1px solid var(--color-blue-700);
    `}
`;

const UserInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CountryFlag = styled.img`
  width: 2.5rem;
  border: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-tiny);
`;

function ActivityItem({ activity }) {
  const {
    id,
    status,
    guests: { countryFlag, fullName },
    numNights,
  } = activity;
  const { checkOut, isCheckingOut } = useCheckOut(id);
  const { checkIn, isCheckingIn } = useCheckIn(id);
  return (
    <StyledActivityItem key={id}>
      <ActivityStatus type={status}>
        {status === "unconfirmed" && "Arriving"}
        {status === "checked-in" && "Departing"}
      </ActivityStatus>
      <UserInfo>
        <CountryFlag src={countryFlag} />
        <span>{fullName}</span>
      </UserInfo>
      <span>{numNights} nights</span>
      <Button
        type="primary"
        size="small"
        disabled={isCheckingIn || isCheckingOut}
        onClick={status === "checked-in" ? checkOut : checkIn}
      >
        {status === "unconfirmed" && "Check-In"}
        {status === "checked-in" && "Check-Out"}
      </Button>
    </StyledActivityItem>
  );
}

export default ActivityItem;
