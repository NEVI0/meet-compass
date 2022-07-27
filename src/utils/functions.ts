export const isEmpty = (object: any) => {
	if (object === null || object === undefined) return true;
	return Object.keys(object).length === 0;
}

export const getWindowDimensions = () => {
	try {
		const { innerWidth: width, innerHeight: height } = window;
  		return { width, height };
	} catch (error) {
		return { width: 0, height: 0 };
	}
}

export const isLink = (text: string) => {
	const linkRegex = new RegExp(
		'^(https?:\\/\\/)?'+
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
		'((\\d{1,3}\\.){3}\\d{1,3}))'+
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
		'(\\?[;&a-z\\d%_.~+=-]*)?'+
		'(\\#[-a-z\\d_]*)?$','i'
	);

	return !!linkRegex.test(text);
}

export const hasKeyWorkInWarning = (message: string) => {
	return message.includes('componentWillUpdate');
}
