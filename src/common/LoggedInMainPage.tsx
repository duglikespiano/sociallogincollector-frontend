import { Fragment } from 'react';
import KakaoLoggedinPage from '../platforms/kakao/KakaoLoggedInPage';
import NaverLoggedinPage from '../platforms/naver/NaverLoggedInPage';
import GoogleLoggedinPage from '../platforms/google/GoogleLoggedInPage';
import './LoggedInMainPage.css';

interface Props {
	loggedInPlatform: string;
}

function LoggedInMainPage(props: Props) {
	return (
		<Fragment>
			{props.loggedInPlatform === 'kakao' ? <KakaoLoggedinPage /> : null}
			{props.loggedInPlatform === 'naver' ? <NaverLoggedinPage /> : null}
			{props.loggedInPlatform === 'google' ? <GoogleLoggedinPage /> : null}
		</Fragment>
	);
}

export default LoggedInMainPage;
