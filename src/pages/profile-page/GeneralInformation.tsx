import { VerticalTable } from "@/components";
import { AuthContext } from "@/contexts";
import { UserRoles } from "@/models";
import { Typography, Box } from "@mui/material";
import { useContext } from "react";

export const GeneralInformation = () => {
	const { currentUser } = useContext(AuthContext);

	const data = [
		{ label: "Ciclu studii", value: currentUser?.learningCycle ?? "" },
		{ label: "Facultate", value: currentUser?.faculty ?? "" },
		{ label: "Specializare", value: currentUser?.specialization ?? "" },
		{ label: "Grupa", value: currentUser?.group ?? "" },
		{ label: "An de studiu", value: currentUser?.yearOfStudy ?? 0 },
	];
	if (currentUser?.role == UserRoles.Student)
		return (
			<>
				<Typography variant="h5">
					Informații generale despre ciclul de studii:
				</Typography>
				<Box
					display="flex"
					justifyContent="center"
					mt={2}
					alignItems="center"
					width="100%">
					<Box width="auto">
						<VerticalTable data={data} />
					</Box>
				</Box>
			</>
		);

	return (
		<>
			asd
			{/* TODO: implement admin role general information */}
		</>
	);
};
