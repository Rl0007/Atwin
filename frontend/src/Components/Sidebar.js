import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import user from "../Assets/SportsIcons/user.png";

function Sidebar({ setselected_tournament }) {
  const [leagues, setleagues] = useState([]);
  const fetchleagues = async () => {
    let response;
    try {
      response = await fetch("http://localhost:8000/api/leagues/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    const data = await response.json();

    setleagues(data);
  };
  useEffect(() => {
    fetchleagues();
  }, []);
  return (
    <div className="Sidebar">
      <div className="Sports_info_header Sidebar_heading">
        Current Tournaments
      </div>
      <div className="tournament_names_container">
        {leagues.map((league, index) => (
          <p
            className="tournament_name"
            onClick={() => {
              setselected_tournament(league.name);
            }}
          >
            <img src={user} className="SportsIcon" />
            &nbsp; {league.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
