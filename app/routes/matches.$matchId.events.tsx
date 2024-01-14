import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	useLoaderData,
	useRouteError,
	isRouteErrorResponse,
} from "@remix-run/react";
import getMatchEvents from "~/api/getMatchEvents";
import CardEvent from "~/components/Events/CardEvent";
import GoalEvent from "~/components/Events/GoalEvent";
import SubstitutionEvent from "~/components/Events/SubstitutionEvent";
import VarEvent from "~/components/Events/VarEvent";
import ErrorCard from "~/components/MatchDataErrorCard";

export async function loader({ params }: LoaderFunctionArgs) {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}
	const events: MatchEvent[] = await getMatchEvents(matchId);
	return json({ events });
}

export default function EventsPage() {
	const { events } = useLoaderData<typeof loader>();

	return (
		<div className="overflow-y-scroll max-h-[390px]">
			<table className="table-auto text-center w-full">
				<thead className="bg-darkpurple text-brightwhite ">
					<th>Time</th>
					<th>Event</th>
					<th>Player</th>
					<th>Info</th>
				</thead>
				<tbody>
					{events.map((event) => {
						const eventType = event.eventType.toLowerCase();
						if (eventType === "card") {
							return <CardEvent key={event._id} event={event} />;
						} else if (eventType === "subst") {
							return <SubstitutionEvent key={event._id} event={event} />;
						} else if (eventType === "goal") {
							return <GoalEvent key={event._id} event={event} />;
						} else {
							return <VarEvent key={event._id} event={event} />;
						}
					})}
				</tbody>
			</table>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<ErrorCard
				title="Events Not Available"
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
