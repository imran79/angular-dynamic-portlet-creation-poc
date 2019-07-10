
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Portlet} from '../../interface/data'; 
import {BehaviorSubject} from 'rxjs';

import {CompactType, GridsterConfig, GridsterItem,DisplayGrid, GridsterItemComponent, GridsterPush, GridType} from 'angular-gridster2';

@Component({
  selector: 'app-portlet-canvas',
  templateUrl: './portlet-canvas.component.html',
  styleUrls: ['./portlet-canvas.component.css']
})
export class PortletCanvasComponent implements OnInit {


  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  itemToPush: GridsterItemComponent;
  private _portlets = new BehaviorSubject<any[]>([]);

  @Input()
  set portlets(value){
    console.log('Portlets value', value);
    
    this._portlets.next(value);
  }

  get portlets(){
    return this._portlets.getValue();
  }

  constructor() { }

  ngOnInit() {

    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      pushItems: true,
      displayGrid: DisplayGrid.None,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: true
      }
  }
  

  this.dashboard = [
      {cols: 1, rows: 9, y: 0, x: 0},
      {cols: 1, rows: 9, y: 0, x: 0},
      {cols: 1, rows: 9, y: 0, x: 0},
      {cols: 1, rows: 9, y: 0, x: 0},
      {cols: 1, rows: 9, y: 0, x: 0},     
      
    ];
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  }

  initItem(item: GridsterItem, itemComponent: GridsterItemComponent) {
    this.itemToPush = itemComponent;
  }

  pushItem() {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) { // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(this.itemToPush.$item, this.itemToPush.item);
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }


}