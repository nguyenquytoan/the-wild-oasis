import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

import { useBookingList } from "./useBookingList";

const BookingTable = () => {
  const { bookings, count, isBookingLoading } = useBookingList();

  if (isBookingLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resource="bookings" />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;