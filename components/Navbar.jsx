import Link from "next/link";
import { MDBBtn } from "mdb-react-ui-kit";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
function Navbar() {
  const { user, error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;
  return (
    <nav
      className="navbar container-fluid"
      style={{ backgroundColor: "#7C99AC" }}
    >
      <Link href="/">
        <a className="navbar-brand text-dark"> <h2>SUPER HEROS</h2></a>
      </Link>
      {user && (
        <>
          <h5>Welcome {user.name}</h5>
          <img
            src={user.picture}
            width={60}
            height={60}
            className="square rounded-circle"
          />
          <Link href="/api/auth/logout">
            <MDBBtn color="danger">Log out</MDBBtn>
          </Link>
        </>
      )}

      {!user && (
        <>
          <h5>Please Login First to Add New Identity</h5>
          <Link href="/api/auth/login">
            <MDBBtn color="secondary">LogIn</MDBBtn>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
