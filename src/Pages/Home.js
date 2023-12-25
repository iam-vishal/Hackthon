import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import Data from "../Data/brands.json";

function Home() {
  const [brandsData, setBrandsData] = useState(Data);

  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(brandsData);

  const handleFilter = (event) => {
    const searchText = event.target.value;
    setFilterText(searchText);

    const filteredItems = brandsData.filter((item) =>
      item.brand_name.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredData(filteredItems);
  };

  console.log(filteredData);

  return (
    <>
      <div className="m-5 brand-page-wrapper">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-10">
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter Brand name"
                    value={filterText}
                    onChange={handleFilter}
                  ></input>
                </div>
              </div>
              <div className="col-md-2">
                <button type="button" class="btn btn-primary me-auto">
                  <BsSearch className="mb-1" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" class="btn btn-primary btn-sm">
            Add new Brand
          </button>
        </div>

        <div className="kof-card mt-5">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Brand</th>
                <th scope="col">Category</th>
                <th scope="col">Suitable to approch</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {filteredData.length > 0 ? (
              <tbody>
                {filteredData?.map((data_i, index) => {
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data_i.brand_name}</td>
                      <td>{data_i.sector}</td>
                      <td>
                        <span
                          className={
                            data_i.suitable_time == 0
                              ? "badge rounded-pill bg-danger"
                              : "badge rounded-pill bg-success"
                          }
                        >
                          {data_i.suitable_time == 0 ? "No" : "Yes"}
                        </span>
                      </td>
                      <td>
                        <Link to={`/brand/${data_i.brand_id}`}>View</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <p className="text-center my-3">No Brand Found..</p>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
