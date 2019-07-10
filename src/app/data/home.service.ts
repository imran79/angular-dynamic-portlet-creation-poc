import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnumConvert} from '../interface/mapper';


//import * as tabsJson from 'data.json';
import {Observable,Subject, of} from 'rxjs';
import * as _ from 'lodash';
import {Tab, Action,Header, PortletType, PortletSize, Portlet, Options} from '../interface/data';

@Injectable()
export class HomeService {
  tabsCollection : Array<Tab> = new Array<Tab>();
  currentTab: Tab;
  tabSub = new Subject<Tab[]>();
  tabsObservable = this.tabSub.asObservable();
  headerMenu: Options = new Options();

  constructor(private http: HttpClient) {
  this.http.get('/assets/data.json').subscribe(res =>{ 
    _.forEach(res, (v) => this.tabsCollection.push(<Tab>v));
    this.currentTab = this.tabsCollection[0];
    this.tabSub.next(<Tab[]>res);  
    });
   }    

   getDefaultOptions(): any[]{
    this.headerMenu.subCollection = new Array<Action>();  
    const addPage = new Action('Add Page',  new Subject<any>(), this.addTab);
    this.headerMenu.subCollection.push(addPage);
    const renamePage: Action = new Action('Rename Page',  new Subject<any>(), this.renameTab);
    this.headerMenu.subCollection.push(renamePage);
    const deletePage: Action = new Action('Delete Page',  new Subject<any>(), this.deleteTab);
    this.headerMenu.subCollection.push(deletePage);
    const addPortlets: Action = new Action('Add Portlet',  new Subject<any>(), this.addPortlets);
    this.headerMenu.subCollection.push(addPortlets);
    return this.headerMenu.subCollection;
   }

   addTab = (val) => {
   this.tabsCollection.push({name: val, order: 1, portlets: [] });
   this.tabSub.next(this.tabsCollection);
   }

   setCurrentTab(tabName){
    this.currentTab = _.find(this.tabsCollection, (v) => v.name === tabName);
   }

   deleteTab(val){

   }
   renameTab(val){

   }
   addPortlets = (val) => {
     console.log('Add portlets value', val);
     _.forEach(this.currentTab.portlets, (p) => {
       const v = _.find(val, (x) => x.type === p.type && !x.isSelected );
       if(!_.isNil(v)){
           _.remove(this.currentTab.portlets, (y) => p.type === y.type);
       }

     });
   }

   getPortletsList(): any[]{
    const enumValues = EnumConvert.convertPortletTypesValues();
    const portletList = [];
    _.forEach(enumValues, v => {
     const val = _.find(this.currentTab.portlets, (x) => x.type === v.enumVal);
     if(_.isNil(val)){
       portletList.push({isSelected: false, enumVal: v.enumVal, displayVal: v.displayVal})
     }else{
       portletList.push({isSelected: true, enumVal: v.enumVal, displayVal: v.displayVal})
     }
    });  
    return portletList;
   }

}