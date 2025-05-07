import { Routes } from '@angular/router';
import { CreateStudentComponent } from './component/create-student/create-student.component';
import { ViewStudentComponent } from './component/view-student/view-student.component';
import { HomeComponent } from './component/home/home.component';
import { UpdateStudentComponent } from './component/update-student/update-student.component';

export const routes: Routes = [
    {
        path:'' , component:HomeComponent
    },
    {
        path:'create' , component:CreateStudentComponent
    },
    {
        path:'view' , component:ViewStudentComponent
    },
    {
        path:'edit-student' , component:UpdateStudentComponent
    }
];
