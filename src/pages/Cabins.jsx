import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTableOperations from "../features/cabins/CabinTableOperations.jsx";
import CabinTable from "../features/cabins/CabinCompoundTable.jsx";
import AddCabin from "../features/cabins/AddCabin.jsx";

const Cabins = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
