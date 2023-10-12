import React, { useState } from "react";
import "./Sidebar.css";
import people from "../Assets/SportsIcons/people.png";

function Categories() {
  const [selected_tournament, setselected_tournament] = useState(null);
  const category = [
    "Open - Men",
    "Open - Women",
    "Open - Doubles Men",
    "Open - Doubles Women",
    "Teams - Men",
    "Teams - Women",
    "Others - Men",
    "Others - Women",
    "Others - Doubles Men",
    "Others - Doubles Women",
    "Others - Mixed Doubles",
    "Open - Mixed Doubles",
  ];
  return (
    <div className="Sidebar">
      <div className="Sports_info_header Sidebar_heading">Categories</div>
      <div className="tournament_names_container">
        {category.map((cat, index) => (
          <p
            className="tournament_name"
            onClick={() => {
              setselected_tournament("Champions League");
            }}
          >
            <img
              src={people}
              className="SportsIcon"
              style={{
                color: selected_tournament === cat ? "#ff9b71" : "",
              }}
            />
            &nbsp; {cat}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Categories;
