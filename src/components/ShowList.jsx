import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../assets/css/showlist.css'
import defaultImage from "../assets/images/default_movie_image.webp";

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get("https://api.tvmaze.com/search/shows?q=all").then((response) => {
      setShows(response.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {shows.map((show, index) => (
          <div key={index} className="col-lg-3 col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={show.show.image?.medium || defaultImage}
                alt={show.show.name}
                className="card-img-top"
                loading="lazy"
              />
              <div className="card-body">
                <h5 className="card-title">{show.show.name}</h5>
                <p className="card-text">
                  <strong>Genres:</strong> {show.show.genres.join(", ")}
                </p>
                <Link to={`/show/${show.show.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowList;
