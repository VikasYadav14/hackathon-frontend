import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-user-information',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './user-information.component.html',
  styleUrl: './user-information.component.scss'
})
export class UserInformationComponent {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private apiService: ApiServiceService
  ) { }

  ngOnInit(): void {
    console.log(this.apiService.userdetails);
    this.setFormState(this.apiService.userdetails.employeData)
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched()
    }
  }

  setFormState(formData?: any): void {
    const data = {
      fullName: null,
      fatherName: null,
      gender: null,
      email: null,
      dob: null,
      phoneNumber: null,
      address: null,
      aadhaar: null,
      pan: null,
    }
    formData.forEach((element: any) => {
      if (element?.employeeName) !data.fullName ? data.fullName = element.employeeName : null
      if (element.fatherName) !data.fatherName ? data.fatherName = element.fatherName : null
      if (element.gender) !data.gender ? data.gender = element.gender : null
      if (element.DOB) !data.dob ? data.dob = element.DOB : null
      if (element.mobileNumber) !data.phoneNumber ? data.phoneNumber = element.mobileNumber : null
      if (element.aadharNumber) !data.aadhaar ? data.aadhaar = element.aadharNumber : null
      if (element.PANNumber) !data.pan ? data.pan = element.PANNumber : null
      if (element.employeeAddress) !data.address ? data.address = element.employeeAddress : null
    });
    console.log(data);
    this.userForm = this.fb.group({
      fullName: [formData ? data.fullName : null, Validators.required],
      fatherName: [formData ? data.fatherName : null, Validators.required],
      gender: [formData ? data.gender : null, Validators.required],
      email: [formData ? `${data.fullName}@gmail.com` : null, [Validators.required, Validators.email]],
      dob: [formData ? data.dob : null, Validators.required],
      phoneNumber: [formData ? data.phoneNumber : null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      aadhaar: [formData ? data.aadhaar : null, Validators.required],
      pan: [formData ? data.pan : null, Validators.required],
      address: [formData ? data.address : null, Validators.required]
    });
  }

}
