import NextAuth, { NextAuthOptions, User, Account, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

// Naver의 프로필 타입 정의
interface NaverProfile extends Profile {
  resultcode: string;
  message: string;
  response: {
    id: string;
    email: string;
    name: string;
  };
}

// Kakao의 프로필 타입 정의
interface KakaoProfile extends Profile {
  id: string;
  kakao_account: {
    email: string;
  };
  properties: {
    nickname: string;
  };
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.NAVER_ID as string,
      clientSecret: process.env.NAVER_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_ID as string,
      clientSecret: process.env.KAKAO_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile | NaverProfile | KakaoProfile;
    }) {
      // account가 null일 수 있으므로 null 체크
      if (!account) {
        return false; // account가 없는 경우 로그인 허용하지 않음
      }

      // 프로바이더별 프로필 데이터 처리
      if (account.provider === "naver" && profile && "response" in profile) {
        user.id = profile.response.id;
        user.name = profile.response.name;
        user.email = profile.response.email;
      } else if (account.provider === "google") {
        // Google의 경우 프로필의 'sub' 필드를 ID로 사용
        const googleProfile = profile as Profile; // Profile 타입 단언
        user.id = googleProfile?.sub as string; // Google에서 제공하는 고유 ID는 'sub' 필드
        user.name = googleProfile?.name; // Google에서 제공하는 이름
        user.email = googleProfile?.email; // Google에서 제공하는 이메일
      } else if (account.provider === "kakao" && profile && "kakao_account" in profile) {
        const kakaoProfile = profile as KakaoProfile;
        user.id = kakaoProfile.id;
        user.name = kakaoProfile.properties.nickname;
        user.email = kakaoProfile.kakao_account.email;
      }

      return true; // 로그인 허용
    },
    async jwt({ token, user }: { token: any; user?: User }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // 커스텀 로그인 페이지 (credentials를 활용한) 를 만들 경우에 사용한다.
  // pages: { signIn: "/auth/signin" },
  // production 환경에서는 반드시 secret 을 필수로 설정해야한다.
  // secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
