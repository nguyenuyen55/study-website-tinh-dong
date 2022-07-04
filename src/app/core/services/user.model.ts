import { Class } from './class.model';
export interface User {
    nation: string;
    address: string;
    sex: string;
    picture: string;
    parent_phone: string;
    nam: string;
    name_father: string;
    name_mother: string;
    religion: string;
    status: string;
    class_id: Class;
  }
  //thiếu birthday, number_phone 
  // một user thì ở trong 0 hoặc nhiều lớp