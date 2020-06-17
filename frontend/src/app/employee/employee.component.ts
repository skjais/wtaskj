import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      id: null,
      name: "",
      remarks: ""
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
      console.log(this.employeeService.employees);
    });
  }

  onSubmit(form: NgForm) {
    //M.toast({ html: `_ID VAL: ${form.value._id}` });
    
    if (form.value._id == "" || form.value._id == null)
    {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: "Employee Appraisal Submitted!" });
      }, (err) => {
        M.toast({ html: "Invalid!" });
      });
    }
    else
    {
      if (confirm('Are you sure you want to update this record?') == true)
      {
        this.employeeService.putEmployee(form.value).subscribe((res) => {
          this.resetForm(form);
          this.refreshEmployeeList();
          M.toast({ html: "Employee Appraisal Updated!" });
        }, (err) => {
          M.toast({ html: "Invalid!" });
        });
      }
    }
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee._id = emp._id;
    this.employeeService.selectedEmployee.id = emp.id;
    this.employeeService.selectedEmployee.name = emp.name;
    this.employeeService.selectedEmployee.remarks = emp.remarks;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete this record?') == true)
    {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: "Employee Appraisal Deleted!" });
      });
    }
  }
}
