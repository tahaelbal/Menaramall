// middleware.js
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Rediriger si non connecté
  pages: {
    signIn: "/admin/signin", // vers où rediriger les users non connectés
  },
});

// Appliquer le middleware à certaines routes
export const config = {
  matcher: ["/admin/:path*"], // protège tout ce qui commence par /admin
};
