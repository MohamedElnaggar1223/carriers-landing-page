import { createCoach } from '@/lib/actions/coach.actions'
import { verifyOTP } from '@/lib/actions/otp.actions'
import { createPlayer } from '@/lib/actions/player.actions'
import { connectDB } from '@/lib/mongoose'
import UserModel from '@/models/User'
import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module "next-auth" {
	interface Session extends DefaultSession {
		user?: {
			id: string;
			role: string;
		} & DefaultSession["user"]
	}

	interface User {
		role: string;
	}
}

// Extend the built-in JWT types
declare module "next-auth/jwt" {
	interface JWT {
		id?: string,
		role?: string;
	}
}

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
				otp: { label: 'OTP', type: 'text', placeholder: '123456' },
				role: { label: 'Role', type: 'text', placeholder: 'admin' },
				username: { label: 'Username', type: 'text', placeholder: 'Username' },
				playName: { label: 'Play Name', type: 'text', placeholder: 'Play Name' },
			},
			async authorize(credentials, req): Promise<any> {
				await connectDB()
				console.log(credentials)

				if (!credentials?.email || !credentials?.otp || !credentials?.role) {
					throw new Error('Missing credentials');
				}

				const result = await verifyOTP(credentials?.email, credentials?.otp);
				if (!result.success) {
					throw new Error('Invalid or expired OTP');
				}

				const user = await UserModel.findOne({ email: credentials.email }).lean().exec();

				if (!user) {
					if (credentials.role === 'coach') {
						const data = await createCoach({ username: credentials.username, playName: credentials.playName as "Valorant" | "League of Legends" | "Overwatch", email: credentials.email })

						if (data.error) throw new Error(data.error)
						else return {
							id: data?.user?._id?.toString(),
							email: data?.user?.email,
							role: data?.user?.role,
							name: data?.user?.name
						}
					}
					else {
						const data = await createPlayer({ username: credentials.username, playName: credentials.playName as "Valorant" | "League of Legends" | "Overwatch", email: credentials.email })

						if (data.error) throw new Error(data.error)
						else return {
							id: data?.user?._id?.toString(),
							email: data?.user?.email,
							role: data?.user?.role,
							name: data?.user?.name
						}
					}
				}

				return {
					id: user._id.toString(),
					email: user.email,
					role: user.role,
					name: user.name
				};
			}
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
				token.id = user.id;
				token.name = user.name;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.role = token.role!;
				session.user.id = token.id!;
				session.user.name = token.name!;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	}
}
export default NextAuth(authOptions)