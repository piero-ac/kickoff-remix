import { useNavigate } from "@remix-run/react";
import { convertDateToLocalTime } from "utils/datetime-functions";

export default function MatchesOverviewTable({
	matches,
	seasonComplete,
	today,
	nextMatchdate,
}: {
	matches: Match[];
	seasonComplete: boolean;
	today: string;
	nextMatchdate: string;
}) {
	const navigate = useNavigate();
	if (seasonComplete) {
		return <div className="w-full h-auto">Season Over</div>;
	}
	const [, month, day] = nextMatchdate.split("-");
	let content =
		matches.length === 0 ? (
			<div className="bg-brightwhite">No Matches Today</div>
		) : (
			matches.map((match, index) => {
				const { time } = convertDateToLocalTime(match.fixture.date);
				return (
					<div
						key={match.fixture.id}
						className={`flex flex-col items-center lg:flex-row md:justify-between text-darkpurple pb-1 ${"border-b border-b-cyan"}`}
						onClick={() => navigate(`/matches/${match.fixture.id}`)}
					>
						<div className="flex flex-row text-end">
							<p className=" text-sm w-[116px] md:min-w-[180px]">
								{match.teams.home.name}{" "}
								<img
									src={match.teams.home.logo}
									alt={`Logo of ${match.teams.home.name}`}
									height="25px"
									width="25px"
									className="inline"
								/>
							</p>
							<p className="mx-1 px-1 border border-slate-500 min-w-[50px] text-center rounded">
								{time.split(" ")[0]}
							</p>
							<p className="text-sm w-[116px] md:min-w-[180px] text-start truncate">
								<img
									src={match.teams.away.logo}
									alt={`Logo of ${match.teams.away.name}`}
									height="25px"
									width="25px"
									className="inline"
								/>{" "}
								{match.teams.away.name}
							</p>
						</div>
						<div className="md:w-[130px] text-sm justify-between font-semibold flex items-center gap-1">
							{match.fixture.venue.name}
							<img
								src="/img/next.png"
								alt="Arrow Icon"
								height="10px"
								width="10px"
							/>
						</div>
					</div>
				);
			})
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
}
