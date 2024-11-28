import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/ModalCompound";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useCheckoutActions } from "../check-in-out/useCheckoutActions";
import { useBookingActions } from "./useBookingActions";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const BookingRow = ({
  booking: {
    id,
    start_date: startDate,
    end_date: endDate,
    num_nights: numNights,
    total_price: totalPrice,
    status,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  },
}) => {
  const navigate = useNavigate();
  const { deleteBooking, isDeletingBooking } = useBookingActions();
  const { checkout, isCheckingout } = useCheckoutActions();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle id={id} />

        <Menus.List id={id}>
          <Menus.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${id}`)}
          >
            See details
          </Menus.Button>

          {status === "unconfirmed" && (
            <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${id}`)}
            >
              Check in
            </Menus.Button>
          )}

          {status === "checked-in" && (
            <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(id)}
              disabled={isCheckingout}
            >
              Check out
            </Menus.Button>
          )}

          <Modal>
            <Modal.Open opens="delete-booking-confirm">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            <Modal.Window name="delete-booking-confirm">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeletingBooking}
                onConfirm={() => deleteBooking(id)}
              />
            </Modal.Window>
          </Modal>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
};

export default BookingRow;
