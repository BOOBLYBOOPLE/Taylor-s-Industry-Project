import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private selectedUserSource = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSource.asObservable();

  constructor() {}

  setCurrentChatUser(user: any) {
    this.selectedUserSource.next(user);
  }
}
