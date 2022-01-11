/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBFooter,
} from "mdb-react-ui-kit";
const axios = require("axios").default;
import Link from "next/link";
//auth
import { useUser } from "@auth0/nextjs-auth0";

const index = ({ heros }) => {
  const { user } = useUser();

  return (
    <>
      <div className="container-fluid " style={{ backgroundColor: "#D3DEDC" }}>
        {user && (
          <Link href="/add">
            <MDBBtn className="my-2" color="success">
              New Identity
            </MDBBtn>
          </Link>
        )}
        <MDBRow>
          {heros.map((hero) => {
            return (
              <MDBCol sm="3">
                <MDBCard
                  className="border border-2 my-2 mx-2  border-secondary "
                  style={{ maxWidth: "22rem", minHeight: "10rem" }}
                  alignment="center"
                >
                  <MDBCardBody>
                    <MDBCardTitle>{hero.superHeroName}</MDBCardTitle>
                    <Link href={`/${hero._id}`}>
                      <MDBBtn className="btn btn-sm btn-secondary ">
                        Reveal Identity
                      </MDBBtn>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      </div>
      <MDBFooter
        backgroundColor="light"
        className="text-center text-lg-left my-auto "
      >
        <div className="text-center p-3" style={{ backgroundColor: "#7C99AC" }}>
          &copy; {new Date().getFullYear()} Copyright:
          <Link className="text-dark" href="https://nextjs.com">
            Build with NextJS
          </Link>
        </div>
      </MDBFooter>
    </>
  );
};
export async function getServerSideProps(context) {
  const res = await axios("https://auth-hero.vercel.app/api/hero");
  // console.log(res.data);
  const { hero } = res.data;
  return { props: { heros: hero } };
}
export default index;
