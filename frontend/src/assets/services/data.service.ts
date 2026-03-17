import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{
  //???
  public dataSubject = new Subject<string>();
  public trigger = new Subject<void>();

  data$ = this.dataSubject.asObservable();
  triggerFunction$ = this.trigger.asObservable();

  constructor(){}

  sendData(data: string){
    this.dataSubject.next(data);
  }

  triggerFunction(){
    this.trigger.next();
  }
}
