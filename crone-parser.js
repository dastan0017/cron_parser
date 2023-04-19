const [cronString] = process.argv.slice(2);
const [minute, hour, dayOfMonth, month, dayOfWeek, command] = cronString.split(" ");

const MINUTE = parseField(minute, 0, 59).join(" ");
const HOUR = parseField(hour, 0, 23).join(" ");
const DAY_OF_MONTH = parseField(dayOfMonth, 1, 31).join(" ");
const MONTH = parseField(month, 1, 12).join(" ");
const DAY_OF_WEEK = parseField(dayOfWeek, 0, 6).join(" ");

console.table({
	minute: MINUTE,
	hour: HOUR,
	"day of month": DAY_OF_MONTH,
	month: MONTH,
	"day of week": DAY_OF_WEEK,
	command,
});

function parseField(field, min, max) {
	const result = [];

	// Handle the "*" case
	if (field === "*") {
		for (let i = min; i <= max; i++) {
			result.push(i);
		}
		return result;
	}

	// Handle the "*/15" case
	if (/^\*\/\d+$/.test(field)) {  // /^\*\/\d+$/ is testing field starts with */ followed by digits
		const interval = parseInt(field.slice(2), 10);
		for (let i = min; i <= max; i += interval) {
			result.push(i);
		}
		return result;
	}

	// Handle a single value
	if (/^\d+$/.test(field)) {
		const value = parseInt(field, 10);
		if (value >= min && value <= max) {
			result.push(value);
		}
		return result;
	}

	// Handle a list of values
	const list = field.split(",");
	for (const item of list) {

		// 1. Handle the "1,15" case
		if (/^\d+$/.test(item)) {
			const value = parseInt(item, 10);
			if (value >= min && value <= max && !result.includes(value)) {
				result.push(value);
			}


		// 2. Handle "1-5"
		} else if (/^\d+-\d+$/.test(item)) { // to test whether a string is in the format of "start-end"
			const [left, right] = item.split("-");
			const start = parseInt(left, 10);
			const end = parseInt(right, 10);

			for (let i = start; i <= end; i++) {
				if (i >= min && i <= max && !result.includes(i)) {
					result.push(i);
				}
			}
		}
	}

	return result;
}
