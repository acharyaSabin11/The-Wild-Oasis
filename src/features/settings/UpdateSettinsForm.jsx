import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettingsData from "./useSettingsData";
import Spinner from "../../ui/Spinner";
import ErrorPage from "../../ui/ErrorPage";
import useEditSettings from "./useEditSettings";

function UpdateSettinsForm() {
  const { isLoading, settingsLoadingError, settings } = useSettingsData();
  const { isUpdating, updateSetting } = useEditSettings();

  //UI LOGIC
  if (isLoading) return <Spinner />;

  if (settingsLoadingError)
    return <ErrorPage message={settingsLoadingError.message} />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  //EVENT HANDLERS
  function handleUpdate(name, value) {
    const updateObject = {};
    updateObject[name] = value;
    updateSetting(updateObject);
  }

  return (
    <Form>
      <FormRow>
        <label htmlFor="minNightsPerBooking">Minimum nights/booking</label>
        <Input
          type="number"
          id="minNightsPerBooking"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) =>
            handleUpdate("minBookingLength", Number(e.target.value))
          }
          key={Math.random() * 100000}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="maxNightsPerBooking">Maximum nights/booking</label>
        <Input
          type="number"
          id="maxNightsPerBooking"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) =>
            handleUpdate("maxBookingLength", Number(e.target.value))
          }
          key={Math.random() * 100000}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="maxGuestsPerBooking">Maximum guests/booking</label>
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) =>
            handleUpdate("maxGuestsPerBooking", Number(e.target.value))
          }
          key={Math.random() * 100000}
        />
      </FormRow>
      <FormRow>
        <label htmlFor="breakfastPrice">Breakfast Price</label>
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate("breakfastPric", Number(e.target.value))}
          key={Math.random() * 100000}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettinsForm;
