import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class webService{
  constructor(public http: HttpClient){}

  public webServiceRetrieve<T>(url: string){
    return this.http.get<T>(url);
  }

  public webServiceRetrieveOne<T>(url: string, object: any) : Observable<any> {
    return this.http.get<T>(url, object);
  }

  public webServiceCreate(url: string, object: any) : Observable<any> {
    return this.http.post(url, object);
  }

  public webServiceUpdate(url: string, content: any): Observable<any> {
    return this.http.put(url, content);
  }

  public webServiceDelete(url: string, object: any): Observable<any> {
    return this.http.delete(url, object);
  }
}
