import styled from "styled-components";
import CheckBox from "../../ui/CheckBox";
import useBookingsUpdate from "../bookings/useBookingsUpdate";
import toast from "react-hot-toast";

const StyledAddBreakfast = styled.div`
  padding: 1.5rem 4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
`;

function Addbreakfast({ bookingData }) {
  const { id, hasBreakfast } = bookingData;

  const { updateBooking, isUpdating } = useBookingsUpdate(id);

  function changeHandler(e) {
    updateBooking(
      { isPaid: false, hasBreakfast: e.target.checked },
      {
        onError: () => {
          toast.error("Couldn't add breakfast");
        },
        onSuccess: () => {
          if (e.target.value) {
            toast.success("Breakfast Added Successfully");
          } else {
            toast.success("Breakfast Removed Successfully");
          }
        },
      }
    );
  }
  return (
    <StyledAddBreakfast>
      <CheckBox
        disabled={isUpdating}
        isChecked={hasBreakfast}
        onChange={changeHandler}
        label="Add Breakfast?"
      />
    </StyledAddBreakfast>
  );
}

export default Addbreakfast;
