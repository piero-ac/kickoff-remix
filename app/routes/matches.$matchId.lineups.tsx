import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getMatchLineup from "~/api/getMatchLineup";
import Lineups from "~/components/Lineups";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const lineups = await getMatchLineup(matchId);
	return json({ lineups });
}

export default function LineupPage() {
	const { lineups } = useLoaderData<typeof loader>();
	return <Lineups lineups={lineups} />;
}
