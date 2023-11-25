import { type MetaFunction } from "@remix-run/node";
import MatchesOverviewCard from "~/components/MatchesOverviewCard";
import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import { defer } from "@remix-run/node";
import { getTodaysMatches } from "utils/api-football-functions";
import { getDate } from "utils/datetime-functions";

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
	const premMatches: Promise<Match[]> = getTodaysMatches(39, "2023", today);
	const ligaMatches: Promise<Match[]> = getTodaysMatches(140, "2023", today);
	const bundesMatches: Promise<Match[]> = getTodaysMatches(78, "2023", today);
	// throws error if any of these return undefined
	return defer({ premMatches, ligaMatches, bundesMatches });
};

export default function Index() {
	const { premMatches, ligaMatches, bundesMatches } =
		useLoaderData<typeof loader>();

	return (
		<div className="relative w-screen h-screen">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<div className="bg-[url('/img/soccer-pitch-sky.jpg')] bg-cover bg-center w-full h-full"></div>
			</div>
			{/* Content */}
			<div className="absolute inset-0 z-20 mt-14">
				<div className="text-white flex flex-col text-center items-center">
					<h1 className="hidden md:block text-lime-500 font-bold text-9xl italic mb-5">
						Kick⚽ff
					</h1>
					<p className="text-3xl sm:text-4xl sm:w-[400px] md:text-5xl font-semibold text-lime-100 md:w-[500px]">
						View <span className="green-gradient ">Matches</span>,
						<span className="green-gradient"> Scores</span>, and
						<span className="green-gradient"> Statistics</span>!
					</p>
					<div className="mt-3 md:mt-5 text-4xl md:text-6xl green-gradient">
						&#x21e3;
					</div>
					<div className="flex flex-col flex-wrap sm:flex-row items-center justify-between sm:justify-center mx-2 px-2 py-6 gap-3">
						<Suspense fallback={<p>Loading...</p>}>
							<Await resolve={premMatches}>
								{(resolvedMatches) => (
									<MatchesOverviewCard
										leagueName="Premier League"
										matches={resolvedMatches}
									/>
								)}
							</Await>
						</Suspense>
						<Suspense fallback={<p>Loading...</p>}>
							<Await resolve={ligaMatches}>
								{(resolvedMatches) => (
									<MatchesOverviewCard
										leagueName="La Liga"
										matches={resolvedMatches}
									/>
								)}
							</Await>
						</Suspense>
						<Suspense fallback={<p>Loading...</p>}>
							<Await resolve={bundesMatches}>
								{(resolvedMatches) => (
									<MatchesOverviewCard
										leagueName="Bundesliga"
										matches={resolvedMatches}
									/>
								)}
							</Await>
						</Suspense>
					</div>
				</div>
			</div>
			{/* Overlay */}
			<div className="absolute inset-0 bg-green-600 opacity-50 z-10"></div>
		</div>
	);
}
