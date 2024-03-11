export type StudyClass = {
	id: string;
	name: string;
	yearOfStudy: number;
	credits: number;
	type: "lab" | "seminar" | "proiect";
	grade?: number;
	semester: 1 | 2;
};

export type YearOfStudy = {
	year: number;
	classes: StudyClass[];
};
