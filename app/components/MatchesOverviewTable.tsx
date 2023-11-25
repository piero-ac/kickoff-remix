import Match from "./Match";

export default function MatchesOverviewTable({
	matches,
}: {
	matches: Match[];
}) {
	if (matches.length === 0) return null;

	const league = matches[0].league.id;
	let src = "";
	switch (league) {
		case 39:
			src = "/img/premierleague-logo.png";
			break;
		case 140:
			src = "/img/laliga-logo.png";
			break;
		case 78:
			src = "/img/bundesliga-logo.png";
			break;
		default:
			src = "/img/website-icon.png";
	}

	return matches.map((match: Match) => (
		<Match key={match.fixture.id} match={match} src={src} />
	));
}
