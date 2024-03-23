import axios from "../../axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts";
import { YearOfStudy } from "../../models/StudyClass";

export const useNotesPage = () => {
	const { currentUser } = useContext(AuthContext);

	const [currentTab, setCurrentTab] = useState(
		currentUser?.yearOfStudy ? currentUser?.yearOfStudy - 1 : 0
	);

	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setCurrentTab(newValue);
	};

	const [yearsOfStudy, setYearsOfStudy] = useState<YearOfStudy[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const result = await axios.get("years_of_study.json");
			setYearsOfStudy(result.data);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	const allClasses = yearsOfStudy[currentTab]?.classes;

	const passedClasses = allClasses?.filter(
		(cls) => !!cls.grade && cls.grade > 4
	);

	const allClassesCredits = allClasses?.reduce(
		(acc, cls) => acc + (cls?.credits ?? 0),
		0
	);

	const totalCredits = passedClasses?.reduce(
		(acc, cls) => acc + (cls?.credits ?? 0),
		0
	);

	const averageGrade = Number(
		(allClassesCredits / allClasses?.length).toFixed(2)
	);

	const yearsOfStudyArray = Array.from(
		{ length: Number(currentUser?.yearOfStudy) },
		(_, index) => index
	);

	const firstSemesterAverageGrade = Number(
		(
			allClasses
				?.filter((cls) => cls.semester === 1)
				.reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
			allClasses?.filter((cls) => cls.semester === 1).length
		).toFixed(2)
	);

	const secondSemesterAverageGrade = Number(
		(
			allClasses
				?.filter((cls) => cls.semester === 2)
				.reduce((acc, cls) => acc + (cls.grade ?? 0), 0) /
			allClasses?.filter((cls) => cls.semester === 2).length
		).toFixed(2)
	);

	return {
		handleChange,
		yearsOfStudy,
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
