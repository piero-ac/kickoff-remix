import { useNavigate } from "@remix-run/react";
import MatchRow from "./MatchRow";

const MatchesOverviewTable = ({
	matches,
	seasonComplete,
	today,
	nextMatchdate,
}: {
	matches: Match[];
	seasonComplete: boolean;
	today: string;
	nextMatchdate: string;
}) => {
	const navigate = useNavigate();
	if (seasonComplete) {
		return <div className="w-full h-auto">Season Over</div>;
	}
	const [, month, day] = nextMatchdate.split("-");
	let content =
		matches.length === 0 ? (
			<div className="bg-brightwhite">No Matches Today</div>
		) : (
			matches.map((match, index) => (
				<MatchRow key={match.fixture.id} match={match} />
			))
		);

	return (
		<div className="md:w-[400px] lg:w-full h-auto">
			<h2 className="cyan-gradient text-brightwhite font-bold text-center text-2xl md:text-3xl py-1 rounded-t-lg">
				{today !== nextMatchdate
					? `Upcoming Matches ${month}/${day}`
					: "Today's Matches"}
			</h2>
			<div className="flex flex-col bg-brightwhite p-1 gap-1">{content}</div>
			<div
				className="bg-brightwhite  text-center font-bold text-darkpurple"
				onClick={() => navigate("/matches")}
			>
				VIEW ALL MATCHES
			</div>
		</div>
	);
};

export default MatchesOverviewTable;
