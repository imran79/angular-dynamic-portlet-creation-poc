import { Component, OnInit, Input } from '@angular/core';
import {PortletType} from '../../../interface/data';

@Component({
  selector: 'app-portlet',
  templateUrl: './portlet.component.html',
  styleUrls: ['./portlet.component.css']
})
export class PortletComponent implements OnInit {

  constructor() { }
PortletType: typeof PortletType = PortletType;
  @Input()
  portletType: PortletType;

  ngOnInit() {
    console.log(this.portletType);
  }

}