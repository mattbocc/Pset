import React, { useEffect, useState } from "react";
import axios from "axios";

const ListSetOne = () => {

  const [psets, setPsets] = useState([]);
  const [filter, setFilter] = useState("");

  //helper function for sort method to compare names within object
  const compareName = (a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    else if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    return 0;
  };

  //helper function for sort method to compare dates within object
  const compareDate = (a, b) => {
    if (a.dateCreated < b.dateCreated) return 1;
    else if (a.dateCreated > b.dateCreated) return -1;
    return 0;
  };

  //filter list chronologically
  const filterChrono = () => {
    let psetsCopy = [...psets];
    psetsCopy.sort(compareDate);
    setPsets(psetsCopy);
  };

  //filter list Alphabetically
  const filterAlpha = () => {
    let psetsCopy = [...psets];
    psetsCopy.sort(compareName);
    setPsets(psetsCopy);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3006/api/psets");
        setPsets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);
  return (
    <div className="container">
      <div className="text-center my-5">
        <button
          type="button"
          className="btn btn-primary mx-5"
          onClick={filterAlpha}
        >
          Filter Alphabetically
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={filterChrono}
        >
          Filter Chronologically
        </button>
      </div>

      <div className="input-group px-5 mb-3">
        <span className="input-group-text" id="basic-addon1">Filter By Name:</span>
        <input type="text" className="form-control" placeholder="Ex. PDTX_2019" aria-label="" aria-describedby="basic-addon1" onChange={(e) => setFilter(e.target.value)}/>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Date Created</th>
            <th scope="col">Doi</th>
          </tr>
        </thead>
        <tbody>
          {psets &&
            psets.filter((pset) => {
              if (filter.toLowerCase() === "") return pset
              else return pset.name.toLowerCase().includes(filter)
            }).map((pset, index) => {
              let doiLink = `https://doi.org/${pset.doi}`;
              return (
                <tr key={pset.doi}>
                  <th scope="row">{index + 1}</th>
                  <td>{pset.name}</td>
                  <td>{pset.dateCreated.slice(0, 10)}</td>
                  <td>
                    <a href={doiLink} target="_blank" rel="noreferrer">{doiLink}</a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ListSetOne;
