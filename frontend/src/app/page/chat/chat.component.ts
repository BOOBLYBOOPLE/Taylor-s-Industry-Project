import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/assets/services/auth.service';
import { ChatService } from './chatService.component';
import { globalEnv } from 'src/assets/shared/global-env.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  currentRoom: any;
  socket: any;
  username = '';
  message = '';
  messages: {
    _id?: string,
    username: string,
    message: string,
    hover: boolean }[] = [];
  users: string[] = [];
  chatName: any;
  typingUsers: Set<string> = new Set();
  joined = false;
  targetUserId!: string;
  public apiUrl = globalEnv.apiUrl;
  public currentUser: any;
  public isEditing = false;
  public editMessageId: string | null = null;
  public currentTargetedUser: any;

  constructor(
    public authService: AuthService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    this.username = this.currentUser.username;

    // Use the shared socket from the service
    this.socket = this.chatService.socket;

    // Register user for private notifications
    this.socket.emit('register-user', this.currentUser._id);

    // Listen for messages (Only one listener needed!)
    this.socket.on('chat message', (msg: any) => {
      this.messages.push({
        _id: msg._id,
        username: msg.username,
        message: msg.message,
        hover: false
      });
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

    this.socket.on('message history', (history: any[]) => {
      this.messages = history.map(m => ({
        _id: m._id,
        username: m.senderName,
        message: m.content,
        hover: m.hover || false
      }));
    });

    this.socket.on('message edited', (data: { messageId: string, newContent: string}) => {
      const msgIndex = this.messages.findIndex(m => m._id === data.messageId);
      if(msgIndex !== -1){
        this.messages[msgIndex].message = data.newContent;
      }
    });

    this.socket.on('message deleted', (messageId: string) => {
      this.messages = this.messages.filter(m => m._id !== messageId);
    });

    // Subscribe to user selection from the sidebar
    this.chatService.selectedUser$.subscribe(targetUser => {
      if (targetUser) {
        this.chatName = targetUser.username;
        this.targetUserId = targetUser._id;
        this.startChat(targetUser);
      }
    });

  }

  prepareEdit(msg: any){
    this.message = msg.message;
    this.editMessageId = msg._id;
    this.isEditing = true;
  }

  submitEdit(){
    if(this.message.trim() && this.editMessageId && this.currentRoom){
      this.socket.emit('edit message', {
        messageId: this.editMessageId,
        roomId: this.currentRoom,
        newContent: this.message
      });
      this.cancelEdit();
      this.startChat(this.currentTargetedUser);
    }
  }

  cancelEdit(){
    this.message = '';
    this.isEditing = false;
    this.editMessageId = null;
  }

  startChat(targetUser: any) {
    this.currentTargetedUser = targetUser;
    const myId = this.authService.getUserId();
    const roomId = [myId, targetUser._id].sort().join('_');

    if (!myId || !targetUser._id) return;

    this.currentRoom = roomId;
    this.messages = [];

    // Send IDs so the server knows who is in the chat to clear unread counts
    this.socket.emit('join', {
      roomId: this.currentRoom,
      username: this.username,
      userId: myId,
      targetUserId: targetUser._id
    });
  }

  sendMessage() {
    if (this.message.trim() && this.currentRoom) {
      this.socket.emit('chat message', {
        roomId: this.currentRoom,
        content: this.message,
        senderId: this.authService.getUserId(),
        recipientId: this.targetUserId
      });
      this.message = '';
      this.socket.emit('stop typing');
    }
  }
  deleteMessage(msg: any){
    if(msg._id && this.currentRoom){
      this.socket.emit('delete message', {
        messageId: msg._id,
        roomId: this.currentRoom
      });
    }
  }

  goIn(msg: any) { msg.hover = true; }
  goOut(msg: any) { msg.hover = false; }
  onTyping() { this.socket.emit('typing'); }
  onStopTyping() { this.socket.emit('stop typing'); }
}
