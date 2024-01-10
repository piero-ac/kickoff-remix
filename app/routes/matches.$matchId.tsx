import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getMatchInfo from "~/api/getMatchInfo";
import getMatchLineup from "~/api/getMatchLineup";
import { convertDateToLocalTime } from "utils/datetime-functions";
import Lineups from "~/components/Lineups";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const match = await getMatchInfo(matchId);
	const lineups = await getMatchLineup(matchId);
	return json({ match, lineups });
}

export default function MatchInformation() {
	const { match, lineups } = useLoaderData<typeof loader>();
	const dateLocalTime = convertDateToLocalTime(match.fixture.date);
	const date = `${dateLocalTime.day} ${dateLocalTime.month} ${dateLocalTime.year}`;

	return (
		<div className="bg-brightwhite h-full p-1">
			<header className="flex flew-row shadow-sm text-sm justify-evenly text-darkpurple">
				<div className="flex flex-row items-center gap-1">
					<img
						src="/img/calendar-event-line.svg"
						alt="Calendar Icon"
						width="15px"
					/>
					{date}
				</div>
				<div className="flex flex-row items-center gap-1">
					<img src="/img/time-line.svg" alt="Clock Icon" width="15px" />
					{dateLocalTime.time}
				</div>
				<div className="flex flex-row items-center gap-1">
					<img
						src="/img/treasure-map-line.svg"
						alt="Venue Location Icon"
						width="15px"
					/>
					{match.fixture.venue.name}
				</div>
				{match.fixture.referee && (
					<div className="hidden lg:flex flex-row items-center gap-1">
						<img src="/img/user-2-line.svg" alt="Referee Icon" width="15px" />{" "}
						{match.fixture.referee}
					</div>
				)}
			</header>
			<section className="flex flex-row justify-between mt-3 p-1 border-b border-b-darkpurple">
				<div className="flex flex-col items-center text-darkpurple font-bold grow">
					<img
						src={match.teams.home.logo}
						alt={`${match.teams.home.name}'s Logo`}
						className="w-[60px] sm:w-[80px] md:w-[100px]"
					/>

					<p>{match.teams.home.name}</p>
				</div>
				<div className="bg-darkpurple rounded-lg text-white w-[150px] sm:w-[160px] flex flex-col items-center justify-center">
					<p className="text-3xl sm:text-4xl font-bold">
						{match.score.fulltime.home} - {match.score.fulltime.away}
					</p>
					<p className="text-sm sm:text-lg">
						Halftime: {match.score.halftime.home} - {match.score.halftime.away}
					</p>
				</div>
				<div className="flex flex-col items-center text-darkpurple font-bold grow">
					<img
						src={match.teams.away.logo}
						alt={`${match.teams.away.name}'s Logo`}
						className="w-[60px] sm:w-[80px] md:w-[100px]"
					/>
					<p>{match.teams.away.name}</p>
				</div>
			</section>
			<section className="mt-1">
				<Lineups lineups={lineups} />
			</section>
		</div>
	);
}
