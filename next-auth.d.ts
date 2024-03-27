import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

type TokenRole = "ADMIN" | "USER";

declare module "next-auth" {
  interface Session {
    /** The user's postal address. */
    user: {
      role: TokenRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: TokenRole;
  }
}
