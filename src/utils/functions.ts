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
