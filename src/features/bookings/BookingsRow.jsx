import styled from "styled-components";
import Table from "./../../ui/Table";
import {
  formatCurrency,
  formatDate,
  formatDistanceFromNow,
} from "../../utils/helpers";
import { HiArrowSmRight, HiMinus, HiTrash } from "react-icons/hi";
import ContextMenu from "../../ui/ContextMenu";
import { useNavigate } from "react-router-dom";
import BookingStatus from "../../ui/BookingStatus";
import { HiArrowDownOnSquare, HiMiniEye } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";

const Guest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  max-width: 100%;
  gap: 0.3rem;
`;

const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Highlight = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;

const Shadow = styled.span`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
`;

const Amount = styled.div`
  font-weight: 600;
  font-family: "sono", "sans-serif";
`;

const Cabin = styled.span`
  font-weight: 600;
  font-size: 1.5rem;
`;

function BookingsRow({ booking }) {
  const navigate = useNavigate();
  const {
    cabins: { name },
    guests: { fullName: guestName, email: guestEmail },
    startDate,
    endDate,
    status,
    totalPrice,
    numNights,
    id,
  } = booking;
  const { checkOut, isCheckingOut } = useCheckOut(Number(id));
  const { deleteBooking, isDeletingBooking } = useDeleteBooking(id);
  return (
    <Table.Row>
      <Cabin>{name}</Cabin>
      <Guest>
        <Highlight>{guestName}</Highlight>
        <Shadow>{guestEmail}</Shadow>
      </Guest>
      <Dates>
        <Highlight>
          {formatDistanceFromNow(startDate)}
          <HiArrowSmRight />
          {`${numNights} Nights Stay`}
        </Highlight>
        <Shadow>
          {formatDate(startDate)}
          <HiMinus />
          {formatDate(endDate)}
        </Shadow>
      </Dates>
      <BookingStatus type={status}>{status}</BookingStatus>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <ContextMenu>
        <ContextMenu.OpenMenu id={id} />
        <ContextMenu.MenuList id={id}>
          <ContextMenu.Button
            onClick={() => {
              navigate(`/booking/${id}`);
            }}
          >
            <HiMiniEye />
            <span>View Details</span>
          </ContextMenu.Button>
          {status === "unconfirmed" && (
            <ContextMenu.Button
              onClick={() => {
                navigate(`/check-in/${id}`);
              }}
            >
              <HiArrowDownOnSquare />
              <span>Check In</span>
            </ContextMenu.Button>
          )}
          {status === "checked-in" && (
            <ContextMenu.Button onClick={checkOut} disabled={isCheckingOut}>
              <HiArrowDownOnSquare />
              <span>Check Out</span>
            </ContextMenu.Button>
          )}

          <ContextMenu.Button
            onClick={deleteBooking}
            disabled={isDeletingBooking}
          >
            <HiTrash />
            <span>Delete</span>
          </ContextMenu.Button>
        </ContextMenu.MenuList>
      </ContextMenu>
    </Table.Row>
  );
}

export default BookingsRow;
