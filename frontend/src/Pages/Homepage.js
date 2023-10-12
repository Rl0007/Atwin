import React, { useEffect, useState } from "react";
import ping_pong from "../Assets/SportsIcons/ping-pong.png";

import "./Homepage.css";
import Button from "react-bootstrap/esm/Button";
import Sports_info from "../Components/Sports_info";
import Sidebar from "../Components/Sidebar";
import Categories from "../Components/Categories";
import { Form } from "react-bootstrap";
function Homepage() {
  const [allmatches, setallmatches] = useState(null);
  const [live, setlive] = useState(false);
  const [selected_tournament, setselected_tournament] = useState(null);
  const [keyword, setkeyword] = useState("");
  const [issearch, setissearch] = useState(false);
  const fetchmatches = async () => {
    let response;
    try {
      response = await fetch("http://localhost:8000/api/matches/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }

    const data = await response.json();
    setallmatches(data);

    // return data;
  };
  useEffect(() => {
    let intervalId;
    if (!issearch) {
      intervalId = setInterval(fetchmatches, 2000);
    }
    return () => clearInterval(intervalId);
  }, [issearch]);
  useEffect(() => {
    fetchmatches();
  }, []);
  const search = async (e) => {
    e.preventDefault();
    setissearch(true);
    const response = await fetch(
      `http://localhost:8000/api/search_matches/${keyword}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    setallmatches(data);
  };

  return (
    <div className="Homepage">
      <div>
        <Sidebar setselected_tournament={setselected_tournament} />
        <Categories />
      </div>
      <div className="Sports_container">
        <div className="sports_container_header">
          <p style={{ width: "60%", paddingTop: ".2rem" }}>
            <img src={ping_pong} className="SportsIcon" />
            &nbsp; Table Tennis
          </p>
          <Form
            className="form_container"
            onSubmit={(e) => {
              search(e);
            }}
          >
            <Form.Control
              type="text"
              placeholder="Search"
              value={keyword}
              style={{ width: "50%" }}
              onChange={(e) => {
                setkeyword(e.target.value);
              }}
            />
            &nbsp;
            <Button variant="secondary" type="submit">
              Search
            </Button>
          </Form>
        </div>
        <div className="Sports_menu">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              setlive(true);
              setissearch(false);
            }}
          >
            Live
          </Button>{" "}
          &nbsp;
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              setissearch(false);
              setlive(false);
            }}
          >
            Finished
          </Button>{" "}
          &nbsp;
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              setselected_tournament(null);
              fetchmatches();
              setlive(false);
              setissearch(false);
            }}
          >
            All
          </Button>{" "}
          &nbsp;
        </div>
        <Sports_info
          allmatches={allmatches}
          finished={!live}
          selected_tournament={selected_tournament}
        />
      </div>
    </div>
  );
}

export default Homepage;
