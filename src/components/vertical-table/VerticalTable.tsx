import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	Typography,
} from "@mui/material";

interface VerticalTableProps {
	data: { label: string; value: string | number }[];
}

export const VerticalTable = ({ data }: VerticalTableProps) => {
	return (
		<Table>
			<TableBody>
				{data.map((item, index) => (
					<TableRow key={index}>
						<TableCell align="center">
							<Typography variant="subtitle1">
								<b>{item.label}</b>
							</Typography>
						</TableCell>
						<TableCell align="center">
							<Typography variant="body1">
								{item.value}
							</Typography>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
