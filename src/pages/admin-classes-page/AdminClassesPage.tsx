import { useEffect } from "react";
import { useAdminClassesPage } from "./hooks";

export const AdminClassesPage = () => {
  const { getAllClasses } = useAdminClassesPage();
  useEffect(() => {
    console.log(getAllClasses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <p>It works</p>
    </>
  );
};
