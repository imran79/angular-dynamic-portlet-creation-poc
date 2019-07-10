import { Component, OnInit , Inject} from '@angular/core';
import {HomeService} from '../../data/home.service';
import {PortletType} from '../../interface/data';
import {EnumConvert, EnumValue} from '../../interface/mapper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 headerMenus : any[];
 actionType: string;
 actionTitle:string;
 val: any;
 valueList: any[] = [];
 

 constructor(private service: HomeService,  public dialog: MatDialog) {
    this.headerMenus = this.service.getDefaultOptions();
    console.log('header menus', this.headerMenus);
   }
 
  
  onSelectionChange = (evt: any)=> {
    console.log('clickEvent',evt);
    if(evt.actionTitle === 'Add Page'){
      this.actionType = 'AddPage';
      this.val = '';
      this.actionTitle = evt.actionTitle;
      this.openDialog(evt);
    }else if(evt.actionTitle === 'Add Portlet'){
      this.valueList = EnumConvert.convertPortletTypesValues();
      this.actionType = 'AddPortlet';
      this.val = '';
      this.actionTitle = evt.actionTitle;
      
      this.openDialog(evt);
    }
    
  }

  ngOnInit(){
    
  }

   openDialog(evt): void {
     
    const dialogRef = this.dialog.open(HeaderActionDataComponent, {
      width: '250px',
      data: {type: this.actionType, title: this.actionTitle, value: this.val, valueList: this.valueList }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     evt.onEmit(result);
    });
  }

}

@Component({
  selector: 'app-header-action-data',
  templateUrl: './header-action-data.component.html'
  
})
export class HeaderActionDataComponent {

  constructor(
    public dialogRef: MatDialogRef<HeaderActionDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  } 

  onSelectionChange(val){
    this.data.val = val;
  }

}

