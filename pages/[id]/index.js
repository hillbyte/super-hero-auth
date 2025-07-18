/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
const axios = require("axios").default;
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";

function EachHero({ heros }) {
  const { user } = useUser();

  const router = useRouter();
  const { id } = router.query;
  const deleteHero = async () => {
    try {
      await axios.delete(`https://auth-hero.vercel.app/api/hero/${id}`);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <MDBContainer className="py-5">
      <Link href="/">
        <a className="d-inline-flex align-items-center mb-4 text-decoration-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to all heroes
        </a>
      </Link>
      
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard className="shadow-lg border-0">
            <div className="p-4" style={{ backgroundColor: "var(--primary)" }}>
              <div className="d-flex justify-content-center mb-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px", backgroundColor: "var(--lighter)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="var(--primary-dark)" className="bi bi-person-badge" viewBox="0 0 16 16">
                    <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
                  </svg>
                </div>
              </div>
              <MDBCardTitle tag="h2" className="text-center fw-bold mb-0 text-dark">{heros.superHeroName}</MDBCardTitle>
            </div>
            
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <h5 className="text-muted mb-1">Real Identity</h5>
                <h3 className="fw-bold">{heros.realName}</h3>
              </div>
              
              <div className="d-flex justify-content-center">
                {!user && (
                  <div className="alert alert-info d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle me-2" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    Login to manage this hero's identity
                  </div>
                )}
                
                {user && (
                  <div className="d-flex gap-3">
                    <Link href={`/${heros._id}/edit`}>
                      <MDBBtn className="d-flex align-items-center" style={{ backgroundColor: "var(--warning)", color: "var(--dark)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil me-2" viewBox="0 0 16 16">
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        Edit Identity
                      </MDBBtn>
                    </Link>
                    <Link href={`/`}>
                      <MDBBtn onClick={deleteHero} className="d-flex align-items-center" style={{ backgroundColor: "var(--danger)", color: "var(--dark)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash me-2" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                        Delete Hero
                      </MDBBtn>
                    </Link>
                  </div>
                )}
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export async function getServerSideProps({ params }) {
  const id = params.id;
  try {
    const res = await axios(`https://auth-hero.vercel.app/api/hero/${id}`);
    const { hero } = res.data;
    return { props: { heros: hero } };
  } catch (error) {
    console.log(error.message);
  }
}
export default EachHero;