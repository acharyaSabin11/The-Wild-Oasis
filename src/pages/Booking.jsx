import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SpacedRow from "../ui/SpacedRow";
import Heading from "../ui/Heading";
import { HiArrowLeft } from "react-icons/hi";
import BookingDataBox from "../features/bookings/BookingDataBox";
import SideBySide from "../ui/SideBySide";
import useBookingDataById from "../features/bookings/useBookingDataById";
import BookingStatus from "../ui/BookingStatus";

import Button from "./../ui/Button";
import TextButton from "../ui/TextButton";
import useCheckOut from "../features/check-in-out/useCheckOut";
import useDeleteBooking from "../features/bookings/useDeleteBooking";

const StyledBooking = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 120rem;
  margin: 0 auto;
`;

function Booking() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { bookingData, bookingError, bookingIsLoading } =
    useBookingDataById(bookingId);
  const { checkOut, isCheckingOut } = useCheckOut(bookingId);
  const { deleteBooking, isDeleting } = useDeleteBooking(bookingId);
  const { status: bookingStatus } = bookingData;

  function handleDeleteBooking() {
    deleteBooking(
      {},
      {
        onSuccess: () => {
          navigate("/bookings");
        },
      }
    );
  }

  return (
    <StyledBooking>
      <SpacedRow>
        <SideBySide $left={true}>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <BookingStatus type={bookingStatus}>{bookingStatus}</BookingStatus>
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

      <SideBySide>
        {bookingStatus && (
          <Button
            disabled={isDeleting}
            size="medium"
            type="delete"
            onClick={handleDeleteBooking}
          >
            Delete
          </Button>
        )}
        {bookingStatus === "unconfirmed" && (
          <Button
            size="medium"
            type="primary"
            onClick={() => {
              navigate(`/check-in/${bookingId}`, { replace: true });
            }}
          >
            Check In
          </Button>
        )}
        {bookingStatus === "checked-in" && (
          <Button
            size="medium"
            type="primary"
            disabled={isCheckingOut}
            onClick={checkOut}
          >
            Check Out
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
    </StyledBooking>
  );
}

export default Booking;
