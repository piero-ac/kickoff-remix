import { type MetaFunction } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { json } from "@remix-run/node";
import getTodaysMatches from "~/api/getTodaysMatches";
import getLeagueStandings from "~/api/getLeagueStandings";
import getMatchdates from "~/api/getMatchdates";
import { getDate, getNextMatchdate } from "utils/datetime-functions";
import Standings from "~/components/Standings";
import MatchesOverviewTable from "~/components/MatchesOverviewTable/MatchesOverviewTable";

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

export default function Index() {
	const { matches, leagueStandings } = useLoaderData<typeof loader>();

	return (
		<div className="my-1">
			{/* Header */}
			<header className="mt-5 mb-5 h-[150px] md:h-[200px] cyan-gradient flex flex-col sm:flex-row justify-center items-center">
				<h1 className=" text-brightwhite font-bold text-5xl md:text-7xl ">
					Premier League
				</h1>
				<img
					src="/img/premierleague-logo.png"
					className="h-[50px] w-[50px] md:h-[120px] md:w-[120px]"
					alt="Premier League Logo"
				/>
			</header>
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
