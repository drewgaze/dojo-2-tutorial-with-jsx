import { WidgetBase } from "@dojo/widget-core/WidgetBase";
import { tsx } from "@dojo/widget-core/tsx";
import { ThemedMixin, theme } from "@dojo/widget-core/mixins/Themed";
import Button from "@dojo/widgets/button";
import TextInput from "@dojo/widgets/text-input";
import * as css from "../styles/workerForm.m.css";

export interface WorkerFormData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface WorkerFormProperties {
  formData: Partial<WorkerFormData>;
  onFormInput: (data: Partial<WorkerFormData>) => void;
  onFormSave: () => void;
}

export const WorkerFormBase = ThemedMixin(WidgetBase);

@theme(css)
export default class WorkerForm extends WorkerFormBase<WorkerFormProperties> {
  private _onSubmit(event: Event) {
    event.preventDefault();
    this.properties.onFormSave();
  }
  protected onFirstNameInput(firstName: string) {
    this.properties.onFormInput({ firstName });
  }
  protected onLastNameInput(lastName: string) {
    this.properties.onFormInput({ lastName });
  }
  protected onEmailInput(email: string) {
    this.properties.onFormInput({ email });
  }
  protected render() {
    const { formData: { firstName, lastName, email } } = this.properties;

    return (
      <form classes={this.theme(css.workerForm)} onsubmit={this._onSubmit}>
        <fieldset classes={this.theme(css.nameField)}>
          <legend>Name</legend>
          <TextInput
            key="firstNameInput"
            label="First Name"
            labelHidden={true}
            placeholder="First name"
            value={firstName}
            required={true}
            onInput={this.onFirstNameInput}
          />
          <TextInput
            key="lastNameInput"
            label="Last Name"
            labelHidden={true}
            placeholder="Last name"
            value={lastName}
            required={true}
            onInput={this.onLastNameInput}
          />
        </fieldset>
        <TextInput
          label="Email address"
          type="email"
          value={email}
          required={true}
          onInput={this.onEmailInput}
        />
        <Button>Save</Button>
      </form>
    );
  }
}
