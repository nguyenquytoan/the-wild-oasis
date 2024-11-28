import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";

import MutateCabinForm from "./MutateCabinForm";
import Modal from "../../ui/ModalCompound";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { useCabinActions } from "./useCabinActions";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { id, name, max_capacity, regular_price, discount, image_url } = cabin;

  const { deleteCabin, isDeleting } = useCabinActions();

  const handleDeletecabin = () => {
    deleteCabin(id);
  };

  return (
    <Table.Row>
      <Img src={image_url} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity} guests</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Modal.Open opens="edit-cabin-form">
                <Menus.Button icon={<HiPencil />}>Edit cabin</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete-cabin-confirm">
                <Menus.Button icon={<HiTrash />}>Delete cabin</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="edit-cabin-form">
            <MutateCabinForm cabin={cabin} />
          </Modal.Window>

          <Modal.Window name="delete-cabin-confirm">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={handleDeletecabin}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
