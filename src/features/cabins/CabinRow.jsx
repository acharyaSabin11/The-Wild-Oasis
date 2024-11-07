import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CabinForm from "./CabinForm";
import useCabinDelete from "./useCabinsDelete";
import {
  HiOutlineDocumentDuplicate,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import Table from "../../ui/Table";
import ContextMenu from "../../ui/ContextMenu";

//Styled Components
const Img = styled.img`
  height: 5rem;
  object-fit: contain;
`;

const Cabin = styled.span`
  font-weight: 700;
`;

const Price = styled.span`
  font-weight: 700;
`;

const Discount = styled.span`
  font-weight: 700;
  color: var(--color-green-700);
`;

//Table Row Component
function CabinRow({ cabin, setEditId }) {
  //HOOKS
  const { deleteCabin, isDeleting } = useCabinDelete();
  const { isCreating, createCabin } = useCreateCabin();

  //DESTRUCTURING
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;

  //Event Handlers
  function handleDelete(onCloseModal) {
    deleteCabin(id, {
      onError: () => {
        onCloseModal();
      },
    });
  }

  function handleDuplicate(closeMenu) {
    createCabin(
      {
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
      {
        onSuccess: () => {
          closeMenu?.();
        },
      }
    );
  }

  //UI LOGIC
  return (
    <Table.Row>
      <Img src={image} alt="cabin-image" />
      <Cabin>{name}</Cabin>
      <span>Suitable for upto {maxCapacity} guests</span>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <Modal>
        <ContextMenu>
          <ContextMenu.OpenMenu id={id} />
          <ContextMenu.MenuList id={id}>
            <ContextMenu.Button
              disabled={isDeleting || isCreating}
              onClick={handleDuplicate}
            >
              <HiOutlineDocumentDuplicate />
              <span>Duplicate</span>
            </ContextMenu.Button>

            <Modal.OpenModal name="edit-cabin">
              <ContextMenu.Button>
                <HiOutlinePencil />
                <span>Edit</span>
              </ContextMenu.Button>
            </Modal.OpenModal>

            <Modal.OpenModal name="confirm-delete">
              <ContextMenu.Button>
                <HiOutlineTrash />
                <span>Delete</span>
              </ContextMenu.Button>
            </Modal.OpenModal>
          </ContextMenu.MenuList>
        </ContextMenu>

        <Modal.Window name="edit-cabin">
          <CabinForm type="edit" cabinToEdit={cabin} setEditId={setEditId} />
        </Modal.Window>

        <Modal.Window name="confirm-delete">
          <ConfirmAction
            actionOnConfirm={handleDelete}
            confirmText="Are you sure to delete cabin permanently?"
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default CabinRow;
