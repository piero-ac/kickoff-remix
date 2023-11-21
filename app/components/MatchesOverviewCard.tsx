import { convertDateToLocalTime } from "utils/datetime-functions";
export default function MatchesOverviewCard({
	leagueName,
	matches,
}: {
	leagueName: string;
	matches: Match[] | null;
}) {
	// console.log(matches);
	return (
		<div className="bg-gradient-to-t from-lime-100 to-lime-500 p-1 rounded-md shadow-lg">
			<h2 className="text-3xl font-semibold text-white">{leagueName}</h2>
			<div className="flex flex-col bg-green-500 px-1 min-h-[100px] min-w-200px]">
				{matches &&
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
					})}
			</div>
		</div>
	);
}
