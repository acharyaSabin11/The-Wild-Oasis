import Form from "../../ui/Form";
import FormError from "../../ui/FormError";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useUser from "./useUser";
import FileInput from "../../ui/FileInput";
import SideBySide from "../../ui/SideBySide";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUpdateUser from "./useUpdateUser";

function UpdateUserForm() {
  const {
    user: { user },
  } = useUser();

  const [fullName, setFullName] = useState(user.user_metadata.fullName);
  const [avatar, setAvatar] = useState(null);

  function reset() {
    setFullName(user.user_metadata.fullName);
    setAvatar(null);
  }
  const [errors, setErrors] = useState({});
  const { updateUser, isUpdating } = useUpdateUser();

  //For Form Validation
  useEffect(
    function () {
      function validateInputs() {
        if (!fullName) {
          setErrors((errors) => ({ ...errors, fullName: "Name is Required" }));
        } else if (
          fullName.split(" ").length < 2 ||
          fullName.split(" ").slice(-1)[0].length === 0
        ) {
          setErrors((errors) => ({
            ...errors,
            fullName: "Please Enter Your Full Name",
          }));
        } else {
          setErrors((errors) => {
            const newErrObj = { ...errors };
            delete newErrObj.fullName;
            return newErrObj;
          });
        }
      }
      validateInputs();
    },
    [fullName]
  );

  function submitHandler(e) {
    e.preventDefault();
    if (!Object.values(errors).length) {
      if (fullName !== user.user_metadata.fullName || avatar) {
        updateUser(
          { fullName, avatar },
          {
            onError: () => {
              reset();
            },
          }
        );
      } else {
        toast.error("No Changes to Update");
      }
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      <FormRow>
        <label htmlFor="Email">Email Address</label>
        <Input
          disabled={true}
          type="text"
          id="Email"
          defaultValue={user.user_metadata.email}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="name">Full Name</label>
        <Input
          disabled={isUpdating}
          type="text"
          id="name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
        />
        {errors?.fullName && <FormError>{errors.fullName}</FormError>}
      </FormRow>
      <FormRow>
        <label htmlFor="avatar">Cabin Photo</label>
        <FileInput
          disabled={isUpdating}
          type="file"
          id="avatar"
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
        />
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
          Edit User
        </Button>
      </SideBySide>
    </Form>
  );
}

export default UpdateUserForm;
