import { Fragment } from 'react';
import KakaoLoggedinPage from '../platforms/kakao/KakaoLoggedInPage';
import NaverLoggedinPage from '../platforms/naver/NaverLoggedInPage';
import './LoggedInMainPage.css';

interface Props {
	loggedInPlatform: string;
}

function LoggedInMainPage(props: Props) {
	return (
		<Fragment>
			{props.loggedInPlatform === 'kakao' ? <KakaoLoggedinPage /> : null}
			{props.loggedInPlatform === 'naver' ? <NaverLoggedinPage /> : null}
		</Fragment>
	);
}

export default LoggedInMainPage;
