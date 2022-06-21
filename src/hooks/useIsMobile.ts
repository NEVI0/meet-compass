import { useState, useEffect } from 'react';
import { getWindowDimensions } from '../utils/functions';

const useIsMobile = () => {
	const [ isMobile, setIsMobile ] = useState<boolean>(false);

	useEffect(() => {
		const handleResize = () => {
			const { width } = getWindowDimensions()
			setIsMobile(width <= 768);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
}

export default useIsMobile;
