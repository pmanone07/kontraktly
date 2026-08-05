import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match alle path unntatt api, _next, statiske filer,
  // og filer med extension (favicon.ico, logo.png osv).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
