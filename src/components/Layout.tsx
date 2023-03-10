import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <div className="mx-auto flex max-w-7xl flex-1 flex-col px-6 py-10 lg:px-8">
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
