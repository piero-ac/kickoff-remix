import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, NavLink, Outlet } from "@remix-run/react";
import getMatchInfo from "~/api/getMatchInfo";
import { convertDateToLocalTime } from "utils/datetime-functions";
import MatchDetailsHeader from "~/components/MatchPage/MatchDetailsHeader";
import MatchHero from "~/components/MatchPage/MatchHero";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const match = await getMatchInfo(matchId);

	return json({ match });
}

export default function MatchInformation() {
	const { match } = useLoaderData<typeof loader>();
	const dateLocalTime = convertDateToLocalTime(match.fixture.date);
	const date = `${dateLocalTime.day} ${dateLocalTime.month} ${dateLocalTime.year}`;

	return (
		<div className="bg-brightwhite h-full p-1 flex flex-col">
			<header className="flex flew-row shadow-sm text-sm justify-evenly text-darkpurple">
				<MatchDetailsHeader
					date={date}
					time={dateLocalTime.time}
					venue={match.fixture.venue.name}
					referee={match.fixture.referee}
				/>
			</header>
			<section className="flex flex-row justify-between mt-3 p-1 cyan-gradient">
				<MatchHero
					home={match.teams.home}
					away={match.teams.away}
					score={match.score}
				/>
			</section>
			<section className="flex flex-row justify-center gap-3 bg-limegreen">
				<NavLink
					to="lineups"
					className={({ isActive, isPending }) =>
						isActive ? "font-semibold uppercase" : ""
					}
				>
					Lineups
				</NavLink>
				<NavLink
					to="events"
					className={({ isActive, isPending }) =>
						isActive ? "font-semibold uppercase" : ""
					}
				>
					Events
				</NavLink>
				<NavLink
					to="statistics"
					className={({ isActive, isPending }) =>
						isActive ? "font-semibold uppercase" : ""
					}
				>
					Stats
				</NavLink>
			</section>
			<section className="grow">
				<Outlet />
			</section>
		</div>
	);
}
