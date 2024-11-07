import Table from "./../../ui/Table";
import useBookingsData from "./useBookingsData";
import Spinner from "./../../ui/Spinner";
import ErrorPage from "./../../ui/ErrorPage";
import BookingsRow from "./BookingsRow";
import Pagination from "../../ui/Pagination";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

function BookingsTable() {
  const { isLoading, bookingsData, bookingsLoadingError, count } =
    useBookingsData();

  if (isLoading) return <Spinner />;

  if (bookingsLoadingError)
    return <ErrorPage message={bookingsLoadingError.message} />;

  return (
    <Table columns="1fr 2fr 3fr 1fr 1fr 50px">
      <Table.Header>
        <span>Cabin</span>
        <span>Guest</span>
        <span>Dates</span>
        <span>Status</span>
        <span>Amount</span>
        <span></span>
      </Table.Header>
      <Table.Body
        data={bookingsData}
        render={(booking) => <BookingsRow booking={booking} key={booking.id} />}
      />
      <Table.Footer>
        <Pagination count={count}>
          <Pagination.Info start={1} end={10} />
          <Pagination.Trailing>
            <Pagination.PaginationButton type="prev">
              <HiArrowLeft />
              Prev
            </Pagination.PaginationButton>
            <Pagination.PaginationButton type="next">
              <span>Next</span>
              <HiArrowRight />
            </Pagination.PaginationButton>
          </Pagination.Trailing>
        </Pagination>
      </Table.Footer>
    </Table>
  );
}

export default BookingsTable;
