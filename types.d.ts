interface Fixture {
	id: number;
	referee: string | null;
	timezone: string;
	date: string;
	timestamp: number;
	periods: {
		first: number;
		second: number;
	};
	venue: {
		id: number;
		name: string;
		city: string;
	};
	status: {
		long: string;
		short: string;
		elapsed: number;
	};
	_id: string;
}

interface Team {
	id: number;
	name: string;
	logo: string;
	winner: boolean;
	_id: string;
}

interface Goals {
	home: number;
	away: number;
	_id: string;
}

interface League {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
	round: string;
	_id: string;
}

interface Score {
	halftime: Goals;
	fulltime: Goals;
	extratime: Goals;
	penalty: Goals;
	_id: string;
}

interface Match {
	_id: string;
	fixture: Fixture;
	league: League;
	teams: {
		home: Team;
		away: Team;
	};
	goals: Goals;
	score: Score;
	updatedAt: string;
}

type LeagueInfo = Omit<League, "round">;

type Season = {
	year: number;
	start: string;
	end: string;
	current: boolean;
	coverage: {
		fixtures: {
			events: boolean;
			lineups: boolean;
			statistics_fixtures: boolean;
			statistics_players: boolean;
		};
		standings: boolean;
		players: boolean;
		top_scorers: boolean;
		top_assists: boolean;
		top_cards: boolean;
		injuries: boolean;
		predictions: boolean;
		odds: boolean;
	};
};

interface Standings {
	_id: string;
	league: League;
	standings: [TeamStanding];
	updatedAt: string;
}

interface TeamStanding {
	rank: number;
	team: Omit<Team, "winner">;
	points: number;
	goalsDiff: number;
	group: string;
	form: string;
	status: string;
	description: string;
	all: {
		played: number;
		win: number;
		draw: number;
		lose: number;
		goals: { for: number; against: number };
	};
	home: {
		played: number;
		win: number;
		draw: number;
		lose: number;
		goals: { for: number; against: number };
	};
	away: {
		played: number;
		win: number;
		draw: number;
		lose: number;
		goals: { for: number; against: number };
	};
	update: string;
	_id: string;
}

interface PlayerLineupInfo {
	id: number;
	name: string;
	number: number;
	pos: string;
	grid: string | null;
}

interface Lineup {
	coach: {
		id: number;
		name: string;
		photo: string;
	};
	id: number;
	name: string;
	logo: string;
	colors: {
		player: {
			primary: string;
			number: string;
			border: string;
		};
		goalkeeper: {
			primary: string;
			number: string;
			border: string;
		};
	};
	formation: string;
	startXI: PlayerLineupInfo[];
	substitutes: PlayerLineupInfo[];
}

interface Event {
	time: {
		elapsed: number;
		extra: number | null;
	};
	team: {
		id: number;
		name: string;
		logo: string;
	};
	player: {
		id: number;
		name: string;
	};
	assist: {
		id: number;
		name: string;
	};
	eventType: string;
	detail: string | null;
	comments: string | null;
}
