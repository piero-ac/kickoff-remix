import { json } from "@remix-run/node";

const headers = new Headers();
headers.append("X-RapidAPI-Key", process.env.RAPIDAPI_API_KEY as string);
headers.append("X-RapidAPI-Host", process.env.RAPIDAPI_HOST as string);

const options: RequestInit = {
	method: "GET",
	headers: headers,
};

export async function getTodaysMatches(
	leagueId: number,
	season: string,
	date: string
) {
	try {
		const response = await fetch(
			`https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${date}&league=${leagueId}&season=${season}`,
			options
		);
		if (!response.ok) {
			throw json({ message: "Could not fetch fixtures" }, { status: 500 });
		}

		const result = await response.json();
		const matches = await result.response;
		return matches;
	} catch (error: any) {
		if (error instanceof Error)
			throw json(
				{
					message: error.message,
				},
				{ status: 500 }
			);
	}
}

export async function getLeagueInfo(leagueId: string) {
	try {
		const response = await fetch(
			`https://api-football-v1.p.rapidapi.com/v3/leagues?id=${leagueId}`,
			options
		);
		if (!response.ok) {
			throw json({ message: "Could not fetch league info" }, { status: 500 });
		}

		const result = await response.json();
		const league = await result.response;
		return league;
	} catch (error: any) {
		if (error instanceof Error)
			throw json(
				{
					message: error.message,
				},
				{ status: 500 }
			);
	}
}
