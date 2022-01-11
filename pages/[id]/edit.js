import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
const axios = require("axios").default;
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";

function EditHero({ heros }) {
  const router = useRouter();
  const { id } = router.query;
  const [form, setFrom] = useState({
    superHeroName: heros.superHeroName,
    realName: heros.realName,
  });
  const handleForm = async (e) => {
    e.preventDefault();
    try {
      if (form.superHeroName === "" || form.realName === "") {
        alert("Please fill all the fields");
        return;
      }
      const res = await axios.put(
        `https://auth-hero.vercel.app/api/hero/${id}`,
        form
      );
      console.log(res.data);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-4">
      <h1 className="display-6">Change Identity </h1>
      <form>
        <MDBInput
          onChange={handleChange}
          label="Super Hero"
          type="text"
          name="superHeroName"
          value={form.superHeroName}
        />
        <MDBInput
          className="my-2"
          onChange={handleChange}
          label="Real Name"
          type="text"
          name="realName"
          value={form.realName}
        />
        <MDBBtn className="btn btn-success" onClick={handleForm}>
          Update Hero
        </MDBBtn>
      </form>
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

export default EditHero;
