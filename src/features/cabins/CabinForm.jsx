import { useForm } from "react-hook-form";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";
import Button from "./../../ui/Button";
import FormError from "../../ui/FormError";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";
import SideBySide from "../../ui/SideBySide";

function CabinForm({ type, cabinToEdit, setEditId, onCLoseModal }) {
  //HOOKS
  //Default values get the cabinToEdit values on editing and none during creation as cabinToEdit is undefined in that case;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinToEdit,
  });
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  // Errors to show on the form
  const { errors } = formState;

  //EVENT HANDLERS
  function createHandler(data) {
    createCabin(data, {
      onSuccess: () => {
        reset();
        onCLoseModal?.();
      },
    });
  }

  function editHandler(data) {
    editCabin(
      { data, previousImage: cabinToEdit.image },
      {
        onSuccess: () => {
          setEditId(null);
          onCLoseModal?.();
        },
      }
    );
  }

  //UI LOGIC
  return (
    <Form
      onSubmit={handleSubmit(type === "edit" ? editHandler : createHandler)}
    >
      <FormRow>
        <label htmlFor="name">Cabin Name</label>
        <Input
          disabled={isCreating || isEditing}
          type="text"
          id="name"
          {...register("name", {
            required: "Name of cabin is required.",
          })}
        />
        {errors?.name?.message && <FormError>{errors.name.message}</FormError>}
      </FormRow>
      <FormRow>
        <label htmlFor="maxCapacity">Maximum Capacity</label>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Cabin's maximum capacity is required.",
          })}
        />
        {errors?.maxCapacity?.message && (
          <FormError>{errors.maxCapacity.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="regularPrice">Regular Price</label>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price of cabin is required.",
          })}
        />
        {errors?.regularPrice?.message && (
          <FormError>{errors.regularPrice.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="discount">Discount</label>
        <Input
          disabled={isCreating || isEditing}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            validate: (value) =>
              Number(value) < Number(getValues().regularPrice) ||
              "Discount should be less than the regular cabin price",
          })}
        />
        {errors?.discount?.message && (
          <FormError>{errors.discount.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="description">Description for website</label>
        <TextArea
          disabled={isCreating || isEditing}
          id="description"
          {...register("description", {
            required:
              "Description of cabin is required to display in the website.",
          })}
        />
        {errors?.description?.message && (
          <FormError>{errors.description.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="image">Cabin Photo</label>
        <FileInput
          disabled={isCreating || isEditing}
          type="file"
          id="image"
          {...register("image")}
        />
        {errors?.image?.message && (
          <FormError>{errors.image.message}</FormError>
        )}
      </FormRow>

      <SideBySide>
        <Button
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
            onCLoseModal?.();
          }}
        >
          Cancel
        </Button>
        <Button type="primary">
          {type === "create" ? "Create Cabin" : "Edit Cabin"}
        </Button>
      </SideBySide>
    </Form>
  );
}

export default CabinForm;
