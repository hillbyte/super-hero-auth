import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
export default Layout;
