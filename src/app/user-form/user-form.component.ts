import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserForm } from './model/user-form.model';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup<UserForm>;
  isSubmitting = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.userForm = this.fb.group<UserForm>({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control<string | null>(null),
      skills: this.fb.array<FormControl<string>>([])
    });
  }
  
  // Getters for easy access
  get skills() {
    return this.userForm.get('skills') as FormArray;
  }
  
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }
  
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // Clear individual form fields
  clearField(fieldName: string) {
    this.userForm.get(fieldName)?.setValue('');
    this.userForm.get(fieldName)?.markAsUntouched();
  }

  // Clear individual skill field
  clearSkillField(index: number) {
    const skillControl = this.skills.at(index);
    skillControl.setValue('');
    skillControl.markAsUntouched();
  }

  // Get form progress percentage for progress bar
  getFormProgress(): number {
    const totalFields = 3; // name, email, phone (skills are optional)
    let filledFields = 0;
    
    if (this.userForm.get('name')?.value) filledFields++;
    if (this.userForm.get('email')?.valid) filledFields++;
    if (this.userForm.get('phone')?.value) filledFields++;
    
    return (filledFields / totalFields) * 100;
  }

  // Get total form errors count
  getFormErrors(): number {
    let errorCount = 0;
    
    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control?.errors && control.touched) {
        errorCount++;
      }
    });
    
    // Count skills errors
    this.skills.controls.forEach(control => {
      if (control.errors && control.touched) {
        errorCount++;
      }
    });
    
    return errorCount;
  }

  async onSubmit() {
    if (this.userForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.userForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form Data:', this.userForm.value);
      alert('Form submitted successfully!');
      
      // Reset form after successful submission
      this.userForm.reset();
      this.skills.clear();
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
