/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
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
    <div className="container">
      <MDBCard
        className="border border-2 my-2 border-info"
        style={{ maxWidth: "22rem" }}
      >
        <MDBCardBody>
          <MDBCardTitle>{heros.superHeroName}</MDBCardTitle>
          <MDBCardText>Real Identity: {heros.realName}</MDBCardText>
          {!user && <h5>Login to Erase identity</h5>}
          {user && (
            <>
              <Link href={`/${heros._id}/edit`}>
                <MDBBtn className="mx-2 btn btn-warning btn btn-sm">
                  Change
                </MDBBtn>
              </Link>
              <Link href={`/`}>
                <MDBBtn onClick={deleteHero} className="btn btn-sm btn-danger">
                  Erase Iderity
                </MDBBtn>
              </Link>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </div>
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
