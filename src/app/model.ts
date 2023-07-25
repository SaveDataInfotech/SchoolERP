export interface StudentClassDto {    
    class_name: string;
}

export interface StudentGroupDto {
  groupid: number;
  class_name: string;
  group_name:string;
  isactive: boolean;
  UpdatedOn: string;
}

export interface BatchYearDto{
  batchid:number;
  batch_year:string;
  isactive:boolean;
  updateon:Date
}

export interface SubjectDto {
  subjectid: number;
  subject_name: string;
isactive: boolean;
UpdatedOn: string;
}


export class ApiResult<T> {
    ErrorMessage: string[];
    IsSuccess: boolean;
    Result: T;
    WarningMessage: string[];
    Id?: string;
  }
  