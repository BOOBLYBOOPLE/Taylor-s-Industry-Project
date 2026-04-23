import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './page/homepage/homepage.component';
import { SettingpageComponent } from './page/settingpage/settingpage.component';
import { TestPageComponent } from './page/test-page/test-page.component';
import { DialogBoxComponent } from './components/popup-window/dialog-box/dialog-box.component';
import { LoginComponent } from './page/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EmployeeComponent } from './page/employee/employee.component';
import { PayrollComponent } from './page/payroll/payroll.component';
import { RecruitmentComponent } from './page/recruitment/recruitment.component';
import { FormsComponent } from './page/forms/forms.component';
import { CalendarComponent } from './page/calendar/calendar.component';
import { ForgotPasswordWindowComponent } from './components/popup-window/forgot-password-window/forgot-password-window.component';
import { EmployeeAddComponent } from './page/employee/employee-add/employee-add.component';
import { PayrollAddComponent } from './page/payroll/payroll-add/payroll-add.component';
import { LoginRegisterComponent } from './page/login/login-register/login-register.component';
import { EmailComponent } from './page/email/email.component';
import { ChatComponent } from './page/chat/chat.component';
import { ProfileComponent } from './page/profile/profile.component';
import { PayrollViewComponent } from './page/payroll/payroll-view/payroll-view.component';
import { EmailLayoutComponent } from './layout/email-layout/email-layout.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { ChatLayoutComponent } from './layout/chat-layout/chat-layout.component';
import { PayrollFinanceComponent } from './page/payroll-finance/payroll-finance.component';
import { AttendanceComponent } from './page/attendance/attendance.component';
import { LeavesComponent } from './page/leaves/leaves.component';
import { LeavesCreateComponent } from './page/leaves/leaves-create/leaves-create.component';
import { AnalyticsComponent } from './page/analytics/analytics.component';
import { ComplaintsComponent } from './page/complaints/complaints.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from 'src/assets/services/auth.interceptor';
import { CreateComplaintComponent } from './page/complaints/create-complaint/create-complaint.component';
import { LeavesViewComponent } from './page/leaves/leaves-view/leaves-view.component';
import { ViewComplaintComponent } from './page/complaints/view-complaint/view-complaint.component';
import { QuillModule } from 'ngx-quill';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { ViewRecruitmentComponent } from './page/recruitment/view-recruitment/view-recruitment.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CreateRecruitmentComponent } from './page/recruitment/create-recruitment/create-recruitment.component';
import { FormsAddComponent } from './page/forms/forms-add/forms-add.component';
import { FormsViewComponent } from './page/forms/forms-view/forms-view.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ReportBugsComponent } from './components/report-bugs/report-bugs.component';
import { EmailAddComponent } from './page/email/email-add/email-add.component';
import { GridModule, PagerModule } from '@syncfusion/ej2-angular-grids';
import { EmailViewComponent } from './page/email/email-view/email-view.component';
import { PayrollFinanceAddComponent } from './page/payroll-finance/payroll-finance-add/payroll-finance-add.component';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsGraphComponent } from './page/analytics/analytics-graph/analytics-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SettingpageComponent,
    TestPageComponent,
    DialogBoxComponent,
    LoginComponent,
    MainLayoutComponent,
    EmployeeComponent,
    PayrollComponent,
    RecruitmentComponent,
    FormsComponent,
    CalendarComponent,
    ForgotPasswordWindowComponent,
    EmployeeAddComponent,
    PayrollAddComponent,
    LoginRegisterComponent,
    EmailComponent,
    ChatComponent,
    ProfileComponent,
    PayrollViewComponent,
    EmailLayoutComponent,
    ChatLayoutComponent,
    PayrollFinanceComponent,
    AttendanceComponent,
    LeavesComponent,
    LeavesCreateComponent,
    AnalyticsComponent,
    ComplaintsComponent,
    CreateComplaintComponent,
    LeavesViewComponent,
    ViewComplaintComponent,
    ViewRecruitmentComponent,
    CreateRecruitmentComponent,
    FormsAddComponent,
    FormsViewComponent,
    DocumentationComponent,
    ReportBugsComponent,
    EmailAddComponent,
    EmailViewComponent,
    PayrollFinanceAddComponent,
    AnalyticsGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ScrollingModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatGridListModule,
    CanvasJSAngularChartsModule,
    RouterModule.forRoot([]),
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatSnackBarModule,
    MatPseudoCheckboxModule,
    FormsModule,
    QuillModule,
    DatePipe,
    NgxMatTimepickerModule,
    GridModule,
    PagerModule,
    NgbDropdownModule
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
