import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";

import { useCheckoutActions } from "./useCheckoutActions";

const CheckoutButton = ({ bookingId }) => {
  const { checkout, isCheckingout } = useCheckoutActions();

  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingout}
      onClick={() => checkout(bookingId)}
    >
      {!isCheckingout ? "Check out" : <SpinnerMini />}
    </Button>
  );
};

export default CheckoutButton;
