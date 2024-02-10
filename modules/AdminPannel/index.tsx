'use client';
import React from 'react';
import OrderList from './components/OrderList';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


const AdminPannel: React.FC = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  return <OrderList />
};
export default AdminPannel;
