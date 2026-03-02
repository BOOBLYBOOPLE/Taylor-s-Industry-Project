import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { globalEnv } from 'src/assets/shared/global-env.component';
import { webService } from 'src/assets/services/webServices';
import { ChatService } from 'src/app/page/chat/chatService.component';

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent implements OnInit{

  users: any[] = [];
  public apiUrl = globalEnv.apiUrl;

  constructor(
    public webService: webService,
    public chatService: ChatService
  ){}
  ngOnInit(): void {
      this.webService.webServiceRetrieve(`${this.apiUrl}/users/all`).subscribe((data : any) =>{
        this.users = data
      });
  }

  selectUser(targetUser: any){
    this.chatService.setCurrentChatUser(targetUser);
  }

}
