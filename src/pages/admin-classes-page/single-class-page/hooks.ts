import { StudentClass } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

export const useSingleClassPage = (studentClasses?: StudentClass[]) => {
	interface SingleClassPageForm {
		studentGrade: {
			studentId: string;
			grade: number;
		}[];
	}

	const getDefaultValues = (
		studentClasses: StudentClass[]
	): SingleClassPageForm => {
		const studentGrade = studentClasses?.map((student) => ({
			studentId: student.student.id,
			grade: student.grade,
		}));
		return { studentGrade: studentGrade } as SingleClassPageForm;
	};

	const validationSchema = yup.object().shape({
		studentGrade: yup.array().of(
			yup.object().shape({
				studentId: yup.string().required(),
				grade: yup.number().required().min(1).max(10),
			})
		),
	});

	const defaultValues = getDefaultValues(studentClasses || []);

	const methods = useForm<SingleClassPageForm>({
		resolver: yupResolver(
			validationSchema
		) as Resolver<SingleClassPageForm>,
		mode: "onBlur",
		defaultValues: defaultValues,
	});

	useEffect(() => {
		methods.reset(defaultValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studentClasses]);

	return { methods, defaultValues };
};
