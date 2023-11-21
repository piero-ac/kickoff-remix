type Match = {
	fixture: {
		id: number;
		referee: string;
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
	};
	league: {
		id: number;
		name: string;
		country: string;
		logo: string;
		flag: string;
		season: number;
		round: string;
	};
	teams: {
		home: {
			id: number;
			name: string;
			logo: string;
			winner: boolean;
		};
		away: {
			id: number;
			name: string;
			logo: string;
			winner: boolean;
		};
	};
	goals: {
		home: number | null;
		away: number | null;
	};
	score: {
		halftime: {
			home: number | null;
			away: number | null;
		};
		fulltime: {
			home: number | null;
			away: number | null;
		};
		extratime: {
			home: number | null;
			away: number | null;
		};
		penalty: {
			home: number | null;
			away: number | null;
		};
	};
};
