import axios from "@/axios";
import { useSnackBar } from "@/contexts";
import { StudentClass, StudyClass } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const useSingleClassPage = (id: string) => {
    const { showSnackBar } = useSnackBar();
    const [studyClass, setStudyClass] = useState<StudyClass>();
    const [studentClasses, setStudentClasses] = useState<StudentClass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editFieldDisabled, setEditFieldDisabled] = useState(true);

    const getClass = useCallback(async () => {
        setIsLoading(true);
        try {
            const res: AxiosResponse = await axios.get(`classes/class/${id}`);
            setStudentClasses(
                res.data.sort(
                    (a: StudentClass, b: StudentClass) =>
                        a.student.yearOfStudy - b.student.yearOfStudy
                )
            );
            setStudyClass(res.data[0].class);
        } catch (error) {
            showSnackBar("Error fetching data.", "error");
        } finally {
            setIsLoading(false);
        }
    }, [id, showSnackBar]);

    useEffect(() => {
        getClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    interface SingleClassPageForm {
        studentGrade?: {
            studentId: string;
            grade: number;
        }[];
    }

    const validationSchema = yup.object().shape({
        studentGrade: yup.array().of(
            yup.object().shape({
                studentId: yup.string().required(),
                grade: yup
                    .number()
                    .required()
                    .min(1, "Grade must be between 1 and 10")
                    .max(10, "Grade must be between 1 and 10"),
            })
        ),
    });

    const getDefaultValues = (
        studentClasses: StudentClass[]
    ): SingleClassPageForm => {
        const studentGrade = studentClasses.map((student) => ({
            studentId: student.student.id,
            grade: student.grade,
        }));
        return { studentGrade } satisfies SingleClassPageForm;
    };

    const defaultValues = getDefaultValues(studentClasses || []);

    const methods = useForm<SingleClassPageForm>({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
        defaultValues: defaultValues,
    });

    const getDirtyFields = () => {
        const dirtyFields = methods.formState.dirtyFields.studentGrade;
        const formValues = methods.getValues();
        const dirtyObjects = [];

        for (const key in dirtyFields) {
            const keyNumber = parseInt(key);
            if (dirtyFields[keyNumber]) {
                dirtyObjects.push({
                    studentId: formValues.studentGrade![keyNumber].studentId,
                    grade: Number(formValues.studentGrade![keyNumber].grade),
                });
            }
        }
        return dirtyObjects;
    };

    useEffect(() => {
        methods.reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentClasses]);

    const onSubmit = async () => {
        const formValues = getDirtyFields();
        const request = {
            studentGrades: formValues,
            classId: studyClass!.id,
        };

        await axios
            .patch(`classes/${studyClass!.id}/grades`, request)
            .then(async () => {
                showSnackBar("Grades updated successfully!", "success");
                await getClass();
                methods.reset(defaultValues);
                setEditFieldDisabled(true);
            })
            .catch(() => {
                showSnackBar("Error updating grades!", "error");
            });
    };

    return {
        methods,
        onSubmit,
        isLoading,
        studyClass,
        studentClasses,
        editFieldDisabled,
        setEditFieldDisabled,
    };
};
