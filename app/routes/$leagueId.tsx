import { json, defer, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Await } from "@remix-run/react";
import {
	getLeagueInfo,
	getLeagueStandings,
} from "utils/api-football-functions";
import Standings from "~/components/Standings";
import { Suspense } from "react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	if (params.leagueId === undefined) {
		throw json({ message: "Missing league id" }, { status: 400 });
	}

	if (!["39", "140", "78"].includes(params.leagueId)) {
		throw json({ message: "Invalid league id" }, { status: 400 });
	}

	const leagueStandingsPromise: Promise<Standings[]> = getLeagueStandings(
		params.leagueId,
		"2023"
	);
	const leagueInfoArray: League[] = await getLeagueInfo(params.leagueId);
	const leagueInfo = leagueInfoArray[0];
	return defer({ leagueInfo, leagueStandings: leagueStandingsPromise });
};

export default function LeaguePage() {
	const { leagueInfo, leagueStandings } = useLoaderData<typeof loader>();

	return (
		<div className="border border-black flex flex-col md:flex-row justify-center items-center md:items-start gap-4 mt-3 md:mt-6 w-[100vw]">
			{/* Card with League Info + Standings Table */}
			<div className="text-white py-2 px-2 min-h-[500px] w-[325px] md:w-[450px] bg-stone-900 rounded-sm">
				{/* League Info */}
				<div className="flex flex-row items-center h-[75px] justify-between">
					<h1 className="text-2xl md:text-4xl text-bold uppercase">
						{leagueInfo.league.name}
					</h1>
					{leagueInfo.league.logo && (
						<div className="bg-slate-100 rounded-sm">
							<img
								src={leagueInfo.league.logo}
								alt={`Logo of ${leagueInfo.league.name}`}
								height="50px"
								width="50px"
							/>
						</div>
					)}
				</div>
				{/* Standings Table */}
				<Suspense fallback={<p>Loading...</p>}>
					<Await resolve={leagueStandings}>
						{(resolvedStandings) => <Standings standings={resolvedStandings} />}
					</Await>
				</Suspense>
			</div>
			<div className="border border-blue-700">Matches</div>
		</div>
	);
}
