import { useState, useEffect } from "react";
import "../../style.css";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import components
import Navbar from "../../components/Form/Navbar";
import Footer from "../../components/Form/Footer";
import { useNavigate } from "react-router-dom";

export default function SurveyFormPage() {
  //   const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dataSurveyMeta, setDataSurveyMeta] = useState({});
  const navigate = useNavigate();

  return (
    <section>
      <Navbar profile={profile} />

      <div className="top-container">
        <div className="top-left">
          <p className="left">Service Center</p>
        </div>
      </div>

      <div className="asesmen">
        <p>IT Service Ticket</p>
      </div>

      <center>
        <div className="main-title">{dataSurveyMeta?.survey?.survey_title}</div>
      </center>

      <form style={{ marginBottom: "6%" }} className="form-service">
        <>
          <div className="center-container">
            <div className="an-que">IT Service Ticket BDS</div>
            <div className="desc">Form untuk pelaporan support lokal</div>
          </div>

          <div className="center-container">
            <div className="an-que">Email</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <input
              type="text"
              placeholder="Jawaban Anda"
              className="input-form"
            ></input>
          </div>

          <div className="center-container">
            <div className="an-que">Nama</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <input
              type="text"
              placeholder="Jawaban Anda"
              className="input-form"
            ></input>
          </div>

          <div className="center-container">
            <div className="an-que">Email</div>
            <div className="desc">Jawaban akan dikirimkan melalui Email ini</div>

            <input
              type="text"
              placeholder="Jawaban Anda"
              className="input-form"
            ></input>
          </div>

          <div className="center-container">
            <div className="an-que">Project</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <select className="select-form" defaultValue="">
              <option value="" disabled hidden>
                Pilih Project
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>


          <div className="center-container">
            <div className="an-que">Tipe Ticket</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <select className="select-form" defaultValue="">
              <option value="" disabled hidden>
                Pilih Tipe Ticket
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="center-container">
            <div className="an-que">Tanggal Permasalahan</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <input
              type="date"
              className="date-form"
            />
          </div>

          <div className="center-container">
            <div className="an-que">Judul Permasalahan</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <input
              type="text"
              placeholder="Jawaban Anda"
              className="input-form"
            ></input>
          </div>

          <div className="center-container">
            <div className="an-que">Deskripsi Permasalahan</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <textarea
              type="text"
              placeholder="Jawaban Anda"
              className="text-area-form"
            ></textarea>
          </div>

          <div className="center-container">
            <div className="an-que">Saran Permasalahan</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <textarea
              type="text"
              placeholder="Jawaban Anda"
              className="text-area-form"
            ></textarea>
          </div>

          <div className="center-container">
            <div className="an-que">Upload Screenshot</div>
            {/* <div className="desc">Deskripsi satu</div> */}

            <input
              type="file"
              className="input-form"
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>

          {/* <div className="center-container">
            <div className="an-que">Pertanyaan dua</div>
            <div className="desc">Deskripsi dua</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div>
                <label style={{ marginLeft: "4px" }} htmlFor="radio-1">
                  1
                </label>
                <br />
                <br />
                <input
                  type="radio"
                  id="radio-1"
                  name="radioGroup-static"
                  value="1"
                  style={{ marginLeft: "0px", width: "20px", height: "20px" }}
                />
              </div>
              <div>
                <label style={{ marginLeft: "4px" }} htmlFor="radio-2">
                  2
                </label>
                <br />
                <br />
                <input
                  type="radio"
                  id="radio-2"
                  name="radioGroup-static"
                  value="2"
                  style={{ marginLeft: "0px", width: "20px", height: "20px" }}
                />
              </div>
              <div>
                <label style={{ marginLeft: "4px" }} htmlFor="radio-3">
                  3
                </label>
                <br />
                <br />
                <input
                  type="radio"
                  id="radio-3"
                  name="radioGroup-static"
                  value="3"
                  style={{ marginLeft: "0px", width: "20px", height: "20px" }}
                />
              </div>
              <div>
                <label style={{ marginLeft: "4px" }} htmlFor="radio-4">
                  4
                </label>
                <br />
                <br />
                <input
                  type="radio"
                  id="radio-4"
                  name="radioGroup-static"
                  value="4"
                  style={{ marginLeft: "0px", width: "20px", height: "20px" }}
                />
              </div>
              <div>
                <label style={{ marginLeft: "4px" }} htmlFor="radio-5">
                  5
                </label>
                <br />
                <br />
                <input
                  type="radio"
                  id="radio-5"
                  name="radioGroup-static"
                  value="5"
                  style={{ marginLeft: "0px", width: "20px", height: "20px" }}
                />
              </div>
            </div>
          </div> */}

          {/* <div className="center-container">
            <div className="an-que">Pertanyaan tiga</div>
            <div className="desc">Deskripsi tiga</div>

            <div style={{ marginTop: "20px" }}>
              <div>
                <input
                  type="checkbox"
                  id="question-1-option-1"
                  name="favorite-fruit"
                  value="apple"
                  className="checkbox-multi-select"
                />
                <label htmlFor="question-1-option-1">Apple</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="question-1-option-2"
                  name="favorite-fruit"
                  value="banana"
                  className="checkbox-multi-select"
                />
                <label htmlFor="question-1-option-2">Banana</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="question-1-option-3"
                  name="favorite-fruit"
                  value="cherry"
                  className="checkbox-multi-select"
                />
                <label htmlFor="question-1-option-3">Cherry</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="question-1-option-4"
                  name="favorite-fruit"
                  value="date"
                  className="checkbox-multi-select"
                />
                <label htmlFor="question-1-option-4">Date</label>
              </div>
            </div>
          </div> */}

          {/* <div className="center-container">
            <div className="an-que">Pertanyaan empat</div>
            <div className="desc">Deskripsi empat</div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <div style={{ width: "fit-content" }} className="radio-group">
                Very Unsatisfied
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "60%",
                }}
              >
                <div>
                  <label style={{ marginLeft: "4px" }} htmlFor="radio-1">
                    1
                  </label>
                  <br />
                  <br />
                  <input
                    type="radio"
                    id="radio-1"
                    name="satisfaction"
                    value="1"
                    style={{
                      marginLeft: "0px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ marginLeft: "4px" }} htmlFor="radio-2">
                    2
                  </label>
                  <br />
                  <br />
                  <input
                    type="radio"
                    id="radio-2"
                    name="satisfaction"
                    value="2"
                    style={{
                      marginLeft: "0px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ marginLeft: "4px" }} htmlFor="radio-3">
                    3
                  </label>
                  <br />
                  <br />
                  <input
                    type="radio"
                    id="radio-3"
                    name="satisfaction"
                    value="3"
                    style={{
                      marginLeft: "0px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ marginLeft: "4px" }} htmlFor="radio-4">
                    4
                  </label>
                  <br />
                  <br />
                  <input
                    type="radio"
                    id="radio-4"
                    name="satisfaction"
                    value="4"
                    style={{
                      marginLeft: "0px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
                <div>
                  <label style={{ marginLeft: "4px" }} htmlFor="radio-5">
                    5
                  </label>
                  <br />
                  <br />
                  <input
                    type="radio"
                    id="radio-5"
                    name="satisfaction"
                    value="5"
                    style={{
                      marginLeft: "0px",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{ width: "fit-content" }}
                className="radio-group right-radio-title"
              >
                Very Satisfied
              </div>
            </div>
          </div> */}
        </>
        <button type="submit" className="submit-button">
          SUBMIT
        </button>
      </form>

      <Footer />
    </section>
  );
}
