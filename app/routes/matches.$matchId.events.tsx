import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import getMatchEvents from "~/api/getMatchEvents";
import CardEvent from "~/components/Events/CardEvent";
import GoalEvent from "~/components/Events/GoalEvent";
import SubstitutionEvent from "~/components/Events/SubstitutionEvent";
import VarEvent from "~/components/Events/VarEvent";

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
