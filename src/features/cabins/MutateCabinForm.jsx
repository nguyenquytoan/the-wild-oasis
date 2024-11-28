import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

import { useCabinActions } from "./useCabinActions";

function MutateCabinForm({ cabin = {}, onCloseModal }) {
  const { id: cabinId, ...editValues } = cabin;
  const isEditSession = !!cabinId;
  const oldImageUrl = isEditSession ? cabin.image_url : "";

  const { createCabin, editCabin, isCreating, isEditting } = useCabinActions();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const cabinFormRule = {
    name: {
      required: "This field is required",
    },
    max_capacity: {
      required: "This field is required",
      min: {
        value: 1,
        message: "Capacity must be at least 1",
      },
      max: {
        value: 6,
        message: "Capacity must be at most 10",
      },
    },
    regular_price: {
      required: "This field is required",
      min: {
        value: 0,
        message: "Regular price must be at least 0",
      },
    },
    discount: {
      required: "This field is required",
      validate: (value) => {
        value < Number(getValues()["regular_price"]) ||
          "Discount must be less than Regular price";
      },
    },
    description: {
      required: "This field is required",
    },
    image_url: {
      required: isEditSession ? false : "This field is required",
    },
  };

  const onSubmit = (data) => {
    if (isEditSession) {
      editCabin(
        {
          formData: {
            ...data,
            image_url:
              typeof data.image_url === "string"
                ? data.image_url
                : data.image_url[0],
          },
          cabinId,
          oldImageUrl,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );

      return;
    }

    createCabin(
      { ...data, image_url: data.image_url[0] },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  };

  const onError = (errors) => {
    console.error(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", cabinFormRule.name)}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          {...register("max_capacity", cabinFormRule.max_capacity)}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", cabinFormRule.regular_price)}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", cabinFormRule.discount)}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", cabinFormRule.description)}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image_url?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image_url", cabinFormRule.image_url)}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isEditting}>
          {isEditSession ? "Edit" : "Add"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default MutateCabinForm;
