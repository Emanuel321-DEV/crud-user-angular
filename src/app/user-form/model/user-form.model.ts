import { FormArray, FormControl } from "@angular/forms";

export interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  skills: FormArray<FormControl<string>>;
}