import Button from "../../ui/Button.jsx";
import Modal from "../../ui/ModalCompound.jsx";
import MutateCabinForm from "./MutateCabinForm.jsx";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="add-cabin-form">
          <MutateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;
