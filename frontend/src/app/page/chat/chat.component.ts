import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from 'src/assets/services/auth.service';
import { ChatService } from './chatService.component';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  currentRoom :any;
  socket: any;
  username = '';
  message = '';
  messages: { username: string, message: string }[] = [];
  users: string[] = [];
  typingUsers: Set<string> = new Set();
  joined = false;
  public apiUrl = globalEnv.apiUrl;

  constructor(
    public authService: AuthService,
    public chatService: ChatService
  ){}

  ngOnInit() {
    this.socket = io(this.apiUrl);

    this.socket.on('chat message', (msg: { username: string, message: string }) => {
      this.messages.push(msg);
    });

    this.socket.on('user joined', (username: string) => {
      this.messages.push({ username: 'System', message: `${username} has joined the chat` });
    });

    this.socket.on('user left', (username: string) => {
      this.messages.push({ username: 'System', message: `${username} has left the chat` });
    });

    this.socket.on('user list', (userList: string[]) => {
      this.users = userList;
    });

    this.socket.on('typing', (username: string) => {
      this.typingUsers.add(username);
    });

    this.socket.on('stop typing', (username: string) => {
      this.typingUsers.delete(username);
    });

    this.chatService.selectedUser$.subscribe(targetUser => {
      if (targetUser) {
        this.startChat(targetUser);
      }
    });
  }

  join() {
    if (this.username.trim()) {
      this.socket.emit('join', this.username);
      this.joined = true;
    }
  }

startChat(targetUser: any) {
  const myId = this.authService.getUserId();

  const roomId = [myId, targetUser._id].sort().join('_');

  if (!myId || !targetUser._id) return;

  this.currentRoom = roomId;
  this.messages = []; // Clear current view

  this.socket.emit('join', {
    roomId: this.currentRoom,
    username: this.username
  });
}

  joinPrivateChat(otherUserId: string){
    const myId = '';
    const roomId = [myId, otherUserId].sort().join('_');
    this.currentRoom = roomId;
    this.socket.emit('join', )
  }

  sendMessage() {
    if (this.message.trim() && this.currentRoom) {
      this.socket.emit('chat message', {
        roomId: this.currentRoom,
        content: this.message
      });
      this.message = '';
      this.socket.emit('stop typing');
    }
  }

  onTyping() {
    this.socket.emit('typing');
  }

  onStopTyping() {
    this.socket.emit('stop typing');
  }

}
