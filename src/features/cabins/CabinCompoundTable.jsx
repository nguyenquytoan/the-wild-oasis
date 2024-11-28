import { useSearchParams } from "react-router-dom";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CabinRow from "./CabinCompoundRow";
import Spinner from "../../ui/Spinner";

import { useCabinList } from "./useCabinList";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { cabins, isCabinLoading } = useCabinList();
  const [searchParams] = useSearchParams();

  if (isCabinLoading) {
    return <Spinner />;
  }

  if (!cabins) {
    return <Empty resource="cabins" />;
  }

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  const sortBy = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (firstCabin, secondCabin) =>
      (firstCabin[field] - secondCabin[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
