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

function EditHero({ heros }) {
  const router = useRouter();
  const { id } = router.query;
  const [form, setFrom] = useState({
    superHeroName: heros.superHeroName,
    realName: heros.realName,
  });
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
      const res = await axios.put(
        `https://auth-hero.vercel.app/api/hero/${id}`,
        form,
      );
      console.log(res.data);
      router.push("/");
    } catch (error) {
      console.log(error.message);
      setError("Failed to update hero. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFrom({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <MDBContainer className="py-5">
      <Link href={`/${id}`}>
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
          Back to hero details
        </a>
      </Link>

      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6">
          <MDBCard className="shadow-lg border-0">
            <MDBCardHeader
              className="p-4"
              style={{
                backgroundColor: "var(--warning)",
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
                    fill="var(--warning)"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </div>
              </div>
              <MDBCardTitle tag="h2" className="text-center fw-bold mb-0">
                Edit Hero Identity
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
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Superhero Name
                  </label>
                  <input
                    onChange={handleChange}
                    label="Superhero Name"
                    type="text"
                    name="superHeroName"
                    value={form.superHeroName}
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
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Real Identity
                  </label>
                  <input
                    onChange={handleChange}
                    label="Real Identity"
                    type="text"
                    name="realName"
                    value={form.realName}
                    className="form-control-lg"
                    contrast
                  />
                </div>

                <div className="d-flex gap-3">
                  <MDBBtn
                    onClick={handleForm}
                    className="flex-grow-1 py-3"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: "var(--warning)",
                      color: "var(--dark)",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-save me-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </MDBBtn>

                  <Link href={`/${id}`}>
                    <MDBBtn
                      className="py-3"
                      style={{
                        backgroundColor: "var(--light)",
                        color: "var(--dark)",
                      }}
                    >
                      Cancel
                    </MDBBtn>
                  </Link>
                </div>
              </form>
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

export default EditHero;

