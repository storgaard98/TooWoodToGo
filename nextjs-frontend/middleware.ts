import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req: any) {
  return withAuth(req);
}
export const config = {
  matcher: ["/authTest"],
};
