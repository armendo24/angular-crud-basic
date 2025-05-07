import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss'
})
export class CreateStudentComponent {
  studentForm!: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) {
 
    this.studentForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.studentForm.valid) {
      // console.log(this.studentForm.value);
      this.api.createStudent(this.studentForm.value).subscribe({
        next: (response: any) => {
          // console.log( response);
          if(response.status){
            this.api.showSuccess("นักศึกษาถูกสร้างเรียบร้อยแล้ว");
            this.studentForm.reset();
          }else{
            this.api.showError(`เกิดข้อผิดพลาดในการสร้างนักศึกษา ${response.message}`);
            console.error('เกิดข้อผิดพลาดในการสร้างนักศึกษา', response);
          }
        },
        error: (error: any) => {
        this.api.showError("เกิดข้อผิดพลาดในการสร้างนักศึกษา");
          // console.error('เกิดข้อผิดพลาดในการสร้างนักศึกษา', error);
        }
      });
    }else{
      this.api.showWarning(`กรุณากรอกข้อมูลให้ครบ`);
    }
  }
}
