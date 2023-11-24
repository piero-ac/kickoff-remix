import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getLeagueInfo } from "utils/api-football-functions";

const standings = [
	{
		ranking: 1,
		name: "Team 1",
		gamesPlayed: 10,
		gamesWon: 8,
		gamesLost: 1,
		gamesDrew: 1,
		goalsFor: 25,
		goalsAgainst: 8,
		goalDifference: 17,
		points: 25,
	},
	{
		ranking: 2,
		name: "Team 2",
		gamesPlayed: 10,
		gamesWon: 7,
		gamesLost: 2,
		gamesDrew: 1,
		goalsFor: 20,
		goalsAgainst: 10,
		goalDifference: 10,
		points: 22,
	},
	{
		ranking: 3,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 4,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 5,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 6,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 7,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 8,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 9,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 10,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 11,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 12,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 13,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 14,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 15,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 16,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 17,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 18,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 19,
		name: "Team 3",
		gamesPlayed: 10,
		gamesWon: 6,
		gamesLost: 3,
		gamesDrew: 1,
		goalsFor: 18,
		goalsAgainst: 12,
		goalDifference: 6,
		points: 19,
	},
	{
		ranking: 20,
		name: "Team 20",
		gamesPlayed: 10,
		gamesWon: 1,
		gamesLost: 8,
		gamesDrew: 1,
		goalsFor: 7,
		goalsAgainst: 25,
		goalDifference: -18,
		points: 4,
	},
];

export const loader = async ({ params }: LoaderFunctionArgs) => {
	if (params.leagueId === undefined) {
		throw json({ message: "Missing league id" }, { status: 400 });
	}

	if (!["39", "140", "78"].includes(params.leagueId)) {
		throw json({ message: "Invalid league id" }, { status: 400 });
	}

	const leagueInfoArray: League[] = await getLeagueInfo(params.leagueId);
	const leagueInfo = leagueInfoArray[0];
	return json({ leagueInfo });
};

export default function LeaguePage() {
	const { leagueInfo } = useLoaderData<typeof loader>();

	return (
		<div className="border border-black flex flex-col md:flex-row justify-center items-center md:items-start gap-4 mt-3 md:mt-6 w-[100vw]">
			{/* Card with League Info + Standings Table */}
			<div className="text-white py-2 px-2 min-h-[500px] w-[325px] md:w-[425px]  bg-stone-900 rounded-sm">
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
				<table className="bg-lime-600 w-full text-black">
					<thead className="bg-lime-700">
						<th>#</th>
						<th className="w-[120px]">Team</th>
						<th>P</th>
						<th>W</th>
						<th>D</th>
						<th>L</th>
						<th className="hidden md:table-cell">F</th>
						<th className="hidden md:table-cell">A</th>
						<th className="hidden md:table-cell">GD</th>
						<th>Pts</th>
					</thead>
					<tbody>
						{standings.map((team, index) => (
							<tr
								key={team.ranking}
								className={`text-center ${
									index % 2 === 0 ? "" : "bg-lime-200"
								}`}
							>
								<td>{team.ranking}</td>
								<td className="flex flex-row w-[120px]">
									<img
										src={leagueInfo.league.logo as string}
										alt={`Logo of ${leagueInfo.league.name}`}
										height="20px"
										width="20px"
										className="ml-3 mr-3"
									/>
									{team.name}
								</td>
								<td>{team.gamesPlayed || 0}</td>
								<td>{team.gamesWon || 0}</td>
								<td>{team.gamesDrew || 0}</td>
								<td>{team.gamesLost || 0}</td>
								<td className="hidden md:table-cell">{team.goalsFor || 0}</td>
								<td className="hidden md:table-cell">
									{team.goalsAgainst || 0}
								</td>
								<td className="hidden md:table-cell">
									{team.goalDifference || 0}
								</td>
								<td>{team.points || 0}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="border border-blue-700">Matches</div>
		</div>
	);
}
