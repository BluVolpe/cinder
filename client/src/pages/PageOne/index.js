import React, { useState, useEffect } from "react";
import { Header, Message } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import { useSelector } from "react-redux";

const apiBaseURL = "http://localhost:3001";

export const PageOne = (pops) => {
  // useState =
  let [movies, setMovies] = useState();
  let [ratingOption, setRatingOption] = useState(null);
  let [currentMovieIndex, setMovieIndex] = useState(-1);
  let [hideFilter, setHideFilter] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  let [seenMovies, setSeenMovies] = useState();
  let [seenMovieNames, setSeenMovieNames] = useState();

  // let [name, setName] = useState("blu");

  useEffect(() => {
    if (movies && movies.length > 0) {
      setMovieIndex(0);
    }
  }, [movies]);

  useEffect(() => {
    console.log(currentUser)
    let url = `${apiBaseURL}/user/movies/${currentUser._id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setSeenMovies(data.movies));
  }, [currentUser]);

  useEffect(() => {
    if (seenMovies) {
      let mapped = seenMovies.map((movie) => {
        return movie.imbdId;
      });
      setSeenMovieNames(mapped);
      console.log(seenMovies);
    }
  }, [seenMovies]);

  const requestMovies = () => {
    setHideFilter(true);
    let url = `${apiBaseURL}/movies/filter/?`;
    let vals = [];
    var markedCheckbox = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    for (let checkbox of markedCheckbox) {
      vals.push(checkbox.name + "=on");
    }
    url += vals.join("&");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies);
        console.log(movies);
      });
  };

  const onChange = (event) => {
    setRatingOption(event.target.value.toString());
  };

  return (
    <>
      <Message
        className="message-container"
        size="huge"
        secondary="true"
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          color: "white",
          textShadow: "0px 0px 3px black",
        }}
      >
        <Header
          className="selectMovieGenre"
          size="huge"
          style={{ marginTop: "40px" }}
        >
          {" "}
          Movie Discovery{" "}
        </Header>
        <p>Filter your selection by genre</p>
      </Message>

      {(() => {
        if (!hideFilter) {
          return (
            <Form className="genreFilter">
              {["checkbox"].map((type) => (
                <div className="row">
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Action"
                      name="action"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Adventure"
                      name="adventure"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                  </div>

                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Animation"
                      name="animation"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                  </div>
                </div>
              ))}

              {["checkbox"].map((type) => (
                <div className="row">
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Comedy"
                      name="comedy"
                      type={type}
                      id={`inline-${type}-4`}
                    />
                  </div>

                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Drama"
                      name="drama"
                      type={type}
                      id={`inline-${type}-5`}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Family"
                      name="family"
                      type={type}
                      id={`inline-${type}-6`}
                    />
                  </div>
                </div>
              ))}

              {["checkbox"].map((type) => (
                <div className="row">
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Fantasy"
                      name="fantasy"
                      type={type}
                      id={`inline-${type}-7`}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Horror"
                      name="horror"
                      type={type}
                      id={`inline-${type}-8`}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Musical"
                      name="musical"
                      type={type}
                      id={`inline-${type}-9`}
                    />
                  </div>
                </div>
              ))}

              {["checkbox"].map((type) => (
                <div className="row">
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Mystery"
                      name="mystery"
                      type={type}
                      id={`inline-${type}-10`}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Romance"
                      name="romance"
                      type={type}
                      id={`inline-${type}-11`}
                    />
                  </div>
                  <div className="col-sm-3">
                    <Form.Check
                      inline
                      label=" Thriller"
                      name="thriller"
                      type={type}
                      id={`inline-${type}-12`}
                    />
                  </div>
                </div>
              ))}
            </Form>
          );
        }
      })()}

      {(() => {
        if (!hideFilter) {
          return (
            <div className="container" style={{ position: "relative", height: "100px", width: "100%" }}>
              <div className="vertical-center" style={{margin: "0", position: "absolute", top: "80%", left: "45%"}}>
                <button className="movieSearchBtn" onClick={requestMovies}>
                  Search Movies
                </button>
              </div>
            </div>
          );
        }
      })()}

      {(() => {
        if (currentMovieIndex !== -1) {
          if (seenMovieNames.indexOf(movies[currentMovieIndex].imdbID) === -1) {
            return (
              <div style={{width: "100%"}}>
                <h1 style={{textAlign: "center"}} className="movieTitle">{movies[currentMovieIndex].Title}</h1>
                <img style={{textAlign: "center"}} src={movies[currentMovieIndex].Poster} />
                <div className="radios">
                  <label>
                  <input
                    id="rating-opt-one"
                    className="rating-opt-icon"
                    type="radio"
                    value="Good"
                    name="xxx"
                    checked={ratingOption === "Good"}
                    onChange={onChange}
                  ></input>
                  Good
                  </label>
                  <label>
                  <input
                    id="rating-opt-two"
                    className="rating-opt-icon"
                    type="radio"
                    value="Okay"
                    name="xxx"
                    checked={ratingOption === "Okay"}
                    onChange={onChange}
                  ></input>
                  Okay
                  </label>
                  <label>
                  <input
                    id="rating-opt-three"
                    className="rating-opt-icon"
                    type="radio"
                    value="Bad"
                    name="xxx"
                    checked={ratingOption === "Bad"}
                    onChange={onChange}
                  ></input>
                  Bad
                  </label>
                </div>
              </div>
            );
          } else {
            if (currentMovieIndex < movies.length - 1) {
              // reset the selected status of the radio buttons
              setMovieIndex(currentMovieIndex + 1);
              setRatingOption(null);
            } else {
              setMovieIndex(-1);
              setHideFilter(false);
              setMovies(null);
            }
          }
        }
      })()}

      {(() => {
        if (hideFilter) {
          return (
            <div>
              <button
                onClick={() => {
                  // save their movie choice here
                  console.log(
                    `About to save movie currentMovieIndex=${currentMovieIndex}, ratings option is ${ratingOption}`,
                    { currentUser, isAuthenticated, token }
                  );

                  if (!isAuthenticated) {
                    console.error("User not authenticated");
                    return;
                  }

                  const url = `${apiBaseURL}/movies`; // saving movie url
                  const movie = movies[currentMovieIndex];

                  fetch(url, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      userId: currentUser._id,
                      id: movie.imdbID,
                      ratingOption,
                      movieGenres: movie.Genre,
                    }),
                  })
                    .then((response) => {
                      if (response.ok) {
                        if (currentMovieIndex < movies.length - 1) {
                          // reset the selected status of the radio buttons
                          setMovieIndex(currentMovieIndex + 1);
                          setRatingOption(null);
                          response.json().then(console.log);
                        } else {
                          setMovieIndex(-1);
                          setHideFilter(false);
                          setMovies(null);
                        }
                      } else {
                        // could not save movie
                        console.error(
                          `could not save movie currentMovieIndex=${currentMovieIndex}, ratings option is ${ratingOption}: response status ${response.status} - ${response.statusText}`
                        );
                      }
                    })
                    .catch((err) => {
                      console.error(
                        `could not save movie currentMovieIndex=${currentMovieIndex}, ratings option is ${ratingOption}: caught error`,
                        err
                      );
                    });
                }}
              >
                Next Movie
              </button>
              <button
                onClick={() => {
                  if (currentMovieIndex < movies.length - 1) {
                    // reset the selected status of the radio buttons
                    setMovieIndex(currentMovieIndex + 1);
                    setRatingOption(null);
                  } else {
                    setMovieIndex(-1);
                    setHideFilter(false);
                    setMovies(null);
                  }
                }}
              >
                Have not seen
              </button>
            </div>
          );
        }
      })()}

      {/* {(() => {
        if (movies !== undefined && movies !== []) {
          return movies.map((movie) => (
            <div>
              <h1>{movie.Title}</h1>
              <img src={movie.Poster} />
            </div>
          ));
        } else {
          return <p>awaiting request</p>;
        }
      })()} */}
    </>
  );
};

export default PageOne;
