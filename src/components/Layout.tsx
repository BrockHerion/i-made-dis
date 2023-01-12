import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Header />
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:px-8">
      {children}
    </div>
    <Footer />
  </>
);

export default Layout;
