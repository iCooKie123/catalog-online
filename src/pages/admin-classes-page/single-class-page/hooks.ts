import { StudentClass, StudyClass } from "@/models";
import { useEffect, useState } from "react";

export const useSincleClassPage = () => {
  const [studyClass, setStudyClass] = useState<StudyClass>();
  const [students, setStudents] = useState<StudentClass[]>();
  useEffect(() => {
    const getClass = async () => {
      await axios.get("classes/class").then((response) => {
        setClass(response.data as StudyClass);
      });
    });

}
