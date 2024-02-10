'use client'
import LoginForm from '@/modules/Login/components/Login';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const LoginModule = () => {
  const { data: session } = useSession();
  if (session) {
    redirect('/');
  }
  return <LoginForm />;
};
export default LoginModule;
