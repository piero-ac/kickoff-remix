import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
	isRouteErrorResponse,
	useLoaderData,
	useRouteError,
} from "@remix-run/react";
import getMatchStatistics from "~/api/getMatchStatistics";
import MatchStat from "~/components/MatchDetails/Statistics";
import ErrorCard from "~/components/Errors/MatchDataErrorCard";

const loader = async ({ params }: LoaderFunctionArgs) => {
	const matchId = params.matchId;
	if (!matchId) {
		throw new Response("Missing Match Id", { status: 400 });
	}

	const statistics = await getMatchStatistics(matchId);
	return json({ statistics });
};

const StatisticsPage = () => {
	const { statistics } = useLoaderData<typeof loader>();
	const [home, away] = statistics;
	return (
		<div className="overflow-y-scroll max-h-[390px]">
			<table className="table-auto text-center w-full">
				<tbody>
					{home.statistics.map((stat, index) => (
						<MatchStat
							key={index}
							type={stat.type}
							homeValue={stat.value}
							awayValue={away.statistics[index].value}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
export const ErrorBoundary = () => {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<ErrorCard
				title="Statistics Not Available"
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
};

export default StatisticsPage;
