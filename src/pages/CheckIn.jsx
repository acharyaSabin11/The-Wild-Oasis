import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useBookingDataById from "../features/bookings/useBookingDataById";
import SpacedRow from "../ui/SpacedRow";
import Heading from "../ui/Heading";
import SideBySide from "../ui/SideBySide";
import TextButton from "../ui/TextButton";
import { HiArrowLeft } from "react-icons/hi";
import BookingDataBox from "../features/bookings/BookingDataBox";
import Button from "../ui/Button";
import PaymentConfirmation from "../features/check-in-out/PaymentConfirmation";
import useBookingsUpdate from "../features/bookings/useBookingsUpdate";
import toast from "react-hot-toast";
import Addbreakfast from "../features/check-in-out/Addbreakfast";
import { useEffect } from "react";
import { formatPriceBreakdown } from "../utils/helpers";
import Spinner from "../ui/Spinner";
import ErrorPage from "../ui/ErrorPage";
import useSettingsData from "../features/settings/useSettingsData";

const StyledCheckIn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 120rem;
  margin: 0 auto;
`;

function CheckIn() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { bookingData, bookingError, bookingIsLoading } =
    useBookingDataById(id);
  const {
    status: bookingStatus,
    isPaid,
    hasBreakfast,
    totalPrice,
    extrasPrice,
    numGuests,
    cabinPrice,
    numNights,
  } = bookingData;
  const { updateBooking, isUpdating } = useBookingsUpdate(id);
  const {
    settings: { breakfastPrice } = {},
    isLoading: settingIsLoading,
    settingsLoadingError,
  } = useSettingsData();

  useEffect(
    function () {
      if (bookingStatus === "checked-in") {
        navigate(`/booking/${id}`, { replace: true });
      }
    },
    [bookingStatus, id, navigate]
  );

  function checkinHandler() {
    updateBooking(
      { status: "checked-in" },
      {
        onSuccess: () => {
          toast.success(`Successfully Checked In Booking #${id}`);
        },
      }
    );
  }

  if (bookingIsLoading || settingIsLoading) return <Spinner />;

  if (bookingError || settingsLoadingError)
    return <ErrorPage message={bookingError.message} />;

  return (
    <StyledCheckIn>
      <SpacedRow>
        <SideBySide $left={true}>
          <Heading as="h1">CheckIn #{id}</Heading>
        </SideBySide>
        <TextButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <HiArrowLeft />
          <span>Back</span>
        </TextButton>
      </SpacedRow>
      <BookingDataBox
        bookingData={bookingData}
        bookingError={bookingError}
        bookingIsLoading={bookingIsLoading}
      />
      {/* Pay Confirmation */}
      {bookingData.id && bookingStatus !== "checked-in" && (
        <>
          <Addbreakfast bookingData={bookingData} />
          <PaymentConfirmation
            bookingData={bookingData}
            amount={formatPriceBreakdown({
              totalPrice,
              breakfastPrice,
              extrasPrice,
              numGuests,
              cabinPrice,
              numNights,
              hasBreakfast,
            })}
          ></PaymentConfirmation>
        </>
      )}

      <SideBySide>
        {bookingStatus === "unconfirmed" && (
          <Button
            disabled={isUpdating || !isPaid}
            size="medium"
            type="primary"
            onClick={checkinHandler}
          >
            Check In
          </Button>
        )}
        <Button
          size="medium"
          type="secondary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </SideBySide>
    </StyledCheckIn>
  );
}

export default CheckIn;
