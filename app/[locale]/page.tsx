import MainPage from '../components/MainPage/MainPage';
import getAuthToken from '../services/firebase/getAuthToken';

export default function HomePage() {
  const hasToken = Boolean(getAuthToken());

  return <MainPage hasToken={hasToken} />;
}
