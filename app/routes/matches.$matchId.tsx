import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getMatchInfo from "~/api/getMatchInfo";
import getMatchLineup from "~/api/getMatchLineup";
import { convertDateToLocalTime } from "utils/datetime-functions";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const match = await getMatchInfo(matchId);
	// const lineup = await getMatchLineup(matchId);
	return json({ match });
}

export default function MatchInformation() {
	const { match } = useLoaderData<typeof loader>();
	const dateLocalTime = convertDateToLocalTime(match.fixture.date);
	const date = `${dateLocalTime.day} ${dateLocalTime.month} ${dateLocalTime.year}`;
	// const [home, away] = lineup;

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
					<div className="flex flex-row items-center gap-1">
						<img src="/img/user-2-line.svg" alt="Referee Icon" width="15px" />{" "}
						{match.fixture.referee}
					</div>
				)}
			</header>
			{match.fixture.id}
		</div>
	);
}
