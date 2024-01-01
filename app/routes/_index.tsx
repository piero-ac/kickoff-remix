import { type MetaFunction } from "@remix-run/node";
import { Suspense } from "react";
import { Await, useLoaderData } from "@remix-run/react";
import { defer } from "@remix-run/node";
import getTodaysMatches from "~/api/getTodaysMatches";
import { getDate } from "utils/datetime-functions";
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
	const premMatches: Promise<Match[]> = getTodaysMatches(39, "2023", today);

	return defer({ premMatches });
};

export default function Index() {
	const { premMatches } = useLoaderData<typeof loader>();

	return (
		<div className="relative h-[sm-height] md:h-[md-height]">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<div className="bg-[url('/img/soccer-pitch-sky.jpg')] bg-cover bg-center h-full"></div>
			</div>
			{/* Content */}
			<div className="absolute inset-0 z-20 mt-14 px-3">
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
					<div className="mt-3 flex flex-col border border-black w-full mx-6 md:max-w-[900px]">
						<h2 className="bg-stone-900">Current Matches</h2>
						<div className="bg-lime-200 text-black max-h-[300px] overflow-auto">
							<Suspense fallback={<p>Loading...</p>}>
								<Await resolve={premMatches}>
									{(resolvedMatches) => (
										<MatchesOverviewTable matches={resolvedMatches} />
									)}
								</Await>
							</Suspense>
						</div>
					</div>
				</div>
			</div>
			{/* Overlay */}
			<div className="absolute inset-0 bg-green-600 opacity-50 z-10"></div>
		</div>
	);
}
