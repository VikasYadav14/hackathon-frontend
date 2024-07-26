import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fileSizeValidator, fileTypeValidator } from '../Custom-validator';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  form: FormGroup;
  aadharFrontPreview: any | ArrayBuffer | null = null;
  aadharBackPreview: any | ArrayBuffer | null = null;
  panPreview: any | ArrayBuffer | null = null;
  photoPreview: any | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiServiceService) {
    this.form = this.fb.group({
      aadharFrontFile: [null, [Validators.required]],
      aadharBackFile: [null, [Validators.required]],
      panFile: [null, [Validators.required]],
      photo: [null, [Validators.required]]
    });
  }

  onFileSelect(event: any, controlName: string) {
    const file = event.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onload = (e) => {
        switch (controlName) {
          case 'aadharFrontFile':
            this.aadharFrontPreview = file;
            debugger;
            break;
          case 'aadharBackFile':
            this.aadharBackPreview = file;
            break;
          case 'panFile':
            this.panPreview = file;
            break;
          case 'photo':
            this.photoPreview = file;
            break;
        }
      // };
      // reader.readAsDataURL(file);

      // Update the form control value
      this.form.patchValue({
        [controlName]: file
      });
      this.form.get(controlName)?.updateValueAndValidity();
    }
  }


  submit() {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      // let file = this.imageChangedEvent.target.files[0];
      let file = '';
      let formData = new FormData();
      formData.append('aadharFront', this.aadharFrontPreview);
      formData.append('aadharBack', this.aadharFrontPreview);
      formData.append('pan', this.panPreview);
      formData.append('photo', this.photoPreview);
      this.apiService.uploadUserData(formData).subscribe((res)=>{
        if(res){
          this.router.navigate(['/user']);
        }
      })
    } else {
      console.log('Form is not valid');
    }
  }

}
