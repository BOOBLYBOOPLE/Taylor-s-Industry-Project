import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/assets/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
})
export class LoginRegisterComponent implements OnInit{
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService){}

    public registerForm!: FormGroup;

    ngOnInit(): void {
        this.registerForm = this.fb.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          email: [''],
          role: ['user', Validators.required]
        })
    }

    public register(){
      if(!this.registerForm.invalid){
        this.auth.register(this.registerForm.value).subscribe({
          next: responseData => {
            alert('Success');
            this.router.navigate(['/login']);
          }, error: error => {
            alert('Failed');
          }
        });
      }
    }

  goBack(){
    this.router.navigate(['login'])
  }
}
