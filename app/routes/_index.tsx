import { type MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import { Await, useLoaderData, useRouteError } from "@remix-run/react";
import { defer, json } from "@remix-run/node";
import getTodaysMatches from "~/api/getTodaysMatches";
import getLeagueStandings from "~/api/getLeagueStandings";
import getMatchdates from "~/api/getMatchdates";
import { getDate } from "utils/datetime-functions";
import Standings from "~/components/Standings";
import MatchesOverviewTable from "~/components/MatchesOverviewTable";

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
	// const matchdates = await getMatchdates(39, "2023");
	const premMatches: Match[] = await getTodaysMatches(39, "2023", today);
	const leagueStandings: Standings = await getLeagueStandings("39", "2023");
	return json({ premMatches, leagueStandings });
};

export default function Index() {
	const { premMatches, leagueStandings } = useLoaderData<typeof loader>();

	return (
		<div>
			{/* Header */}
			<header className="mt-5 mb-5 h-[200px] cyan-gradient flex justify-center items-center">
				<h1 className=" text-brightwhite font-bold text-7xl">Premier League</h1>
			</header>
			<section className="flex flex-col sm:flex-row items-center justify-center max-w-5xl mx-auto gap-4 px-1">
				{/* League Table */}
				<section className="rounded-lg w-[300px] md:w-[400px]">
					<Standings standings={leagueStandings.standings} />
				</section>
				{/* Live Matches */}
				<aside className="border grow rounded-lg">
					<MatchesOverviewTable matches={premMatches} />
				</aside>
			</section>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError() as Error;
	return (
		<div>
			<h1>Something went wrong!</h1>
			{error.message}
		</div>
	);
}
