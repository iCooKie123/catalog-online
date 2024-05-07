import axios from "@/axios";
import { StudyClass } from "@/models";
import { useEffect, useState } from "react";

export const useAdminClassesPage = () => {
  const [classes, setClasses] = useState<StudyClass[]>([]);
  useEffect(() => {
    const getAllClasses = async () => {
      await axios.get("classes/all-classes").then((response) => {
        setClasses(response.data as StudyClass[]);
      });
    };

    getAllClasses();
  }, []);

  return { classes };
};
