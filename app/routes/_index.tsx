import { type MetaFunction } from "@remix-run/node";
import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node";

import getTodaysMatches from "~/api/getTodaysMatches";
import getLeagueStandings from "~/api/getLeagueStandings";
import getMatchdates from "~/api/getMatchdates";
import { getDate, getNextMatchdate } from "utils/datetime-functions";

import Standings from "~/components/Standings";
import MatchesOverviewTable from "~/components/MatchesOverviewTable/MatchesOverviewTable";
import HomeHeader from "~/components/HomeHeader";
import StandingsError from "~/components/Errors/StandingsError";

export const meta: MetaFunction = () => {
	return [
		{ title: "Kickoff" },
		{
			name: "description",
			content: "Stay up to date with your favorite leagues and teams.",
		},
	];
};

export const loader = async () => {
	const today = getDate();
	const matchdates = await getMatchdates(39, "2023");
	const nextMatchdate = getNextMatchdate(matchdates, today);
	const leagueStandings: Standings = await getLeagueStandings("39", "2023");
	let matches: {
		premMatches: Match[];
		seasonComplete: boolean;
		today: string;
		nextMatchdate: string;
	} = {
		premMatches: [],
		seasonComplete: false,
		today,
		nextMatchdate,
	};
	if (nextMatchdate !== "Season Completed") {
		matches.premMatches = await getTodaysMatches(39, "2023", nextMatchdate);
	} else {
		matches.seasonComplete = true;
	}
	return json({ matches, leagueStandings });
};

const Index = () => {
	const { matches, leagueStandings } = useLoaderData<typeof loader>();

	return (
		<div className="my-1">
			<HomeHeader />
			<section className="flex flex-col-reverse sm:flex-row items-center justify-center max-w-5xl mx-auto gap-2 lg:gap-4 px-1">
				{/* League Table */}
				<section className="rounded-lg w-[300px] md:w-[400px]">
					<Standings standings={leagueStandings.standings} />
				</section>
				{/* Live Matches */}
				<aside className="rounded-lg sm:self-start">
					<MatchesOverviewTable
						matches={matches.premMatches}
						seasonComplete={matches.seasonComplete}
						today={matches.today}
						nextMatchdate={matches.nextMatchdate}
					/>
				</aside>
			</section>
		</div>
	);
};

export const ErrorBoundary = () => {
	const error = useRouteError() as Error;

	if (isRouteErrorResponse(error)) {
		if (error.status === 400) {
			return (
				<div className="my-1">
					<HomeHeader />
					<section className="flex flex-col-reverse sm:flex-row items-center justify-center max-w-5xl mx-auto gap-2 lg:gap-4 px-1">
						<StandingsError
							title={error.data.title}
							message={error.data.message}
						/>
					</section>
				</div>
			);
		} else {
			return (
				<div className="my-1">
					<HomeHeader />
					<section className="flex flex-col-reverse sm:flex-row items-center justify-center max-w-5xl mx-auto gap-2 lg:gap-4 px-1">
						<StandingsError
							title="Server is down!"
							message="Check back later."
						/>
					</section>
				</div>
			);
		}
	} else {
		return (
			<div className="my-1">
				<HomeHeader />
				<section className="flex flex-col-reverse sm:flex-row items-center justify-center max-w-5xl mx-auto gap-2 lg:gap-4 px-1">
					<StandingsError
						title="Unexpected Error!"
						message="Please check back later."
					/>
				</section>
			</div>
		);
	}
};

export default Index;
