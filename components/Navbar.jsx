import Link from "next/link";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";

function Navbar() {
  const { user, error, isLoading } = useUser();

  if (error) return <div className="alert alert-danger">{error.message}</div>;
  
  return (
    <nav className="navbar navbar-expand-lg shadow-sm sticky-top" style={{ backgroundColor: "var(--primary)" }}>
      <MDBContainer className="d-flex justify-content-between align-items-center py-2">
        <Link href="/">
          <a className="navbar-brand d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--dark)" className="bi bi-shield-fill me-2" viewBox="0 0 16 16">
              <path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
            </svg>
            <h2 className="m-0 text-dark fw-bold">SUPER HEROES</h2>
          </a>
        </Link>
        
        <div className="d-flex align-items-center">
          {user && (
            <>
              <div className="d-flex align-items-center me-3">
                <img
                  src={user.picture}
                  width={40}
                  height={40}
                  className="rounded-circle me-2 border border-2"
                  style={{ borderColor: "var(--lighter)" }}
                  alt={user.name}
                />
                <span className="text-dark fw-medium d-none d-md-block">Welcome, {user.name}</span>
              </div>
              <Link href="/api/auth/logout">
                <MDBBtn style={{ backgroundColor: "var(--secondary)", color: "var(--dark)" }} className="border-0">Log out</MDBBtn>
              </Link>
            </>
          )}

          {!user && (
            <>
              <span className="text-dark me-3 d-none d-md-block">Please login to add new heroes</span>
              <Link href="/api/auth/login">
                <MDBBtn style={{ backgroundColor: "var(--secondary)", color: "var(--dark)" }} className="border-0">Login</MDBBtn>
              </Link>
            </>
          )}
        </div>
      </MDBContainer>
    </nav>
  );
}

export default Navbar;