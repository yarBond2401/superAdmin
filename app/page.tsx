"use client"
import React from 'react';
import AdminPannel from '@/modules/AdminPannel';
import SessionProvider from '@/providers/SessionProvider';

const AdminPannelPage = async () => {

  return (
    <SessionProvider>
      <AdminPannel />
    </SessionProvider>
  );
};
export default AdminPannelPage;
