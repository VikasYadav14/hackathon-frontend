import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dropdownOpen = false;

  constructor(
    private router: Router,
  ) {}

  deleteEmployee(Id: Number) {
    console.log(Id)
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
    alert('Employee saved');
    $('#exampleModalCenter').modal('hide');
  }

  close() {
    $('#exampleModalCenter').modal('hide');
  }

  redirectToStatus() {
    this.router.navigate(['/home']);
  }

}
