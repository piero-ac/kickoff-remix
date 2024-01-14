import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	useLoaderData,
	useRouteError,
	isRouteErrorResponse,
} from "@remix-run/react";
import getMatchLineup from "~/api/getMatchLineup";
import Lineups from "~/components/Lineups";
import ErrorCard from "~/components/MatchDataErrorCard";

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

export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<ErrorCard
				title="Lineups Not Available"
				statusCode={error.status}
				message={error.data.message}
			/>
		);
	} else if (error instanceof Error) {
		return (
			<ErrorCard
				title="Unexpected Error!"
				message={`${error.name} - ${error.message}`}
			/>
		);
	} else {
		return (
			<ErrorCard
				title="Unexpected Error!"
				message="An unexpected error occurred. Please try again later."
			/>
		);
	}
}
