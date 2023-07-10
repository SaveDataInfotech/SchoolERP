export interface StudentClassDto {
    classid: number;
    class_name: string;
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
  