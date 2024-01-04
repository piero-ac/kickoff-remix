import Match from "./Match";
import { convertDateToLocalTime } from "utils/datetime-functions";

export default function MatchesOverviewTable({
	matches,
}: {
	matches: Match[];
}) {
	let content =
		matches.length === 0 ? (
			<div className="bg-brightwhite">No Matches Today</div>
		) : (
			matches.map((match) => {
				const { time } = convertDateToLocalTime(match.fixture.date);
				return (
					<div key={match.fixture.id}>
						<p>
							{match.teams.home.name} vs {match.teams.away.name}
						</p>
						<p>{time}</p>
					</div>
				);
			})
		);

	return (
		<div className="w-full h-auto">
			<h2 className="cyan-gradient text-brightwhite font-bold text-center text-3xl py-1 rounded-t-lg">
				{matches.length === 0 ? "Upcoming Matches" : "Today's Matches"}
			</h2>
			<div className="flex flex-col">{content}</div>
		</div>
	);
}
