import { Box, Button } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LogoutProps {
  email: string | null | undefined
}

const Logout: React.FC<LogoutProps> = ({email}) => {
  const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/login');
    };


  return (
    <Box sx={{ maxWidth: '250px', pt: 10 }}>
      <Button sx={{ mt: 5 }} fullWidth variant="contained" onClick={handleLogout}>
        Log Out
      </Button>
    </Box>
  );
};
export default Logout;
