import { useState, useEffect, Fragment } from 'react';
import { naverUserInfoFetchWithAccesstoken } from '../naver/naverVariables';
import LoadingPage from '../../common/LoadingPage';

function NaverRedirect() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		setIsReadyToFetch(true);
		naverUserInfoFetchWithAccesstoken();
		if (isReadyToFecth) {
		}

		return () => {
			setIsReadyToFetch(false);
		};
	}, [isReadyToFecth]);

	return (
		<Fragment>
			<LoadingPage />
		</Fragment>
	);
}

export default NaverRedirect;
