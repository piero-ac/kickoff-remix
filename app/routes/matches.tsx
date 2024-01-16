import { json } from "@remix-run/node";
import {
	useLoaderData,
	Outlet,
	useRouteError,
	isRouteErrorResponse,
} from "@remix-run/react";
import getLeagueMatches from "~/api/getLeagueMatches";
import MatchSelectButton from "~/components/MatchSelectButton";
import { getDate } from "utils/datetime-functions";
import { useState } from "react";
import MatchSelectCard from "~/components/MatchSelectCard";
import MatchesHeader from "~/components/MatchesPage/MatchesHeader";

export const loader = async () => {
	const matches: Match[] = await getLeagueMatches("39", "2023");
	return json({ matches });
};

export default function Matches() {
	const { matches } = useLoaderData<typeof loader>();
	const [displayedMatches, setDisplayedMatches] = useState<{
		typeOfMatches: "upcoming" | "past" | "today";
		matches: Match[];
	}>({ typeOfMatches: "today", matches: [] });
	const today = getDate();

	const todaysMatches = matches.filter(
		(match) => match.fixture.date.substring(0, 10) === today
	);

	const pastMatches = matches
		.filter(
			(match) =>
				// includes matches for today and before today and that have completed. And matches that have already been completed
				(match.fixture.date.substring(0, 10) <= today &&
					match.fixture.status.short === "FT") ||
				match.fixture.status.short === "FT" ||
				match.fixture.date.substring(0, 10) < today
		)
		.sort(
			(a, b) =>
				(new Date(b.fixture.date) as any) - (new Date(a.fixture.date) as any)
		);

	const upcomingMatches = matches
		.filter(
			(match) =>
				// includes matches after today or matches that still have NS (such as delayed matches)
				match.fixture.date.substring(0, 10) > today ||
				match.fixture.status.short === "NS"
		)
		.sort(
			(a, b) =>
				(new Date(a.fixture.date) as any) - (new Date(b.fixture.date) as any)
		);

	return (
		<div className="my-1">
			<MatchesHeader />
			<main className="max-w-[1024px] mx-auto flex flex-col md:flex-row gap-2 md:gap-0 items-center md:items-start px-1">
				{/* Match Selection */}
				<section className="w-[350px] h-[300px] md:h-[630px] sm:w-[416px] md:w-[375px] flex flex-col shadow-lg">
					{/* Options to filter matches */}
					<div className="w-full flex flex-row justify-between bg-darkpurple">
						<MatchSelectButton
							text="Today"
							selected={displayedMatches.typeOfMatches === "today"}
							onClick={() =>
								setDisplayedMatches({
									typeOfMatches: "today",
									matches: todaysMatches,
								})
							}
						/>
						<MatchSelectButton
							text="Upcoming"
							selected={displayedMatches.typeOfMatches === "upcoming"}
							onClick={() =>
								setDisplayedMatches({
									typeOfMatches: "upcoming",
									matches: upcomingMatches,
								})
							}
						/>
						<MatchSelectButton
							text="Past"
							selected={displayedMatches.typeOfMatches === "past"}
							onClick={() =>
								setDisplayedMatches({
									typeOfMatches: "past",
									matches: pastMatches,
								})
							}
						/>
					</div>
					{/* Matches to select*/}
					<div className="rounded-sm bg-brightwhite grow overflow-scroll">
						{displayedMatches.matches.length === 0 && (
							<p className="text-slate-500 text-5xl font-semibold uppercase text-center flex items-center h-[460px]">
								No matches available
							</p>
						)}
						{displayedMatches.matches.length > 0 &&
							displayedMatches.matches.map((match) => (
								<MatchSelectCard
									key={match.fixture.id}
									match={match}
									type={displayedMatches.typeOfMatches}
								/>
							))}
					</div>
				</section>
				{/* Match View  */}
				<section className="w-[350px] sm:w-[416px] md:w-auto grow shadow-lg md:h-[630px]">
					<Outlet />
				</section>
			</main>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<div className="my-1">
				<MatchesHeader />
				Server is down.
			</div>
		);
	} else {
		return <div>Unexpected Error!</div>;
	}
}
