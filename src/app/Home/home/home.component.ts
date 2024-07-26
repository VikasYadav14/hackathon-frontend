import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fileSizeValidator, fileTypeValidator } from '../Custom-validator';
import { ApiServiceService } from '../services/api-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  form!: FormGroup;
  aadharFrontPreview :any = {
    file:null,
    preview:null
  }
  aadharBackPreview:any = {
    file:null,
    preview:null
  }
  panPreview:any = {
    file:null,
    preview:null
  }
  photoPreview:any = {
    file:null,
    preview:null
  }
  loading: boolean = false;
  aadharFrontPreviewHtml: any | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiServiceService) {
  }

  ngOnInit(): void {
    this.setFormsState();
  }

  setFormsState(){
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
      const reader = new FileReader();
      reader.onload = (e) => {
      switch (controlName) {
        case 'aadharFrontFile':
          this.aadharFrontPreview.file = file;
          this.aadharFrontPreview.preview = e?.target?.result;;
          break;
        case 'aadharBackFile':
          this.aadharBackPreview.file = file;
          this.aadharBackPreview.preview = e?.target?.result;
          break;
        case 'panFile':
          this.panPreview.file = file;
          this.panPreview.preview = e?.target?.result;
          break;
        case 'photo':
          this.photoPreview.file = file;
          this.photoPreview.preview = e?.target?.result;
          break;
      }
      };
      reader.readAsDataURL(file);

      // Update the form control value
      this.form.patchValue({
        [controlName]: file
      });
      this.form.get(controlName)?.updateValueAndValidity();
    }
  }


  submit() {
    if (this.form.valid) {
      this.loading = true;
      const formData = new FormData();
      formData.append('images', this.aadharFrontPreview.file);
      formData.append('images', this.aadharBackPreview.file);
      formData.append('images', this.panPreview.file);
      formData.append('images', this.photoPreview.file);

      this.apiService.uploadUserData(formData).subscribe((res) => {
        if (res) {
          this.apiService.userdetails = res;
          this.loading = false;
          this.router.navigate(['/user']);
        }
      })
    } else {
      console.log('Form is not valid');
    }
  }

}
