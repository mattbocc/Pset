import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  let navigate = useNavigate();
  let location = useLocation();

  const [activeClass, setActiveClass] = useState("nav-link mx-5");
  const [activeClass2, setActiveClass2] = useState("nav-link");

  const switchSet2 = async () => {
    navigate(`/set2`);
  };
  const switchSet1 = async () => {
    navigate(`/`);
  };

  //Giving the "active" to the Nav-bar link depending on the page we're on
  useEffect(() => {
    const activeSet = () => {
      if (location.pathname === "/") {
        setActiveClass("nav-link active mx-5");
      } else {
        setActiveClass2("nav-link active");
      }
    };
    activeSet();
  }, [location.pathname]);

  return (
    <div className="mb-4">
      <ul className="nav nav-underline justify-content-center py-2">
        <li className="nav-item">
          <button
            type="button"
            className={activeClass}
            onClick={() => switchSet1()}
          >
            Dataset 1
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={activeClass2}
            onClick={() => switchSet2()}
          >
            Dataset 2
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
