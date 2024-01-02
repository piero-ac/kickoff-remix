import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getLeagueStandings from "~/api/getLeagueStandings";
import Standings from "~/components/Standings";
import LeagueInfo from "~/components/LeagueInfo";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	if (params.leagueId === undefined) {
		throw json({ message: "Missing league id" }, { status: 400 });
	}

	if (!["39"].includes(params.leagueId)) {
		throw json({ message: "Invalid league id" }, { status: 400 });
	}

	const leagueStandings: Standings = await getLeagueStandings(
		params.leagueId,
		"2023"
	);

	return json({ leagueStandings });
};

export default function LeaguePage() {
	const {
		leagueStandings: { league, standings },
	} = useLoaderData<typeof loader>();

	return (
		<div className="border border-black flex flex-col md:flex-row justify-center items-center md:items-start gap-4 mt-3 md:mt-6 w-[100vw]">
			{/* Card with League Info + Standings Table */}
			<div className="text-white py-2 px-2 min-h-[500px] w-[325px] md:w-[450px] bg-stone-900 rounded-sm">
				<LeagueInfo leagueInfo={league} />
				<Standings standings={standings} />
			</div>
			<div className="border border-blue-700">Matches</div>
		</div>
	);
}
