import React, { useContext } from "react";
import "./Sports_info.css";
import Table from "react-bootstrap/Table";
import ping_pong from "../Assets/SportsIcons/ping-pong.png";
import AuthContext from "../Assets/Context/AuthContext";
import user from "../Assets/SportsIcons/user.png";

import ReactCountryFlag from "react-country-flag";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
function Sports_info({
  add_point = false,
  allmatches,
  finished = true,
  selected_tournament = null,
  fetchmatches,
}) {
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!allmatches) {
    return "";
  }
  const filteredMatches = finished
    ? allmatches
    : Object.fromEntries(
        Object.entries(allmatches).map(([league, matches]) => [
          league,
          {
            matches: matches.matches.filter(
              (match) => match.Status !== "Finished"
            ),
          },
        ])
      );

  allmatches = filteredMatches;

  if (selected_tournament) {
    const temp = allmatches[selected_tournament];

    allmatches = { [selected_tournament]: temp };

    if (!allmatches[selected_tournament]) {
      return (
        <div
          style={{
            padding: "1rem",
          }}
        >
          No Match Found !!
        </div>
      );
    }
  }

  const addpoint = async (id, player) => {
    let response = await fetch(`http://localhost:8000/api/addpoint/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({ id: id, player: player }),
    });
    const data = await response.json();

    if (response.status === 401) {
      alert(`Error occurred. Please try later.`);
    } else {
      alert("Score Increased Successfully");
    }
  };
  const substractpoint = async (id, player) => {
    let response = await fetch(`http://localhost:8000/api/substractpoint/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({ id: id, player: player }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 401) {
      alert(`Error occurred. Please try later.`);
    } else {
      alert("Score Decreased");
    }
  };
  return (
    <div className="Sports_info">
      {Object.entries(allmatches)?.map(([league], index) => (
        <div>
          <div className="Sports_info_header" key={index}>
            <img src={user} className="SportsIcon" />
            &nbsp; {league}
          </div>

          {allmatches[league]["matches"]?.map((match, index2) => (
            <div
              className="match_container"
              key={index2}
              onClick={() => {
                if (!add_point) {
                  navigate(`/match/${match.id}`);
                }
              }}
            >
              <div className="match_and_set_container">
                <div className="match_name">{match?.name}</div>
                <div className="sets">{match?.Status}</div>
              </div>
              <div className="player_info">
                <Table striped bordered hover>
                  <tr>
                    <td>
                      <ReactCountryFlag
                        countryCode={match?.Player_1?.country}
                        svg
                        style={{
                          width: "2em",
                          height: "2em",
                          backgroundColor: "#ddd",
                        }}
                      />
                      {match?.Player_1?.name}
                    </td>
                    <td>{match?.Winner === "1" ? "W" : ""} </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <ReactCountryFlag
                        countryCode={match?.Player_2?.country}
                        svg
                        style={{
                          width: "2em",
                          height: "2em",
                          backgroundColor: "#ddd",
                        }}
                      />{" "}
                      {match?.Player_2?.name}
                    </td>
                    <td>{match?.Winner === "2" ? "W" : ""} </td>
                  </tr>
                </Table>
              </div>
              <div className="Scores">
                <Table striped bordered hover size="sm">
                  <tr>
                    <td className="table_icon">
                      <img
                        src={ping_pong}
                        className="SportsIcon table_icon"
                        style={{
                          visibility:
                            match.Serve === "Player_1" ? "" : "hidden",
                        }}
                      />
                    </td>
                    {match.Score.Player_1.map((val, index) => (
                      <td className={index === 0 ? "sets_won" : "set"}>
                        {val}
                      </td>
                    ))}
                    <td></td>
                  </tr>
                  <tr>
                    <td className="table_icon_cell">
                      <img
                        src={ping_pong}
                        className="SportsIcon table_icon"
                        style={{
                          visibility:
                            match.Serve === "Player_2" ? "" : "hidden",
                        }}
                      />
                    </td>
                    {match.Score.Player_2.map((val, index) => (
                      <td className={index === 0 ? "sets_won" : "set"}>
                        {val}
                      </td>
                    ))}
                    <td></td>
                  </tr>
                </Table>
              </div>
              {add_point ? (
                <div className="score_buttons_container">
                  <div className="score_buttons">
                    <Button
                      variant="success"
                      size="sm"
                      className="add_score"
                      onClick={async () => {
                        await addpoint(match.id, "Player_1");
                        fetchmatches();
                      }}
                    >
                      Score &nbsp; +1
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      size="sm"
                      className="substract_score"
                      onClick={async () => {
                        await substractpoint(match.id, "Player_1");
                        fetchmatches();
                      }}
                    >
                      Score &nbsp; -1
                    </Button>
                  </div>
                  <div className="score_buttons">
                    <Button
                      variant="success"
                      size="sm"
                      className="add_score"
                      onClick={async () => {
                        await addpoint(match.id, "Player_2");
                        fetchmatches();
                      }}
                    >
                      Score &nbsp; +1
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      size="sm"
                      className="substract_score"
                      onClick={async () => {
                        await substractpoint(match.id, "Player_2");
                        fetchmatches();
                      }}
                    >
                      Score &nbsp; -1
                    </Button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sports_info;
