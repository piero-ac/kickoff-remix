export default function MatchStat({
	type,
	homeValue,
	awayValue,
}: {
	type: string;
	homeValue: string | number | null;
	awayValue: string | number | null;
}) {
	let statType = undefined;
	switch (type) {
		case "expected_goals":
			statType = "xG";
			break;
		case "Passes Accurate":
			statType = "Completed Passes";
			break;
		case "Total passes":
			statType = "Total Passes";
			break;
		case "Shots insidebox":
			statType = "Shots Insidebox";
			break;
		case "Shots outsidebox":
			statType = "Shots Outsidebox";
			break;
		case "Shots on Goal":
			statType = "Shots On Goal";
			break;
		case "Shots off Goal":
			statType = "Shots Off Goal";
			break;
		default:
			statType = type;
	}
	return (
		<>
			<tr className="bg-darkpurple text-brightwhite">
				<th colSpan={2}>{statType}</th>
			</tr>
			<tr className="bg-slate-300">
				<td>{homeValue || 0}</td>
				<td>{awayValue || 0}</td>
			</tr>
		</>
	);
}
