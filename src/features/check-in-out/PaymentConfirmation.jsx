import styled from "styled-components";
import CheckBox from "./../../ui/CheckBox";
import useBookingsUpdate from "../bookings/useBookingsUpdate";
import toast from "react-hot-toast";

const StyledPaymnentConfirmation = styled.div`
  padding: 1.5rem 4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
`;

function PaymentConfirmation({ bookingData, amount }) {
  const {
    id,
    guests: { fullName: guestName },
    isPaid,
  } = bookingData;
  // const [isChecked, setIsChecked] = useState(isPaid);
  const { updateBooking, isUpdating } = useBookingsUpdate(id);

  function changeHandler() {
    updateBooking(
      { isPaid: true },
      {
        onSuccess: () => {
          toast.success("Payment Successfully Confirmed");
        },
      }
    );
    // setIsChecked(e.target.value);
  }
  return (
    <StyledPaymnentConfirmation>
      <CheckBox
        disabled={isUpdating || isPaid}
        isChecked={isPaid}
        onChange={changeHandler}
        label={`I confirm that ${guestName} has paid ${amount}.`}
      />
    </StyledPaymnentConfirmation>
  );
}

export default PaymentConfirmation;
