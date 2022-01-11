/* eslint-disable react-hooks/rules-of-hooks */
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

function addNewhero() {
  const [form, setFrom] = useState({ superHeroName: "", realName: "" });
  const handleForm = async (e) => {
    e.preventDefault();
    //validation
    if (form.superHeroName === "" || form.realName === "") {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(
        "https://auth-hero.vercel.app/api/hero",
        form
      );
      console.log(res.data);
      Router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-4">
      <h1 className="display-6">Introduce New Hero</h1>
      <form>
        <MDBInput
          onChange={handleChange}
          label="Super Hero Name"
          type="text"
          name="superHeroName"
        />
        <MDBInput
          className="my-2"
          onChange={handleChange}
          label="Real Name"
          type="text"
          name="realName"
        />
        <MDBBtn onClick={handleForm}>Add New Hero</MDBBtn>
      </form>
    </div>
  );
}

export default addNewhero;
