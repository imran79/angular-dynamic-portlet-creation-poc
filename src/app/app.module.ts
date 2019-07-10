
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { DashboardComponent, HeaderActionDataComponent } from './components/dashboard/dashboard.component';
import { DynamicTabComponent } from './components/dynamic-tab/dynamic-tab.component';
import { PortletComponent } from './components/portlet-canvas/portlet/portlet.component';
import { HomeService } from './data/home.service';
import {DemoMaterialModule} from './material-module';
import { PortletCanvasComponent } from './components/portlet-canvas/portlet-canvas.component';
import { MyWorkPortletComponent } from './components/portlet-canvas/portlet/my-work-portlet/my-work-portlet.component';
import { MyLinksPortletComponent } from './components/portlet-canvas/portlet/my-links-portlet/my-links-portlet.component';
import { MyAlertPortletComponent } from './components/portlet-canvas/portlet/my-alert-portlet/my-alert-portlet.component';
import { MyNotificationsPortletComponent } from './components/portlet-canvas/portlet/my-notifications-portlet/my-notifications-portlet.component';
import { MyDocumentsPortletComponent } from './components/portlet-canvas/portlet/my-documents-portlet/my-documents-portlet.component';




@NgModule({
  imports: [
    GridsterModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    
    ReactiveFormsModule,
   
  ],
  entryComponents: [AppComponent, DashboardComponent, HeaderActionDataComponent],
  declarations: [AppComponent, DashboardComponent, DynamicTabComponent, PortletComponent, HeaderActionDataComponent, PortletCanvasComponent, MyWorkPortletComponent, MyLinksPortletComponent, MyAlertPortletComponent, MyNotificationsPortletComponent, MyDocumentsPortletComponent],
  bootstrap: [AppComponent],
  providers: [HomeService]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);


