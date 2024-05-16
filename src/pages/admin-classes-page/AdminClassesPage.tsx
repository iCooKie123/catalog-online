import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useAdminClassesPage } from "./hooks";
import { StudyClass } from "@/models";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminClassesPage = () => {
  const { classes } = useAdminClassesPage();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );
  const groupedData: { [year: number]: StudyClass[] } = {};
  for (const item of filteredClasses) {
    const year = item.yearOfStudy;
    if (!groupedData[year]) {
      groupedData[year] = [];
    }
    groupedData[year].push(item);
  }
  return (
    <>
      <Box
        width={{ xs: "90dvw", md: "60vw" }}
        minHeight={{ xs: "300px", md: "500px" }}
        mt={12}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "5px",
        }}>
        <Box
          mt={2}
          ml={2}>
          <TextField
            label="Search class"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}></TextField>
        </Box>
        {Object.entries(groupedData).map(([year, classes]) => (
          <Box p={2}>
            <Typography variant="h4">Year {year}</Typography>
            {classes.map((cls) => (
              <>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <Typography>{cls.name}</Typography>
                  <Box ml={"4 rem"}>
                    <IconButton>
                      <VisibilityIcon
                        color="success"
                        onClick={() => {
                          console.log("viz click");
                        }}></VisibilityIcon>
                    </IconButton>
                    <IconButton>
                      <EditIcon
                        color="primary"
                        onClick={() => {
                          navigate(
                            "/classes/" + cls.id
                          );
                        }}></EditIcon>
                    </IconButton>
                  </Box>
                </Box>
                <Divider />
              </>
            ))}
          </Box>
        ))}
        {filteredClasses.length === 0 && (
          <Box ml={2}>
            <p>No Classes found</p>
          </Box>
        )}
      </Box>
    </>
  );
};
