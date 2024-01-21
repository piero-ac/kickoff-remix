import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	useLoaderData,
	Outlet,
	useRouteError,
	isRouteErrorResponse,
} from "@remix-run/react";
import getMatchInfo from "~/api/getMatchInfo";
import { convertDateToLocalTime } from "utils/datetime-functions";
import MatchDetailsHeader from "~/components/MatchDetails/MatchDetailsHeader";
import MatchDetailsHero from "~/components/MatchDetails/MatchDetailsHero";
import MatchDetailsNavigation from "~/components/MatchDetails/MatchDetailsNavigation";

const loader = async ({ params }: LoaderFunctionArgs) => {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const match = await getMatchInfo(matchId);

	return json({ match });
};

const MatchInformation = () => {
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
				<MatchDetailsHero
					fixtureStatus={match.fixture.status.short}
					home={match.teams.home}
					away={match.teams.away}
					score={match.score}
				/>
			</section>
			<section className="flex flex-row justify-center gap-3 bg-limegreen">
				<MatchDetailsNavigation />
			</section>
			<section className="grow">
				<Outlet />
			</section>
		</div>
	);
};

export const ErrorBoundary = () => {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<div className="cyan-gradient text-brightwhite flex flex-col items-center justify-center h-full">
				<p className="text-3xl font-bold">{error.data.title}</p>
				<p>{error.data.message}</p>
			</div>
		);
	} else {
		return (
			<div className="cyan-gradient text-brightwhite flex flex-col items-center justify-center">
				<p className="text-3xl font-bold">Unexpected Error!</p>
				<p>Try again later.</p>
			</div>
		);
	}
};

export default MatchInformation;
