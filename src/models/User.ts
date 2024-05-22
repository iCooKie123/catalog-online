export type User = {
email: string;
id: string;
firstName: string;
lastName: string;
yearOfStudy: number;
learningCycle: string;
faculty: string;
specialization: string;
group: string;
role: UserRoles;
};

export enum UserRoles {
Admin,
Student,
}
