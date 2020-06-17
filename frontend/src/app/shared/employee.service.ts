import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  // readonly baseURL = 'http://localhost:3000/docs';

  constructor(private http : HttpClient) { }

  postEmployee(emp : Employee) {
    return this.http.post('http://localhost:3000/docs', emp);
  }

  getEmployeeList() {
    return this.http.get('http://localhost:3000/docs');
  }

  putEmployee(emp: Employee) {
    return this.http.put('http://localhost:3000/docs' + `/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete('http://localhost:3000/docs' + `/${_id}`);
  }
}
