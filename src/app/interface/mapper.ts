import {PortletType} from './data';

export interface EnumValue{
  enumVal: string;
  displayVal: string;
  isSelected: boolean;
}
export class EnumConvert {
    static NotRequiered="Not Required";
    static Working="I'm Working";
    static Pending = "Pending Review";
    static Reviewed="Reviewed Done";
    static Done="Done All";


    
  static MyWork = "My Work";
  static MyAlerts = "My Alerts";
  static MyLinks = "My Links";
  static NotificationRules = "Notification Rules";
  static MyDocuments = "My Documents";


    static convertPortletTypesValues():Array<EnumValue>{
        const enums = new Array<EnumValue>();
        enums.push({enumVal : 'MyWork', displayVal: EnumConvert.MyWork, isSelected: false });
        enums.push({enumVal : 'MyAlerts', displayVal: EnumConvert.MyAlerts, isSelected: false });
        enums.push({enumVal : 'MyLinks', displayVal: EnumConvert.MyLinks, isSelected:false });
        enums.push({enumVal : 'NotificationRules', displayVal: EnumConvert.NotificationRules, isSelected: false });
        enums.push({enumVal : 'MyDocuments', displayVal: EnumConvert.MyDocuments, isSelected: false });
        return enums;

    }
}