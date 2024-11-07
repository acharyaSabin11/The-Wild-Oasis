import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUpdateUser from "./useUpdateUser";
import FormError from "../../ui/FormError";
import SideBySide from "../../ui/SideBySide";
import Button from "../../ui/Button";

function UpdatePasswordForm() {
  const { updateUser, isUpdating } = useUpdateUser();
  const { handleSubmit, register, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function submitHandler({ password }) {
    updateUser(
      { password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormRow>
        <label htmlFor="password">New Password (8 Characters Minimum)</label>
        <Input
          type="password"
          id="oldPassword"
          {...register("password", {
            required: "Enter your new password",
            validate: (value) =>
              value.length >= 8 ||
              "Password must be at least 8 characters long",
          })}
        />
        {errors?.password?.message && (
          <FormError>{errors.password.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="confirmPassword">Re-type Password</label>
        <Input
          disabled={isUpdating}
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Compulsory to confirm password",
            validate: (value) =>
              value === getValues().password || "Passwords didn't match",
          })}
        />
        {errors?.confirmPassword?.message && (
          <FormError>{errors.confirmPassword.message}</FormError>
        )}
      </FormRow>

      <SideBySide>
        <Button
          disabled={isUpdating}
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating} type="primary">
          Change Password
        </Button>
      </SideBySide>
    </Form>
  );
}

export default UpdatePasswordForm;
