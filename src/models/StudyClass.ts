import { User } from "./User";

export type StudyClass = {
    credits: number;
    id: string;
    name: string;
    semester: 1 | 2;
    type: ClassType;
    yearOfStudy: number;
};

export type StudentClass = {
    grade: number;
    class: StudyClass;
    student: User;
};

export enum ClassType {
    Seminar,
    Laborator,
    Proiect,
}
