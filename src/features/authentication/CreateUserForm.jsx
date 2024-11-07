import { useForm } from "react-hook-form";
import FormError from "../../ui/FormError";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import SideBySide from "../../ui/SideBySide";
import Button from "../../ui/Button";
import useSignUp from "./useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

function CreateUserForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { signUp, isSigningUp } = useSignUp();
  const { errors } = formState;
  function submitHandler({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
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
        <label htmlFor="name">Full Name</label>
        <Input
          disabled={isSigningUp}
          type="text"
          id="name"
          {...register("fullName", {
            required: "Email address is required",
            validate: (value) => {
              return (
                (value.split(" ").length >= 2 &&
                  value.split(" ").slice(-1)[0].length !== 0) ||
                "Please Enter your Full Name"
              );
            },
          })}
        />
        {errors?.fullName?.message && (
          <FormError>{errors.fullName.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="Email">Email address</label>
        <Input
          disabled={isSigningUp}
          type="text"
          id="Email"
          {...register("email", {
            required: "Email address is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please Provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && (
          <FormError>{errors.email.message}</FormError>
        )}
      </FormRow>
      <FormRow>
        <label htmlFor="Password">Password (8 characters minimum)</label>
        <Input
          disabled={isSigningUp}
          type="password"
          id="Password"
          {...register("password", {
            required: "Password is required.",
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
        <label htmlFor="confirmPassword">Retype Password</label>
        <Input
          disabled={isSigningUp}
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Required to confirm password",
            validate: (value) =>
              value === getValues().password || "The passwords didn't match",
          })}
        />
        {errors?.confirmPassword?.message && (
          <FormError>{errors.confirmPassword.message}</FormError>
        )}
      </FormRow>

      {/* ACTION BUTTONS */}
      <SideBySide>
        <Button
          type="secondary"
          onClick={(e) => {
            e.preventDefault();
            reset();
          }}
        >
          Cancel
        </Button>
        <Button type="primary">
          {isSigningUp ? <SpinnerMini /> : "Create User"}
        </Button>
      </SideBySide>
    </Form>
  );
}

export default CreateUserForm;
