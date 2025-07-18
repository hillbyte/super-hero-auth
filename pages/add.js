/* eslint-disable react-hooks/rules-of-hooks */
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBCardText,
  MDBBtn,
  MDBInput,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
const axios = require("axios").default;
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";

function addNewhero() {
  const [form, setFrom] = useState({ superHeroName: "", realName: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (form.superHeroName === "" || form.realName === "") {
      setError("Please fill all the fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        "https://auth-hero.vercel.app/api/hero",
        form,
      );
      console.log(res.data);
      Router.push("/");
    } catch (error) {
      console.log(error.message);
      setError("Failed to create hero. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <MDBContainer className="py-5">
      <Link href="/">
        <a className="d-inline-flex align-items-center mb-4 text-decoration-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left me-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
          Back to all heroes
        </a>
      </Link>

      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard className="shadow-lg border-0">
            <MDBCardHeader
              className="p-4"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--dark)",
              }}
            >
              <div className="d-flex justify-content-center mb-3">
                <div
                  className="rounded-circle p-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    backgroundColor: "var(--lighter)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="var(--primary-dark)"
                    className="bi bi-person-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path
                      fillRule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </div>
              </div>
              <MDBCardTitle tag="h2" className="text-center fw-bold mb-0">
                Create New Hero
              </MDBCardTitle>
            </MDBCardHeader>

            <MDBCardBody className="p-4">
              {error && (
                <div className="alert alert-danger d-flex align-items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-exclamation-triangle-fill me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  {error}
                </div>
              )}

              <form>
                <div className="mb-4">
                  <label
                    htmlFor="superHeroName "
                    style={{ marginRight: "10px" }}
                  >
                    Superhero Name
                  </label>
                  <input
                    onChange={handleChange}
                    label="Superhero Name"
                    type="text"
                    name="superHeroName"
                    className="form-control-lg"
                    contrast
                    style={{
                      backgroundColor: "var(--warning)",
                      color: "var(--dark)",
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    br
                    htmlFor="realName mr-2"
                    style={{ marginRight: "10px" }}
                  >
                    Real Identity
                  </label>
                  <input
                    onChange={handleChange}
                    label="Real Identity"
                    type="text"
                    name="realName"
                    className="form-control-lg"
                    contrast
                    style={{
                      backgroundColor: "var(--warning)",
                      color: "var(--dark)",
                    }}
                  />
                </div>

                <div className="d-grid">
                  <MDBBtn
                    onClick={handleForm}
                    className="py-3"
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--dark)",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-shield-plus me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM8 5.072a.5.5 0 0 1 .5.5v1.5h1.5a.5.5 0 1 1 0 1h-1.5v1.5a.5.5 0 1 1-1 0v-1.5h-1.5a.5.5 0 0 1 0-1h1.5v-1.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        Create Hero
                      </>
                    )}
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default addNewhero;

