import { useState, useEffect, Fragment } from 'react';
import LoadingPage from '../../common/LoadingPage';
import { kakaoUserInfoFetchWithAccesstoken } from './KakaoVariables';

function KakaoRedirect() {
	const [isReadyToFecth, setIsReadyToFetch] = useState(false);

	useEffect(() => {
		setIsReadyToFetch(true);

		if (isReadyToFecth) {
			kakaoUserInfoFetchWithAccesstoken();
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

export default KakaoRedirect;
