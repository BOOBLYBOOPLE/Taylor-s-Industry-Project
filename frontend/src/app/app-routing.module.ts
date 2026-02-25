import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './page/homepage/homepage.component';
import { SettingpageComponent } from './page/settingpage/settingpage.component';
import { TestPageComponent} from './page/test-page/test-page.component';
import { LoginComponent } from './page/login/login.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { PayrollComponent } from './page/payroll/payroll.component';
import { RecruitmentComponent } from './page/recruitment/recruitment.component';
import { FormsComponent } from './page/forms/forms.component';
import { CalendarComponent } from './page/calendar/calendar.component';
import { EmailComponent } from './page/email/email.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ChatComponent } from './page/chat/chat.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginRegisterComponent } from './page/login/login-register/login-register.component';
import { EmployeeAddComponent } from './page/employee/employee-add/employee-add.component';
import { EmployeeViewComponent } from './page/employee/employee-view/employee-view.component';
import { PayrollAddComponent } from './page/payroll/payroll-add/payroll-add.component';
import { PayrollViewComponent } from './page/payroll/payroll-view/payroll-view.component';
import { EmailLayoutComponent } from './layout/email-layout/email-layout.component';
import { ChatLayoutComponent } from './layout/chat-layout/chat-layout.component';
import { PayrollFinanceComponent } from './page/payroll-finance/payroll-finance.component';
import { AttendanceComponent } from './page/attendance/attendance.component';
import { LeavesComponent } from './page/leaves/leaves.component';
import { LeavesCreateComponent } from './page/leaves/leaves-create/leaves-create.component';
import { AnalyticsComponent } from './page/analytics/analytics.component';
import { ComplaintsComponent } from './page/complaints/complaints.component';
import { LeavesViewComponent } from './page/leaves/leaves-view/leaves-view.component';
import { ViewComplaintComponent } from './page/complaints/view-complaint/view-complaint.component';
import { ViewRecruitmentComponent } from './page/recruitment/view-recruitment/view-recruitment.component';
import { CreateComplaintComponent } from './page/complaints/create-complaint/create-complaint.component';
import { CreateRecruitmentComponent } from './page/recruitment/create-recruitment/create-recruitment.component';
import { authGuard } from 'src/assets/services/authGuard';
import { adminGuard } from 'src/assets/services/adminGuard';
import { FormsViewComponent } from './page/forms/forms-view/forms-view.component';
import { FormsAddComponent } from './page/forms/forms-add/forms-add.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ReportBugsComponent } from './components/report-bugs/report-bugs.component';
import { EmailAddComponent } from './page/email/email-add/email-add.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: LoginRegisterComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[authGuard],
    children: [
      { path: 'home', component: HomepageComponent },
      { path: 'info', component: DocumentationComponent },
      { path: 'report-bugs', component: ReportBugsComponent },
      { path: 'debug', component: TestPageComponent },

      { path: 'employee', component: EmployeeComponent},
      { path: 'employee/add-employee', component: EmployeeAddComponent, canActivate: [adminGuard]},
      { path: 'employee/add-employee/:id', component: EmployeeAddComponent, canActivate: [adminGuard]},
      { path: 'employee/view-employee', component: EmployeeViewComponent },
      { path: 'employee/view-employee/:id', component: EmployeeViewComponent },

      { path: 'payroll', component: PayrollComponent, canActivate: [adminGuard] },
      { path: 'payroll/add-payroll', component: PayrollAddComponent },
      { path: 'payroll/view-payroll', component: PayrollViewComponent },
      { path: 'payroll/view-payroll/:id', component: PayrollViewComponent },
      { path: 'finance', component: PayrollFinanceComponent, canActivate: [adminGuard] },

      { path: 'attendance', component: AttendanceComponent, canActivate: [adminGuard] },
      { path: 'leaves', component: LeavesComponent, canActivate: [adminGuard] },
      { path: 'leaves/create', component: LeavesCreateComponent },
      { path: 'leaves/create/:id', component: LeavesCreateComponent},
      { path: 'leaves/view', component: LeavesViewComponent },
      { path: 'leaves/view/:id', component: LeavesViewComponent},
      { path: 'calendar', component: CalendarComponent },

      { path: 'recruitment', component: RecruitmentComponent, canActivate: [adminGuard] },
      { path: 'recruitment/view-recruitment', component: ViewRecruitmentComponent },
      { path: 'recruitment/create-recruitment', component: CreateRecruitmentComponent },
      { path: 'recruitment/view-recruitment/:id', component: ViewRecruitmentComponent },

      { path: 'forms', component: FormsComponent},
      { path: 'forms/view/:id', component: FormsViewComponent },
      { path: 'forms/add', component: FormsAddComponent },
      { path: 'analytics', component: AnalyticsComponent, canActivate: [adminGuard] },
      { path: 'complaints', component: ComplaintsComponent, canActivate: [adminGuard] },
      { path: 'complaints/add-complaints', component: CreateComplaintComponent },
      { path: 'complaints/view-complaints', component:  ViewComplaintComponent },
      { path: 'complaints/view-complaints/:id', component: ViewComplaintComponent},

      { path: 'settings', component: SettingpageComponent }
    ]
  },
  { path: 'email',
    component: EmailLayoutComponent,
    canActivate: [authGuard],
    children: [
      {path: 'main', component: EmailComponent},
      {path: 'main/compose', component: EmailAddComponent},
      {path: 'main/view', component: EmailAddComponent}
    ]
   },
  { path: 'chat',
    component: ChatLayoutComponent,
    canActivate: [authGuard],
    children: [{path: 'main', component: ChatComponent}]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
