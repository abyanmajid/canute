import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "@/lib/mongodb";
import { isEmailTaken } from "@/lib/queryUnique";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile): any {
        console.log("Profile GitHub: ", profile);

        let userRole = "GitHub User";
        if (profile?.email === "abyan@abydyl.net") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  theme: {
    colorScheme: "dark",
    brandColor: "#A400F1",
    logo: "https://i.ibb.co/8sHv5w5/canute-logo-textless.png",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      let typeAccount = account.provider;
      const { name, email } = user;
      try {
        await connectMongoDB();
        const userExists = await isEmailTaken(email, typeAccount);
        if (!userExists) {
          const res = await fetch("http://canute.vercel.app/api/user", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              username: name,
              email: email,
              typeAccount: typeAccount,
            }),
          });
          console.log("RES:", res);
          if (res.ok) {
            return user;
          }
        }
      } catch (error) {
        console.log(error);
      }
      return user;
    },
  },
};
