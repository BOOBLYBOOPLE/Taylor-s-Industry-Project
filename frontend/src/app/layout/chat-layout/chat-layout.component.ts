import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { webService } from 'src/assets/services/webServices';
import { ChatService } from 'src/app/page/chat/chatService.component';
import { AuthService } from 'src/assets/services/auth.service';
import { ReportBugsComponent } from 'src/app/components/report-bugs/report-bugs.component';
import { DocumentationComponent } from 'src/app/components/documentation/documentation.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})

export class ChatLayoutComponent implements OnInit{

  users: any[] = [];
  public apiUrl = globalEnv.apiUrl;
  public activeChatUserId: string | null = null;

  constructor(
    public webService: webService,
    public chatService: ChatService,
    public authService: AuthService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.webService.webServiceRetrieve(`${this.apiUrl}/users/all`).subscribe((data : any) =>{
      this.users = data
    });

    const myId = this.authService.getUserId();
    this.chatService.socket.emit('register-user', myId);
  }

  selectUser(targetUser: any){
    this.activeChatUserId = targetUser._id;
    this.chatService.clearCount(targetUser._id);
    this.chatService.setCurrentChatUser(targetUser);
  }

  openReport(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(ReportBugsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('67');
    });
  }

  openInfo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'mat-dialog-panel';
    const dialogRef = this.dialog.open(DocumentationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('69');
    });
  }

}
