import React, { useEffect, useState } from "react";
import Sports_info from "../Components/Sports_info";
import mike from "../Assets/SportsIcons/mike.png";

import "./MatchPage.css";
import { useParams } from "react-router-dom";
function MatchPage() {
  const [match, setmatch] = useState(null);
  const [comment, setcomment] = useState(null);
  const { id } = useParams();

  const fetchmatch = async () => {
    const reponse = await fetch(`http://localhost:8000/api/matches/${id}/`);
    const data = await reponse.json();
    setmatch(data);
    setcomment(data.Comments.Comments.reverse());
    console.log(data);
  };
  useEffect(() => {
    fetchmatch();
    const intervalId = setInterval(fetchmatch, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const comments = [
    "Score by player 1",
    "Score by player 2",
    "Player 1's service",
    "Score by player 1",
    "Score by player 1",
    "Score by player 2",
    "Player 1's service",
    "Score by player 1",
    "Score by player 1",
    "Score by player 2",
    "Player 1's service",
    "Score by player 1",
  ];
  return (
    <div className="MatchPage">
      {match ? (
        <Sports_info
          allmatches={{
            [match.League.name]: {
              league_name: [match.League.name],
              matches: [match],
            },
          }}
        />
      ) : (
        ""
      )}
      <div className="comment_container">
        <div className="Sports_info_header">
          <img src={mike} className="SportsIcon" />
          &nbsp; Live Comments
        </div>

        {match
          ? comment.map((comm, index) => (
              <>
                <p className="live_comments">{comm}</p>
              </>
            ))
          : ""}
      </div>
    </div>
  );
}

export default MatchPage;
