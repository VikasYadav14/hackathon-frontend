import { Component, HostListener } from '@angular/core';
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

  deleteEmployee(Id: Number) {
    console.log(Id)
  }

  logout() {
    //
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

}
