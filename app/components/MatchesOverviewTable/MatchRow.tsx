import { useNavigate } from "@remix-run/react";
import MatchTeamCard from "./MatchTeamCard";
import MatchStatusCard from "./MatchStatusCard";
import MatchStadiumCard from "./MatchStadiumCard";

export default function MatchRow({ match }: { match: Match }) {
	const navigate = useNavigate();

	return (
		<div
			key={match.fixture.id}
			className="flex flex-col items-center lg:flex-row md:justify-between text-darkpurple pb-1 border-b border-b-cyan"
			onClick={() => navigate(`/matches/${match.fixture.id}`)}
		>
			<div className="flex flex-row text-end">
				<MatchTeamCard team={match.teams.home} isHomeTeam={true} />
				<MatchStatusCard fixture={match.fixture} />
				<MatchTeamCard team={match.teams.away} isHomeTeam={false} />
			</div>
			<MatchStadiumCard name={match.fixture.venue.name} />
		</div>
	);
}
