import { authOptions } from '@/configs/authConfig';
import NextAuth from 'next-auth';


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };