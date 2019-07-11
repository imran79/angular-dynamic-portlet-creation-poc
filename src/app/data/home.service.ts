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
     _.forEach(val, (p) => {
       const v = _.find(this.currentTab.portlets, (x) => x.type === p.enumVal && !p.isSelected );
       const w =  _.find(this.currentTab.portlets, (x) => x.type === p.enumVal);
       if(!_.isNil(v)){
           _.remove(this.currentTab.portlets, (y) => p.enumVal === y.type);
       }else if(_.isNil(w) && p.isSelected){
         this.currentTab.portlets.push(<Portlet>{name: p.enumVal, title: p.displayVal, type:p.enumVal});
       }

     });
    // updating the tab collection -
    _.forEach(this.tabsCollection, (t) => {
      if(t.name === this.currentTab.name){
        t = this.currentTab;
      }

    });
    this.tabSub.next(this.tabsCollection);
     
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