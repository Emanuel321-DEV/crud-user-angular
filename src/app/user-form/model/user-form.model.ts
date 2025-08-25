import { FormArray, FormControl } from "@angular/forms";

// Interface for complete type safety 
export interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  skills: FormArray<FormControl<string>>;
}