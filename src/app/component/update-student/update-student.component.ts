import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.scss'
})
export class UpdateStudentComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number = 0;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      // password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.studentId = +params['id'];
      if (this.studentId) {
        this.api.getStudentById(this.studentId).subscribe((student:any) => {
          console.log(student)
          this.studentForm.patchValue(student?.data);
        });
      } else {
        this.router.navigate(['/view']);
      }
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      return;
        this.api.updateStudent(this.studentForm.value).subscribe({
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
}
