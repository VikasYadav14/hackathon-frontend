import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, FormsModule, ToastModule, ButtonModule, RippleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiServiceService,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      const payload = this.form.value;
      // this.router.navigate(['/dashboard']);
      this.show();
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
      this.apiService.login(payload).subscribe({
        next: (res: any) => {
          if (res) {
            this.show();
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 5000); // Delay navigation by 5 seconds to allow toast to display
          }
        },
        error: (err) => {
          // this.showError()
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 5000 });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Please check the required fields', life: 5000 });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Occurred', life: 5000 });
  }

}
