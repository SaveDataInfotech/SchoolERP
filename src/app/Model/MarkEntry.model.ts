export class Subject {

    name: string;

    mark: number;

    grade: string;

    s_status: string;

    selected:boolean;

}

export class MarkEntryGradeTypeModel {
    entryid: number;

    classid: number;

    groupid: number;

    sectionid: number;

    date: string;

    exam_name: string;

    classincharge: string;

    studentList: studentListModel[];

    cuid: number;
}

export class studentListModel {
    admission_no: string;

    student_name: string;

    total: number;

    grade: string;

    status: string;

    average: number;

    s_rank: number;

    subjectList: subjectListModel[];    
}

export class subjectListModel {
    name: string;

    mark: number;

    grade: string;

    s_status: string;

    selected:boolean;
}