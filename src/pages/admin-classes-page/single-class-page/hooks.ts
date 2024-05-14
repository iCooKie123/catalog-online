import axios from "@/axios";
import { StudentClass, StudyClass } from "@/models";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useSingleClassPage = (id: string) => {
  const [studyClass, setStudyClass] = useState<StudyClass>();
  const [students, setStudents] = useState<StudentClass[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getClass = async () => {
      setIsLoading(true);
      axios.get(`classes/class/${id}`).then((res: AxiosResponse) => {
        setStudents(
          res.data.sort(
            (a: StudentClass, b: StudentClass) =>
              a.student.yearOfStudy - b.student.yearOfStudy
          )
        );
        setStudyClass(res.data[0].class);
        setIsLoading(false);
      });
    };

    getClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { studyClass, students, isLoading };
};
