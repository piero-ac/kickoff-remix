import { useNavigate, useLocation } from "@remix-run/react";
import { convertDateToLocalTime } from "utils/datetime-functions";

export default function MatchSelectCard({
	match,
	type,
}: {
	match: Match;
	type: "upcoming" | "past" | "today";
}) {
	const navigate = useNavigate();
	const location = useLocation();
	const matchId: string | undefined = location.pathname.split("/")[2];
	const dateLocalTime = convertDateToLocalTime(match.fixture.date);
	const date = `${dateLocalTime.day} ${dateLocalTime.month} ${dateLocalTime.year}`;
	return (
		<div
			className={
				`border-b border-b-cyan flex flex-row items-center min-h-[50px] hover:cyan-gradient hover:text-brightwhite font-semibold px-1 ` +
				(matchId && Number(matchId) === match.fixture.id && "cyan-gradient")
			}
			onClick={() => navigate(`/matches/${match.fixture.id}`)}
		>
			<img
				src={match.teams.home.logo}
				alt={`Logo of ${match.teams.home.name}`}
				height="30px"
				width="30px"
				className="flex-shrink-0"
			/>
			<div className="w-[100px] text-center text-sm">
				<p>{date}</p>
				{type !== "upcoming" && (
					<p>
						{match.goals.home}-{match.goals.away}
					</p>
				)}
				{type !== "upcoming" && type !== "past" && (
					<p>{match.fixture.status.elapsed}</p>
				)}
			</div>
			<img
				src={match.teams.away.logo}
				alt={`Logo of ${match.teams.away.name}`}
				height="30px"
				width="30px"
				className="flex-shrink-0"
			/>
			<div className="text-sm flex flex-col items-center grow">
				<p>{match.teams.home.name} (H)</p>
				<p>{match.teams.away.name} (A)</p>
			</div>
		</div>
	);
}
