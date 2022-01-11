import { MDBFooter } from "mdb-react-ui-kit";
import Link from "next/link";

export default function Footer() {
  return (
    <MDBFooter
      backgroundColor="light"
      className="text-center text-lg-left my-auto"
    >
      <div className="text-center p-3" style={{ backgroundColor: "#96CEB4" }}>
        &copy; {new Date().getFullYear()} Copyright:
        <Link className="text-dark" href="/">
          Build with NextJS
        </Link>
      </div>
    </MDBFooter>
  );
}
