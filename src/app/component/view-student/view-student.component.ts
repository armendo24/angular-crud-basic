import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

interface student {
  id: number;
  fname: string;
  lname: string;
  username: string;
}

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.scss'
})
export class ViewStudentComponent implements OnInit {

  dataStudents: student[] = [] as student[];

  constructor(private api: ApiService) {

  }
  ngOnInit(): void {
    this.getStudent();
  }


  getStudent() {
    this.api.getStudentAll().subscribe((res:student[]) => {
      console.log(res);
      this.dataStudents = res;
    })
  }

  deleteStudent(id: number) {
    if(confirm('คุณต้องการลบข้อมูลนักศึกษานี้ใช่หรือไม่?')) {
      this.api.delete(id.toString()).subscribe({
        next: (res:any) => {
          console.log(res)
          if(res.status){
            this.api.showSuccess('ลบข้อมูลสำเร็จ');
          }else{
            this.api.showWarning(`ลบข้อมูลไม่สำเร็จ ${res?.message}`);
          }
         
          this.getStudent(); // โหลดข้อมูลใหม่หลังจากลบ
        },
        error: (err) => {
          this.api.showError('เกิดข้อผิดพลาดในการลบข้อมูล');
          console.error(err);
        }
      });
    }
  }
}
