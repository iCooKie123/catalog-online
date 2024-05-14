import { StudyClass } from "@/models";
import { Box } from "@mui/material";
interface SingleClassPageProps {
  studyClass: StudyClass;
}
export const SingleClassPage = ({ studyClass }: SingleClassPageProps) => {
  return (
    <Box
      width={{ xs: "90dvw", md: "60vw" }}
      minHeight={{ xs: "300px", md: "500px" }}
      mt={12}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
      }}>
      {studyClass.name}
    </Box>
  );
};
