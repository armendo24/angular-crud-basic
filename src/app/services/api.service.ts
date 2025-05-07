import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { student } from './interface.service';

 

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  private API_URL:string = `http://localhost/student-api`;

  // Function สำหรับแสดง alert
  showSuccess(message: string) {
    this.toastr.success(message, 'สำเร็จ');
  }

  showError(message: string) {
    this.toastr.error(message, 'เกิดข้อผิดพลาด');
  }

  showInfo(message: string) {
    this.toastr.info(message, 'ข้อมูล');
  }

  showWarning(message: string) {
    this.toastr.warning(message, 'คำเตือน');
  }


  createStudent(data: any) {
    return this.http.post(`${this.API_URL}/create-student.php`, data);
  }

  getStudentAll(): Observable<student[]> {
    return this.http.get<student[]>(`${this.API_URL}/get-student.php`);
  }

  getStudentById(id: number | string) {
    return this.http.get(`${this.API_URL}/get-student-by-id.php/?id=${id}`);
  }

  updateStudent(id: string| number, data: any) {
    return this.http.put(`${this.API_URL}/update-student.php?id=${id}`, data);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.API_URL}/delete-student.php?id=${id}`);
  }
}
