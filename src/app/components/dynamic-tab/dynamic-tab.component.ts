import { Component, OnInit } from '@angular/core';
import{ HomeService} from '../../data/home.service';

@Component({
  selector: 'app-dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.css']
})
export class DynamicTabComponent implements OnInit {

  constructor(private service: HomeService) { 
   
  }
  tabs: any[];
  ngOnInit() {  
   this.service.tabsObservable.subscribe(data => {this.tabs = <any[]>data;});
  }

  currentTabSelection(evt){
     console.log('current tab selection', evt);
    this.service.setCurrentTab(evt.tab.textLabel);
  }
  

}