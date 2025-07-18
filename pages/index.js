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
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
const axios = require("axios").default;
import Link from "next/link";
//auth
import { useUser } from "@auth0/nextjs-auth0";

const index = ({ heros }) => {
  const { user } = useUser();

  return (
    <div className="py-5" style={{ backgroundColor: "var(--light)" }}>
      <MDBContainer>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1" style={{ color: "var(--primary-dark)" }}>Superhero Database</h1>
            <p style={{ color: "var(--gray)" }}>Discover and explore superhero identities</p>
          </div>
          
          {user && (
            <Link href="/add">
              <MDBBtn className="d-flex align-items-center" style={{ backgroundColor: "var(--secondary)", color: "var(--dark)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle me-2" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                New Identity
              </MDBBtn>
            </Link>
          )}
        </div>
        
        <MDBRow className="g-4">
          {heros.map((hero) => {
            return (
              <MDBCol sm="6" md="4" lg="3" key={hero._id}>
                <MDBCard className="h-100 card">
                  <div className="p-3 text-center" style={{ borderRadius: "10px 10px 0 0", backgroundColor: "var(--primary)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="var(--dark)" className="bi bi-mask mb-2" viewBox="0 0 16 16">
                      <path d="M6.225 1.227A7.5 7.5 0 0 1 10.5 8a7.5 7.5 0 0 1-4.275 6.773 7 7 0 1 0 0-13.546zM4.187.966a8 8 0 1 1 7.627 14.069A8 8 0 0 1 4.186.964z"/>
                    </svg>
                    <MDBCardTitle className="mb-0 fw-bold text-dark">{hero.superHeroName}</MDBCardTitle>
                  </div>
                  <MDBCardBody className="text-center d-flex flex-column justify-content-between">
                    <p className="text-muted mb-4">Superhero with unknown identity</p>
                    <Link href={`/${hero._id}`}>
                      <MDBBtn className="w-100" style={{ backgroundColor: "var(--accent)", color: "var(--dark)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye me-2" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                        Reveal Identity
                      </MDBBtn>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
export async function getServerSideProps(context) {
  const res = await axios("https://auth-hero.vercel.app/api/hero");
  // console.log(res.data);
  const { hero } = res.data;
  return { props: { heros: hero } };
}
export default index;