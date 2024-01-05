export function convertDateToLocalTime(date: string) {
	const utcDate = new Date(date);
	const localDay = utcDate.getDate();
	const localMonth = new Intl.DateTimeFormat("en-US", {
		month: "short",
	}).format(utcDate);
	const localYear = utcDate.getFullYear();
	const localTime = utcDate.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});
	const timeZone = new Intl.DateTimeFormat("en-US", {
		timeZoneName: "short",
	}).format(utcDate);

	// Create an object with the local date and time properties
	const localDateObject = {
		day: localDay,
		month: localMonth,
		year: localYear,
		time: localTime,
		timezone: timeZone,
	};

	return localDateObject;
}

export function getDate() {
	// Create a new Date object for today's date
	const today = new Date();

	// Get the year, month, and day
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
	const day = String(today.getDate()).padStart(2, "0");

	// Construct the date in YYYY-MM-DD format
	const formattedDate = `${year}-${month}-${day}`;
	return formattedDate;
}

export function getNextMatchdate(matchdates: string[], today: string) {
	const indexOfToday = matchdates.indexOf(today);

	if (indexOfToday === -1) {
		// If today's date is not in the array, find the next available date
		const nextDateIndex = matchdates.findIndex((date) => date > today);

		if (nextDateIndex !== -1) {
			const nextAvailableDate = matchdates[nextDateIndex];
			return nextAvailableDate;
			// Use nextAvailableDate as needed
		} else {
			return "Season Completed";
		}
	} else {
		return today;
	}
}
