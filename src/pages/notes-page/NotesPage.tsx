import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { Box, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "./tabs/CustomTabPanel";
import axios from "axios";
import { YearOfStudy } from "../../models/StudyClass";

export const NotesPages = () => {
	const { currentUser } = useContext(AuthContext);
	const [value, setValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const [yearsOfStudy, setYearsOfStudy] = useState<YearOfStudy[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get(
				"/src/pages/notes-page/tabs/materiiMock.json"
			);
			setYearsOfStudy(result.data);
			console.log(yearsOfStudy);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const classes = yearsOfStudy[value]?.classes;

	useEffect(() => {
		console.log(classes);
	}, [classes]);
	return (
		<>
			<Box
				width="90%"
				sx={{ backgroundColor: "white" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example">
						<Tab label="Item One" />
						<Tab label="Item Two" />
						<Tab label="Item Three" />
					</Tabs>
				</Box>
				{Array.from(
					{ length: Number(currentUser?.yearOfStudy) },
					(_, index) => (
						<CustomTabPanel
							index={index}
							value={value}
							classes={classes}></CustomTabPanel>
					)
				)}
			</Box>
		</>
	);
};
