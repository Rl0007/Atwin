import React, { useContext, useEffect, useState } from "react";
import "./UploadPage.css";
import user from "../Assets/SportsIcons/user.png";
import trophy from "../Assets/SportsIcons/trophy.png";

import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import ping_pong from "../Assets/SportsIcons/ping-pong.png";
import ReactCountryFlag from "react-country-flag";
import Sports_info from "../Components/Sports_info";
import Additem from "../Components/Additem";
import AuthContext from "../Assets/Context/AuthContext";
import Player from "../Components/Player";
import { ButtonGroup, Dropdown, DropdownButton, Form } from "react-bootstrap";

function UploadPage() {
  const { authTokens } = useContext(AuthContext);
  const [league, setleague] = useState(null);
  const [player1, setplayer1] = useState(null);
  const [player2, setplayer2] = useState(null);
  const [serve, setserve] = useState(null);
  const [match, setmatch] = useState("");
  const [allmatches, setallmatches] = useState(null);
  const startMatch = async () => {
    var response;
    try {
      response = await fetch(`http://localhost:8000/api/matches/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          name: match,
          League: league.id,
          Player_1: player1.id,
          Player_2: player2.id,
          Status: "Set 1",
          Score: { Player_1: [0, 0], Player_2: [0, 0] },
          Serve: serve == "Player 1" ? "Player_1" : "Player_2",
          Comments: { Comments: ["Match Start"] },
        }),
      });
      const data = await response.json();

      if (response.status === 401 || response.status === 400) {
        alert("Cannot start match");
        return;
      } else {
        alert("Match Started");
      }
      setmatch("");
      setleague("");
      setplayer1(null);
      setplayer2(null);
      setserve(null);

      return data;
    } catch (error) {
      console.log(error);
      alert("Cannot start match");
    }
  };
  const handle_allmatches = async () => {
    const data = await fetchmatches();
    setallmatches(data);
  };

  const fetchLeagues = async () => {
    let response;
    try {
      response = await fetch("http://localhost:8000/api/leagues/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const data = await response.json();

    return data;
  };
  const fetchPlayers = async () => {
    let response;
    try {
      response = await fetch("http://localhost:8000/api/players/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const data = await response.json();

    return data;
  };

  const fetchmatches = async () => {
    let response;
    try {
      response = await fetch("http://localhost:8000/api/matches/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const data = await response.json();
    setallmatches(data);
  };

  useEffect(() => {
    fetchmatches();
  }, []);
  return (
    <div className="UploadPage">
      <div className="match_details_container">
        <div className="match_details_form">
          <Additem
            itemName="League"
            apiEndpoint="http://localhost:8000/api/leagues"
            fetchItems={() => fetchLeagues()}
            label={league ? league.name : "Select League"}
            setitem={setleague}
          />
          <Player
            itemType="Player"
            apiEndpoint="http://localhost:8000/api/players"
            fetchItems={() => fetchPlayers()}
            label={player1 ? player1.name : "Select Player 1"}
            setitem={setplayer1}
          />
          <Player
            itemType="Player"
            apiEndpoint="http://localhost:8000/api/players"
            fetchItems={() => fetchPlayers()}
            label={player2 ? player2.name : "Select Player 2"}
            setitem={setplayer2}
          />
          <DropdownButton
            as={ButtonGroup}
            // size="sm"
            variant="secondary"
            style={{ marginTop: ".5rem" }}
            title={serve ? serve : "Select Serve"}
          >
            <Dropdown.Item
              onClick={() => {
                setserve("Player 1");
              }}
            >
              Player 1
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setserve("Player 2");
              }}
            >
              Player 2
            </Dropdown.Item>
          </DropdownButton>
          <Form style={{ marginTop: ".5rem" }}>
            <Form.Control
              type="text"
              value={match}
              placeholder="Match Name"
              onChange={(e) => {
                setmatch(e.target.value);
              }}
            />
          </Form>
        </div>
        <div className="match_details_render">
          <div className="Sports_info_header">
            <img src={user} className="SportsIcon" />
            &nbsp; {league ? league.name : "Western League"}:- &nbsp;{" "}
            {match ? match : "Match Name"}
          </div>
          <div className="upload_player_info">
            <Table striped bordered hover>
              <tr>
                <td>
                  <ReactCountryFlag
                    countryCode={player1 ? player1.country : "IN"}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                      backgroundColor: "#ddd",
                    }}
                  />
                  {player1 ? player1.name : "Player1"}
                </td>
                <td>
                  {serve === "Player 1" ? (
                    <img
                      src={ping_pong}
                      className="SportsIcon Upload_table_icon"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <ReactCountryFlag
                    countryCode={player2 ? player2.country : "GB"}
                    svg
                    style={{
                      width: "2em",
                      height: "2em",
                      backgroundColor: "#ddd",
                    }}
                  />{" "}
                  {player2 ? player2.name : "Player2"}
                </td>
                <td>
                  {" "}
                  {serve === "Player 2" ? (
                    <img
                      src={ping_pong}
                      className="SportsIcon Upload_table_icon"
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            </Table>
          </div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={async () => {
              await startMatch();
              fetchmatches();
            }}
          >
            Start Match
          </Button>
        </div>
      </div>
      <div className="Sports_info_header">
        <img src={trophy} className="SportsIcon" />
        &nbsp; Ongoing Tournaments
      </div>

      {allmatches ? (
        <Sports_info
          add_point={true}
          allmatches={allmatches}
          finished={false}
          fetchmatches={fetchmatches}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default UploadPage;
