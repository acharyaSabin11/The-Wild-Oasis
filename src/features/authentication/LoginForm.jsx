import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import FormError from "../../ui/FormError";
import styled from "styled-components";
import FormRowVertical from "../../ui/FormRowVertical";
import useLogin from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledLoginForm = styled.form`
  width: 50rem;
  background-color: var(--color-grey-0);
  padding: 4rem 5rem 6rem 5rem;
`;

function LoginForm() {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const { login, isLoggingIn } = useLogin();
  function submitHandler(data) {
    login(data, {
      onError: () => {
        reset();
      },
    });
  }

  return (
    <StyledLoginForm onSubmit={handleSubmit(submitHandler)}>
      <FormRowVertical>
        <label htmlFor="Email">Email Address</label>
        <Input
          disabled={isLoggingIn}
          type="text"
          id="Email"
          {...register("email", {
            required: "Email address is required",
          })}
        />
        {errors?.email?.message && (
          <FormError>{errors.email.message}</FormError>
        )}
      </FormRowVertical>
      <FormRowVertical>
        <label htmlFor="Password">Password</label>
        <Input
          disabled={isLoggingIn}
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
      </FormRowVertical>
      <Button disabled={isLoggingIn} type="primary" size="fullWidth">
        {isLoggingIn ? <SpinnerMini /> : "Login"}
      </Button>
    </StyledLoginForm>
  );
}

export default LoginForm;
