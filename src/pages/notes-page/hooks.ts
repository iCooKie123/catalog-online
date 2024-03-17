import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts";
import { YearOfStudy } from "../../models/StudyClass";

export const useNotesPage = () => {
	const { currentUser } = useContext(AuthContext);
	const [currentTab, setCurrentTab] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	const [yearsOfStudy, setYearsOfStudy] = useState<YearOfStudy[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			//TODO: replace with real data
			const result = await axios.get(
				"/src/pages/notes-page/tabs/materiiMock.json"
			);
			setYearsOfStudy(result.data);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const allClasses = yearsOfStudy[currentTab]?.classes.map((cls) => ({
		...cls,
		grade: !!cls.grade && cls.grade > 4 ? cls.grade : undefined,
	}));

	const passedClasses = allClasses
		?.filter((cls) => !!cls.grade && cls.grade > 4)
		.map((cls) => ({ ...cls, grade: cls.grade }));

	const totalCredits = passedClasses?.reduce(
		(acc, cls) => acc + (cls?.grade ?? 0),
		0
	);

	const allPassedGrades = passedClasses?.reduce(
		(acc, cls) => acc + (cls.grade ?? 0),
		0
	);

	const averageGrade = allPassedGrades / allClasses?.length;

	const yearsOfStudyArray = Array.from(
		{ length: Number(currentUser?.yearOfStudy) },
		(_, index) => index
	);

	return {
		handleChange,
		yearsOfStudy,
		currentTab,
		averageGrade,
		totalCredits,
		yearsOfStudyArray,
		allClasses,
	};
};
