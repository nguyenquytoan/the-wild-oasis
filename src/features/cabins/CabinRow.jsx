import styled from "styled-components";
import { HiPencil, HiTrash } from "react-icons/hi2";

import MutateCabinForm from "./MutateCabinForm";
import Modal from "../../ui/ModalCompound";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { useCabinActions } from "./useCabinActions";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
    <TableRow role="row">
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
          <Modal.Open opens="edit-cabin-form">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit-cabin-form">
            <MutateCabinForm cabin={cabin} />
          </Modal.Window>
        </Modal>

        <Modal>
          <Modal.Open opens="delete-cabin-confirm">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete-cabin-confirm">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={handleDeletecabin}
            />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CabinRow;
