import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import { useSettingList } from "./useSettingList";
import { useSettingActions } from "./useSettingActions";

function UpdateSettingsForm() {
  const { settings, isSettingsLoading } = useSettingList();
  const { updateSetting, isEditting } = useSettingActions();

  if (isSettingsLoading) {
    return <Spinner />;
  }

  const handleUpdateField = (e, fieldName) => {
    const { value } = e.target;

    if (!value) {
      return;
    }

    updateSetting({ formData: { [fieldName]: value } });
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditting}
          defaultValue={settings.min_booking_length}
          onBlur={(e) => handleUpdateField(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditting}
          defaultValue={settings.max_booking_length}
          onBlur={(e) => handleUpdateField(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isEditting}
          defaultValue={settings.max_guests_per_booking}
          onBlur={(e) => handleUpdateField(e, "max_guests_per_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isEditting}
          defaultValue={settings.breakfast_price}
          onBlur={(e) => handleUpdateField(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
