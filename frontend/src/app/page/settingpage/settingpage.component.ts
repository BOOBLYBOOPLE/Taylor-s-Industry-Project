import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { webService } from 'src/assets/services/webServices';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-settingpage',
  templateUrl: './settingpage.component.html',
  styleUrls: ['./settingpage.component.css']
})
export class SettingpageComponent {

  public apiUrl = globalEnv.apiUrl + '/users/change-password';

  settings = {
    darkMode: false,
    compactMode: false,
  };

  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  hide = true;
  hide1 = true;
  hide2 = true;
  constructor(private snackBar: MatSnackBar, private web: webService) {}

  toggleTheme() {
    if (this.settings.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  saveSettings() {
    console.log('Saving settings:', this.settings);
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
  }

  updatePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      this.showSnack('New passwords do not match');
      return;
    }

    if (!this.passwordData.currentPassword || !this.passwordData.newPassword) {
      this.showSnack('Please fill in all fields');
      return;
    }

    const payload = {
      currentPassword: this.passwordData.currentPassword,
      newPassword: this.passwordData.newPassword
    };

    this.web.webServiceUpdate(this.apiUrl, payload)
      .subscribe({
        next: (res: any) => {
          this.showSnack(res.message);
          this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        },
        error: (err) => {
          this.showSnack(err.error.message || 'Error updating password');
        }
      });
  }

  private showSnack(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
  }
}
