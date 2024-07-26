import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
declare var $: any;
export interface Employee {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  status: boolean;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgClass, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [MessageService]
})
export class DashboardComponent {
  submitForm!: FormGroup
  dropdownOpen = false;
  employees:Employee[] = []

  constructor(
    private router: Router,
    private apiService: ApiServiceService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.submitForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getUserData();
    
  }

  deleteEmployee(id: number) {
    // this.employees = this.employees.filter(emp => emp.id !== id);
  }

  logout() {
    this.router.navigate(['/']);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  addEmployee() {
    $('#exampleModalCenter').modal('show');
  }

  saveEmployee() {
    const payload = {
       email: this.submitForm.value.email ,
       password:"",
       fullname: this.submitForm.value.fullName,
       phone: this.submitForm.value.phone
    }
    this.apiService.postUserData(payload).subscribe((res) => {
      if (res) {
        this.employees = res;
        this.getUserData();
        this.show()
      }
    });
   
    $('#exampleModalCenter').modal('hide');
  }

  close() {
    $('#exampleModalCenter').modal('hide');
  }

  redirectToStatus() {
    this.router.navigate(['/home']);
  }

  getUserData() {
    this.apiService.getUserData().subscribe((res) => {
      if (res) {
        this.employees = res;
      }
    })
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successful', life: 5000 });
  }

}
