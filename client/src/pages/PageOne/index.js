import React, { useState, useEffect } from "react";
import { Header, Message } from "semantic-ui-react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

export const PageOne = () => {
  // useState =
  let [movies, setMovies] = useState();
  let [currentMovieIndex, setMovieIndex] = useState(-1);
  let [hideFilter, setHideFilter] = useState(false);

  // let [name, setName] = useState("blu");

  useEffect(() => {
    if (movies && movies.length > 0) {

      setMovieIndex(0);

    }
  }, [movies])

  const requestMovies = () => {
    setHideFilter(true);
    let url = "http://localhost:3001/movies/filter/?";
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

  

  return (
    <>
      <Message className="message-container" size="huge" secondary="true">
        <Header size="huge"> Personal User Statistics </Header>
        <p>Select movie genres</p>
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
          return (<button onClick={requestMovies}>Send me movies!</button>);
        }
     })()}

      {(() => { 
        if (currentMovieIndex !== -1) {
          return (
            <div>
              <h1>{movies[currentMovieIndex].Title}</h1>
              <img src={movies[currentMovieIndex].Poster} />
            </div>
          );
        }
      })()}

      {(() => {
        if (hideFilter) {
          return (<button onClick={() => {
            if (currentMovieIndex < movies.length - 1) {
              setMovieIndex(currentMovieIndex + 1);
            } else {
              setMovieIndex(-1);
              setHideFilter(false);
              setMovies(null);
            }
          }}>Next Movie</button>)
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
