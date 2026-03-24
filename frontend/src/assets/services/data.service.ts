import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{
  //???
  public dataSubject = new Subject<string>();
  public recipient = new Subject<string>();
  public trigger = new Subject<void>();

  data$ = this.dataSubject.asObservable();
  recipient$ = this.recipient.asObservable();
  triggerFunction$ = this.trigger.asObservable();

  constructor(){}

  sendRecipient(data: string){
    this.recipient.next(data);
  }
  sendData(data: string){
    this.dataSubject.next(data);
  }

  triggerFunction(){
    this.trigger.next();
  }
}
