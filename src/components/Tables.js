import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingImg from "../img/Loading_icon.gif"

const Tables = () => {
  const [tableTitle, setTableTitle] = useState({
    tableName: "",
    columns: [
      {
        name: "",
        type: "",
      },
    ],
    prefix: "",
  });
  const [allTables, setAllTables] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedColumns = [...tableTitle.columns];
    updatedColumns[index] = { ...updatedColumns[index],  [name]: value, };
    setTableTitle({...tableTitle, columns: updatedColumns });
  };

  const handleAddColumn = (e) => {
    e.preventDefault();
    setTableTitle({...tableTitle, columns: [...tableTitle.columns, { name: "", type: "", }, ], });
  };

  const removeColumn = (e, index)=>{
    e.preventDefault();
    const filteData = tableTitle.columns.filter((val, id) => {return index !== id; })
    setTableTitle({...tableTitle, columns: filteData });
  }
 
  const createTable = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
      try {
      const response = await axios.post(
        "https://login-api.web2rise.in/api/create-crud",
        tableTitle,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message === "Table created successfully") {
        setTableTitle({
          tableName: "",
          columns: [
            {
              name: "",
              type: "",
            },
          ],
          prefix: "",
        });
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
        "https://login-api.web2rise.in/api/view-all-crud",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        if (response.data.data) {
          setAllTables(response.data.data);
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
    <div className="col-xl-10 p-0">
      <div className="bodyPartSec">
        <div className="top_hdr">
          <div className="hdr_title">
            <h2>All Tables Listing</h2>
          </div>
          <button
            type="button"
            className="btns"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="fa fa-plus" aria-hidden="true"></i> Add Table
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
                    <th>Table Name</th>
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
                : allTables.map((name, i) => (
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
          <div className="modal-dialog ">
            <div className="modal-content tablePopup">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Table
                </h5>
                <button
                  type="button"
                  className="closPop"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div className="modal-body">
                <form className="addForms">
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                      Table Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      name="tableName"
                      value={tableTitle.tableName}
                      onChange={(e) =>
                        setTableTitle({
                          ...tableTitle,
                          tableName: e.target.value,
                        })
                      }
                      id="form2Example1"
                      className="form-control"
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <div className="addColmn">
                      <table style={{ width: "100%" }}>
                        <thead>
                          <tr>
                            <th>Column Name</th>
                            <th>Column Type</th>
                            <th>Length Values</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableTitle.columns.map((column, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  name={`name`}
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={column.name}
                                />
                              </td>
                              <td className="lengthFild">
                                <input
                                  type="text"
                                  name={`type`}
                                  onChange={(e) => handleInputChange(e, index)}
                                  value={column.type}
                                />
                              </td>
                              <td>{tableTitle.columns.length===1 ? <div className="remvClm disable"><i className="fa fa-times" aria-hidden="true"></i></div> : <button onClick={(e)=>removeColumn(e, index)} className="remvClm"><i className="fa fa-times" aria-hidden="true"></i></button> }</td>
                              
                            </tr>
                            
                          ))}
                        </tbody>
                      </table>
                      <div className="addComn">
                        <button onClick={handleAddColumn}>
                          <i
                            className="fa fa-plus"
                            aria-hidden="true"
                          ></i> Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example1">
                      Prefix Name<span>*</span>
                    </label>
                    <input
                      type="text"
                      name="prefix"
                      value={tableTitle.prefix}
                      onChange={(e) =>
                        setTableTitle({
                          ...tableTitle,
                          prefix: e.target.value,
                        })
                      }
                      id="form2Example1"
                      className="form-control"
                    />
                  </div>

                  <button
                    type="button"
                    className="btns mb-2"
                    onClick={createTable}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Create Table
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
