import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleClassPage } from "./hooks";
import { StudentClass, StudyClass } from "@/models";
import axios from "@/axios";
import { AxiosResponse } from "axios";
import { Textfield } from "@/components";
import { FormProvider } from "react-hook-form";

export const SingleClassPage = () => {
	const [studyClass, setStudyClass] = useState<StudyClass>();
	const [studentClasses, setStudentClasses] = useState<StudentClass[]>();
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const { methods } = useSingleClassPage(studentClasses);

	useEffect(() => {
		const getClass = async () => {
			setIsLoading(true);
			axios.get(`classes/class/${id}`).then((res: AxiosResponse) => {
				setStudentClasses(
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

	const studentRow = (studentClass: StudentClass, index: number) => {
		return (
			<>
				<Grid
					item
					key={studentClass.student.id}
					xs={12}
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					p={1}
					sx={{ gap: 2 }}>
					<Typography
						variant="body1"
						sx={{
							flexGrow: 1,
							flexBasis: 0,
							textAlign: "left",
							wordBreak: "break-word",
						}}>
						{studentClass.student.firstName}{" "}
						{studentClass.student.lastName}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							flexGrow: 1,
							flexBasis: 0,
							textAlign: "center",
							wordBreak: "break-word",
						}}>
						{studentClass.student.group}
					</Typography>
					<Grid
						item
						sx={{
							flexGrow: 0.5,
							flexBasis: 0,
							textAlign: "center",
							wordBreak: "break-word",
						}}>
						<FormProvider {...methods}>
							<Textfield
								name={`studentGrade.${index}.grade`}
								label={"Nota"}
								id={studentClass.student.id.toString()}
								dataTestId={
									"student-" +
									studentClass.student.id +
									"grade"
								}
								disabled={true}></Textfield>
						</FormProvider>
					</Grid>
				</Grid>
				<Divider sx={{ marginBottom: 1 }} />
			</>
		);
	};
	if (!isLoading)
		return (
			<Box
				width={{ xs: "90dvw", md: "70vw" }}
				minHeight={{ xs: "300px", md: "500px" }}
				mt={12}
				sx={{
					backgroundColor: "white",
					color: "black",
					borderRadius: "5px",
				}}
				p={2}>
				<Typography variant="h4">{studyClass!.name}</Typography>
				<Divider />
				<Grid
					container
					flexDirection="column">
					<Grid
						item
						display="flex"
						justifyContent="space-between"
						xs={12}
						mt={2}>
						<Typography
							variant="body1"
							sx={{
								flexGrow: 1,
								flexBasis: 0,
								textAlign: "left",
								wordBreak: "break-word",
							}}>
							Nume
						</Typography>
						<Typography
							variant="body1"
							sx={{
								flexGrow: 1,
								flexBasis: 0,
								textAlign: "center",
								wordBreak: "break-word",
							}}>
							Grupa
						</Typography>
						<Typography
							variant="body1"
							sx={{
								flexGrow: 1,
								flexBasis: 0,
								textAlign: "right",
								wordBreak: "break-word",
							}}>
							Nota
						</Typography>
					</Grid>
					<Divider />
					{studentClasses?.map((studentClass, index) =>
						studentRow(studentClass, index)
					)}
				</Grid>
			</Box>
		);
};
