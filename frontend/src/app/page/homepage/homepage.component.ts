import { Component } from '@angular/core';
import { AuthService } from 'src/assets/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
})
export class HomepageComponent {
  isAdmin = false;
  constructor(private auth: AuthService){
    this.isAdmin = this.auth.getRole() === 'admin';
  }
}
