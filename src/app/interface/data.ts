import { EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';



export class Options {
  subCollection: Array<Action>;
}
export interface Tab {
  name: String,
  order: number,
  portlets: Array<Portlet>
}

type emitType = (val : any) => void;

declare interface ActionPayload {
  actionTitle: string;  
  subject: Subject<any>;
  observable: Observable<any>;
  subscribeFn: Function;

  onEmit: emitType;

}



export class Action implements ActionPayload {
  actionTitle: string;
  val: any;
  subject: Subject<any>;
  observable: Observable<any>;
  subscribeFn: Function;
  constructor(actionTitle: string, subject: Subject<any>, subscribeFn: Function) {
    this.actionTitle = actionTitle;
    
    this.subject = subject;
    this.observable = this.subject.asObservable();
    this.subscribeFn = subscribeFn;
    const subs = this.observable.subscribe(r => {
      this.subscribeFn(r);
    });

  }
  onEmit = (val: any) => this.subject.next(val);
}



export class Header {
  headerOptions: Array<HeaderOption>;
}
export class HeaderOption extends Action {



}



export interface PortletSize {
  height: number;
  width: number;
}

export interface Portlet {
  name: string;
  title: string;
  isFooterEnabled: boolean;
  header: Header;
  size: PortletSize;
  type: PortletType;

}

export enum PortletType {
  MyWork = 0,
  MyAlerts = 1,
  MyLinks = 2,
  NotificationRules = 3,
  MyDocuments = 4
}







