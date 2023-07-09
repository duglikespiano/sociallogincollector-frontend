export const pageReturn = () => {
	window.opener.location.href = process.env.REACT_APP_FRONTEND_BASE_URL;
	window.close();
};
