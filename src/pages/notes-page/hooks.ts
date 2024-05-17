import axios from "../../axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts";
import { StudentClass } from "../../models/StudyClass";

export const notesUrl = "classes";

export const useNotesPage = () => {
  const { currentUser } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState(
    currentUser?.yearOfStudy ? currentUser?.yearOfStudy - 1 : 0
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const [studentClasses, setStudentClasses] = useState<StudentClass[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios.get(notesUrl);
      const responseData: StudentClass[] = result.data;
      const organizedData: StudentClass[][] = [];

      responseData.forEach((studentClass) => {
        const index = organizedData.findIndex(
          (arr) =>
            arr.length > 0 &&
            arr[0].class.yearOfStudy ===
            studentClass.class.yearOfStudy
        );
        if (index === -1) {
          // If no array exists for this yearOfStudy, create a new one
          organizedData.push([studentClass]);
        } else {
          // Add the class to the existing array
          organizedData[index].push(studentClass);
        }
      });
      setStudentClasses(organizedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const allClasses = studentClasses[currentTab];

  const passedClasses = allClasses?.filter(
    (cls) => !!cls.grade && cls.grade > 4
  );

  const totalCredits = passedClasses?.reduce(
    (acc, cls) => acc + (cls?.class.credits ?? 0),
    0
  );

  const averageGrade = Number(
    (
      allClasses?.reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
      allClasses?.length
    ).toFixed(2)
  );

  const yearsOfStudyArray = Array.from(
    { length: Number(currentUser?.yearOfStudy) },
    (_, index) => index
  );

  const firstSemesterAverageGrade = Number(
    (
      allClasses
        ?.filter((cls) => cls.class.semester === 1)
        .reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
      allClasses?.filter((cls) => cls.class.semester === 1).length
    ).toFixed(2)
  );

  const secondSemesterAverageGrade = Number(
    (
      allClasses
        ?.filter((cls) => cls.class.semester === 2)
        .reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
      allClasses?.filter((cls) => cls.class.semester === 2).length
    ).toFixed(2)
  );

  return {
    handleChange,
    yearsOfStudy: studentClasses,
    currentTab,
    averageGrade,
    totalCredits,
    yearsOfStudyArray,
    allClasses,
    firstSemesterAverageGrade,
    secondSemesterAverageGrade,
    isLoading,
  };
};
