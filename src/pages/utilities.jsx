function timeAgo(inputDate) {
	if (inputDate === null) return 'never'

	const now = new Date()
	now.setHours(0, 0, 0, 0)

	const normalizedInputDate = new Date(inputDate)
	normalizedInputDate.setHours(0, 0, 0, 0)

	const timeDifference = now.getTime() - normalizedInputDate.getTime()
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

	if (daysDifference === 0) return 'today'
	else if (daysDifference === 1) return 'yesterday'
	else if (daysDifference <= 7) return `${daysDifference} days ago`
	else if (daysDifference <= 14) return 'over a week ago'
	else if (daysDifference <= 21) return 'over 2 weeks ago'
	else if (daysDifference <= 28) return 'over 3 weeks ago'
	else if (daysDifference <= 32) return 'over a month ago'
	else {
		const months = Math.floor(daysDifference / 30)
		return `over ${months} months ago`
	}
}

function expirationSentence(targetDate) {
	const now = new Date();
	const oneDay = 1000 * 60 * 60 * 24;
	const oneWeek = oneDay * 7;
	const oneMonth = oneDay * 30;
	const oneYear = oneDay * 365;

	const diff = targetDate.getTime() - now.getTime();

	if (diff < 0) {
		return "expired";
	} else if (diff === 0) {
		return "expires today!";
	} else if (diff < oneDay) {
		return "expires tomorrow!";
	} else if (diff < oneWeek) {
		const days = Math.round(diff / oneDay);
		return `expires in ${days}`;
	} else if (diff < oneMonth) {
		const weeks = Math.round(diff / oneWeek);
		return weeks === 1 ? `expires in ${weeks} week` : `expires in ${weeks} weeks`;
	} else if (diff < oneYear) {
		const months = Math.round(diff / oneMonth);
		return months === 1 ? `expires in ${months} month` : `expires in ${months} months`;
	} else {
		const years = now.getFullYear() - targetDate.getFullYear();
		return years === 1 ? "expires next year" : `expires in ${years} years`;
	}
}

export { timeAgo, expirationSentence }
