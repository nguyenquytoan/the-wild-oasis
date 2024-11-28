import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
import TodayActivity from "../check-in-out/TodayActivity";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabinList } from "../cabins/useCabinList";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { bookings, isLoadingBookings } = useRecentBookings();
  const { confirmedStays, numDays, isLoadingStays } = useRecentStays();
  const { cabins, isCabinLoading } = useCabinList();

  if (isLoadingBookings || isLoadingStays || isCabinLoading) {
    return <Spinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;