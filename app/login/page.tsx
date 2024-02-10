import LoginModule from '@/modules/Login';
import SessionProvider from '@/providers/SessionProvider';

const LoginPage = async () => {
  return (
    <SessionProvider>
      <LoginModule />
    </SessionProvider>
  );
};
export default LoginPage;
