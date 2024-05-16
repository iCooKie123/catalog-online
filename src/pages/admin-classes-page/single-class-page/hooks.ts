import axios from "@/axios";
import { StudentClass, StudyClass, User } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

export const useSingleClassPage = (studentClasses?: StudentClass[]) => {
  interface SingleClassPageForm {
    studentGrade: {
      student: User;
      grade: number;
    }[];
  }

  //TODO: fix this
  //TODO: find a way to pass the user also,without specifying a schema
  //TODO: get methods working
  useEffect(() => {
    console.log(studentClasses);
  }, [studentClasses]);
  const getDefaultValues = (
    studentClasses: StudentClass[]
  ): SingleClassPageForm => {
    const studentGrade = studentClasses?.map((student) => ({
      student: student.student,
      grade: student.grade,
    }));
    console.log("studentGrade: ", studentGrade);
    return { studentGrade: studentGrade || [] };
  };

  const validationSchema = yup.object().shape({
    studentGrade: yup.array().of(
      yup.object().shape({
        studentId: yup.string().required(),
        grade: yup.number().required().min(1).max(10),
      })
    ),
  });

  const methods = useForm<SingleClassPageForm>({
    resolver: yupResolver(
      validationSchema
    ) as Resolver<SingleClassPageForm>,
    mode: "onBlur",
    defaultValues: getDefaultValues(studentClasses || []),
  });

  return methods;
};
