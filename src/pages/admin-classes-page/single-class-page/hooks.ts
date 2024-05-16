import axios from "@/axios";
import { StudentClass, StudyClass } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

export const useSingleClassPage = (
  id: string,
  studentClasses: StudentClass[],
  isLoading: boolean
) => {
  if (isLoading) return null;
  interface SingleClassPageForm {
    studentGrade: {
      studentId: string;
      grade: number;
    }[];
  }

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
    defaultValues: {
      studentGrade: studentClasses?.map((student) => ({
        studentId: student.student.id,
        grade: student.grade,
      })),
    },
  });

  return { methods };
};
