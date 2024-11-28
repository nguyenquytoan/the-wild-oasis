import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

const CabinTableOperations = () => {
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "No discount", value: "no-discount" },
    { label: "With discount", value: "with-discount" },
  ];

  const sortByOptions = [
    { value: "name-asc", label: "Sort by name (A-Z)" },
    { value: "name-desc", label: "Sort by name (Z-A)" },
    { value: "regular_price-asc", label: "Sort by price (low first)" },
    { value: "regular_price-desc", label: "Sort by price (high first)" },
    { value: "max_capacity-asc", label: "Sort by capacity (low first)" },
    { value: "max_capacity-desc", label: "Sort by capacity (high first)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="discount" options={filterOptions} />
      <SortBy options={sortByOptions} />
    </TableOperations>
  );
};

export default CabinTableOperations;
