export const isEmpty = (object: any) => {
	if (object === null || object === undefined) return true;
	return Object.keys(object).length === 0;
}
