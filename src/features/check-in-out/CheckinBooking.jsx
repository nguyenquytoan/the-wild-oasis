import { useEffect, useState } from "react";
import styled from "styled-components";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetail } from "../bookings/useBookingDetail";
import { formatCurrency } from "../../utils/helpers";
import { useCheckinActions } from "./useCheckinActions";
import { useSettingList } from "../settings/useSettingList";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBookingDetail();
  const { settings, isSettingsLoading } = useSettingList();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid || false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingin } = useCheckinActions();

  if (isLoading || isSettingsLoading) {
    return <Spinner />;
  }

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  const {
    id: bookingId,
    guests,
    total_price: totalPrice,
    num_guests: numGuests,
    num_nights: numNights,
  } = booking;

  const handleCheckin = () => {
    if (!confirmPaid) {
      return;
    }

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
          disabled={isCheckingin}
          id="add"
        >
          Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingin}
          id="confirm"
        >
          I confirm that {guests.full_name} has paid the total amount of{" "}
          {formatCurrency(
            !addBreakfast ? totalPrice : totalPrice + optionalBreakfastPrice
          )}{" "}
          (
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : formatCurrency(totalPrice) +
              formatCurrency(optionalBreakfastPrice)}
          )
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
