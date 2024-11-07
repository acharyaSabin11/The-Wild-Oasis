import styled, { css } from "styled-components";
import ErrorPage from "../../ui/ErrorPage";
import Spinner from "../../ui/Spinner";
import SideBySide from "../../ui/SideBySide";
import { HiOutlineHomeModern } from "react-icons/hi2";
import {
  formatDateFull,
  formatDateWithWeekDay,
  formatDistanceFromNow,
  formatPriceBreakdown,
} from "../../utils/helpers";
import { FaRegCircleDot } from "react-icons/fa6";
import useSettingsData from "../settings/useSettingsData";

const StyledDataBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
`;

const StyledHeader = styled.div`
  padding: 1.5rem 4rem;
  background-color: var(--color-brand-700);
  color: var(--color-brand-100);
  display: flex;
  justify-content: space-between;
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
  gap: 2rem;

  & svg {
    font-size: 3rem;
  }
`;

const StyledBody = styled.div`
  padding: 3rem 4rem 2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;

  & svg {
    font-size: 1rem;
  }
`;

const HighLightText = styled.span`
  font-weight: 700;
  font-size: 1.6rem;

  ${({ $uppercase }) =>
    $uppercase &&
    css`
      text-transform: uppercase;
    `}
  ${({ $lessHighlight }) =>
    $lessHighlight &&
    css`
      font-weight: 600;
      font-size: 1.5rem;
    `}
`;

const ShadowText = styled.span`
  font-weight: 500;
  font-size: 1.5rem;

  ${({ $small }) =>
    $small &&
    css`
      font-size: 1.4rem;
    `}
`;

const CountryFlag = styled.img`
  width: 2.5rem;
  border: 1px solid var(--color-grey-400);
  border-radius: var(--border-radius-tiny);
`;

const StatusBox = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  overflow-wrap: anyway;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-yellow-100);
  color: var(--color-yellow-700);
  ${({ $paid }) =>
    $paid &&
    css`
      background-color: var(--color-green-100);
      color: var(--color-green-700);
    `}
`;

const CurrencySymbol = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1000px;
  border: 2px solid var(--color-yellow-700);
  ${({ $paid }) =>
    $paid &&
    css`
      border: 2px solid var(--color-green-700);
    `}
`;

function BookingDataBox({ bookingData, bookingError, bookingIsLoading }) {
  const {
    startDate,
    endDate,
    created_at,
    cabinPrice,
    extrasPrice,
    isPaid,
    totalPrice,
    numNights,
    numGuests,
    hasBreakfast,
    observations,
    guests: {
      email: guestEmail,
      fullName: guestName,
      nationalID: guestNationalId,
      countryFlag,
    } = {},
    cabins: { name: cabinName } = {},
  } = bookingData;

  const {
    settings,
    isLoading: settingsIsLoading,
    settingsLoadingError,
  } = useSettingsData();

  if (bookingIsLoading || settingsIsLoading) return <Spinner />;

  if (bookingError || settingsLoadingError)
    return (
      <ErrorPage
        message={bookingError?.message || settingsLoadingError.message}
      />
    );

  const { breakfastPrice } = settings;

  return (
    <StyledDataBox>
      {/* Header */}
      <StyledHeader>
        <SideBySide $left={true} $gap="2rem">
          <HiOutlineHomeModern />
          <span>
            {numNights} nights in Cabin {cabinName}
          </span>
        </SideBySide>
        <SideBySide>
          <span>
            {formatDateWithWeekDay(startDate)} (
            {formatDistanceFromNow(startDate)}) -{" "}
            {formatDateWithWeekDay(endDate)}
          </span>
        </SideBySide>
      </StyledHeader>
      {/* Body */}
      <StyledBody>
        {/* UserDetail */}
        <SideBySide $left={true}>
          <CountryFlag src={countryFlag} />
          <HighLightText>
            {guestName} {numGuests - 1 ? ` + ${numGuests - 1} guests` : null}
          </HighLightText>
          <FaRegCircleDot />
          <ShadowText>{guestEmail}</ShadowText>
          <FaRegCircleDot />
          <ShadowText>National ID {guestNationalId}</ShadowText>
        </SideBySide>
        {/* Observations */}
        {observations && (
          <SideBySide $left={true}>
            <HighLightText>Observations:</HighLightText>
            <HighLightText $lessHighlight={true}>{observations}</HighLightText>
          </SideBySide>
        )}

        {/* Breakfast */}
        <SideBySide $left={true}>
          <HighLightText>Breakfast Included?</HighLightText>
          <HighLightText $lessHighlight={true}>
            {hasBreakfast ? "Yes" : "No"}
          </HighLightText>
        </SideBySide>
        <StatusBox $paid={isPaid}>
          <SideBySide $left={true}>
            <CurrencySymbol $paid={isPaid}>$</CurrencySymbol>
            <HighLightText>Total Price</HighLightText>
            <ShadowText>
              {formatPriceBreakdown({
                totalPrice,
                breakfastPrice,
                extrasPrice,
                hasBreakfast,
                numGuests,
                cabinPrice,
                numNights,
              })}
            </ShadowText>
          </SideBySide>
          <HighLightText $uppercase={true}>
            {isPaid ? "Paid" : "Will pay at property"}
          </HighLightText>
        </StatusBox>
        <SideBySide>
          <ShadowText $small={true}>
            Booked {formatDateFull(created_at)}
          </ShadowText>
        </SideBySide>
      </StyledBody>
    </StyledDataBox>
  );
}

export default BookingDataBox;
