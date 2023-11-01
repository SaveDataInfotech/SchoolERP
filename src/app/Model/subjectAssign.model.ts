export class subject {
    subjectid: number;
    subject_name: string;
    isselect: boolean;
  classids: any;
}

export class assign {
    assignid: number;
    classid: number;
    groupid: number;
    sectionid: number;
    subjetsid: string;
    subjectsname: string;
    cuid: number;
    class_name: '';
    section_name: '';
    group_name: ''
}
