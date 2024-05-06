import axios from "@/axios";
import { StudyClass } from "@/models";
import { useEffect } from "react";

export const useAdminClassesPage = () => {
  const [classes, setClasses] = useState<StudyClass[]>([]);
  useEffect(() => {
    const getAllClasses = async () => {
      await axios.get("classes/all-classes").then((response) => {
        return response.data as StudyClass[];
      });
    };

    getAllClasses();
  }, []);

  return {};
};
