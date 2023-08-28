import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingImg from "../img/Loading_icon.gif"


const AllPrefix = () => {
  const [prfxTitle, setPrfxTitle] = useState({ prefix: "" });
  const [allPrfxData, setAllPrfxData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const token = localStorage.getItem('token')

  const handleField = (e) => {
    setPrfxTitle({ ...prfxTitle, [e.target.name]: e.target.value });
  };

  const createPrefix = async (e) => {

    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        "https://login-api.web2rise.in/api/create-prefix",
        prfxTitle,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "prefix added successfully") {
        setPrfxTitle({ prefix: "" });
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
    setLoading(true)
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        "https://login-api.web2rise.in/api/view-prefix",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.data) {
          setAllPrfxData(response.data.data);
          setLoading(false)
        }
      } else {
        console.log("Server returned an error:");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
     <div className="col-xl-10 p-0">
      <div className="bodyPartSec">
        <div className="top_hdr">
          <div className="hdr_title">
            <h2>Prefix Listing</h2>
          </div>
          <button
            type="button"
            className="btns"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa fa-plus" aria-hidden="true"></i> Add Prefix
          </button>
        </div>

        <div className="mainSection">
          <div className="row">
            <div className="col-md-12">
            <div className="prfSec">
              <table>
                <thead>
                  <tr>
                    <th>Sr No.</th>
                    <th>Prefix Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                {loading ? 
                <tr>
                  <td></td>
                  <td style={{textAlign:"center"}}><img src={LoadingImg} alt='loading'/></td>
                  <td></td>
                </tr>
                : allPrfxData.map((name, i) => (
                    <tr key={name}>
                      <td>{i+1}</td>
                      <td>{name}</td>
                      <td><button><i className="fa fa-pencil" aria-hidden="true"></i></button> <button><i className="fa fa-trash" aria-hidden="true"></i></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Prefix
                </h5>
                <button
                  type="button"
                  className="closPop"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>setPrfxTitle({prefix: ""})}
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div className="modal-body">
                <form className="addForms">
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                      Prefix Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      name="prefix"
                      value={prfxTitle.prefix}
                      onChange={handleField}
                      id="form2Example1"
                      className="form-control"
                    />
                  </div>
                  <button
                    type="button"
                    className="btns mb-2"
                    onClick={createPrefix}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Create Prefix
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default AllPrefix;
