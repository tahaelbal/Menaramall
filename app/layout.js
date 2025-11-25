// import Navbar from "@/components/navbar";
import "./globals.css";
// import Footer from "@/components/footer";
import "leaflet/dist/leaflet.css";


export default function RootLayout({ children, session }) {
  return (
    <html lang="fr">
      <body className="font-primary">
        
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
        
      </body>
    </html>
  );
}
