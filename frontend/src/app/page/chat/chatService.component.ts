import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChatService {

  public socket! : Socket;
  private selectedUserSource = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSource.asObservable();

  private unreadCounts = new BehaviorSubject< { [ key: string ]: number } >({});
  unreadCounts$ = this.unreadCounts.asObservable();

  constructor() {
    this.socket = io('http://localhost:5000');
    this.setupNotificationListener();
  }

  private setupNotificationListener(){
    this.socket.on('new-notification', (data: any) => {
      const activeUser = this.selectedUserSource.value;

      if(!activeUser || activeUser._id !== data.senderId){
        this.incrementCount(data.senderId);
      }
    });
  }

  setCurrentChatUser(user: any) {
    this.selectedUserSource.next(user);
    if(user)
      this.clearCount(user._id);
  }

  updateUnreadCount(userId: string, count: number){
    const current = this.unreadCounts.value;
    current[userId] = count;
    this.unreadCounts.next({ ...current });
  }

  incrementCount(userId: string){
    const current = this.unreadCounts.value;
    current[userId] = (current[userId] || 0) + 1;
    this.unreadCounts.next({ ...current });
  }

  clearCount(userId: string) {
    const current = this.unreadCounts.value;
    current[userId] = 0;
    this.unreadCounts.next({ ...current });
  }
}
