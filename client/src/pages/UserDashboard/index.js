import React, { useEffect } from "react";
import "../styles/style.css"
import { Header, Message } from "semantic-ui-react";
import { useSelector } from "react-redux";
// import the core library.
import RadarChart from 'react-svg-radar-chart';
import '../styles/style.css';
import { useState } from "react";
import { Link } from "react-router-dom";

const getRatingFromText = (rating) => {
  if (rating === "Good") {
    return 2;
  } else if (rating === "Okay") {
    return 1;
  } else if (rating === "Bad") {
    return 0;
  }
}

// The usage of ReactEChartsCore are same with above.

export const UserDashboard = () => {
  // access to the currentUser property from the auth reducer state
  const [genres, setGenres] = useState([]);
  const [userPrefs, setUserPrefs] = useState(null);
  const [dataIndicators, setDataIndicators] = useState();
  const [dataDoesExist, setDataDoesExist] = useState();
  const [chartData, setChartData] = useState();
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);
  const currentUser = useSelector(state=>state.auth.currentUser);
  const token = useSelector(state=>state.auth.token);

  const apiBaseURL = 'http://localhost:3001';

  // fetch the user's genre preferences
  useEffect(()=>{

    const url = `${apiBaseURL}/movies/stats`; // saving movie url

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(async response=>{
      if(response.ok) {
        let json = await response.json()
        setGenres(Object.keys(json));
        setUserPrefs(json);
      } else {
        setUserPrefs(null);
        setGenres([]);
        console.error(`could not get user preferences: ${response.statusText} - ${response.statusText}`);
      }
    })
    .catch (err=>{
      setUserPrefs(null);
      setGenres([]);
      console.error(`could not get user preferences: caught error`, err);
    });

  }, []);

  useEffect(() => {
    setDataDoesExist(false);
    const secUrl = `${apiBaseURL}/user/movies/${currentUser._id}`
    if (currentUser) {
      fetch(secUrl)
      .then(res => res.json())
      .then(data => {
        if (data.movies.length === 0) {
          setDataDoesExist(true);
        } else {
          let points = {};
          let allGenres = [];

          let movies = data.movies;
          movies.forEach((movie) => {
            let parsedGenres = movie.movieGenres.split(", ");
            parsedGenres.forEach((genre) => {
              allGenres.push(genre);
              if (points[genre] === undefined) {
                points[genre] = {
                  total: 1,
                  score: getRatingFromText(movie.ratingOption)
                }
              } else {
                let obj = points[genre];
                obj.total = obj.total + 1;
                obj.score = obj.score + getRatingFromText(movie.ratingOption);
                points[genre] = obj;
              }
            })
          });

          let uniqueGenres = allGenres.filter((v, i, s) => {
            return s.indexOf(v) === i;
          });

          let captions = {};
          uniqueGenres.forEach((genre) => {
            captions[genre] = genre;
          });

          let preData = {};
          uniqueGenres.forEach((genre) => {
            return preData[genre] = (points[genre].score / points[genre].total) / 2;
          });

          setDataIndicators(captions);
          setChartData([{data: preData, meta: {color: 'black'}}])
        }
      })
    }
  }, [currentUser])

  useEffect(() => {
    if (dataIndicators && chartData) {
      console.log(dataIndicators)
      console.log(chartData);
      setDataDoesExist(true);
    }
  }, [dataIndicators, chartData])

  return (
    <>
      <Message className="message-container" size="huge" secondary="true" style={{backgroundColor: "transparent", boxShadow: "none"}}>
        <Header className="userDash" size="huge"> User Dashboard </Header>
        <p style={{color: "white"}}>View your recommended movies <Link to="/recommended">here</Link>.</p>
        <p>Welcome {currentUser ? currentUser.email : ""}</p>
      </Message>
      <div className="radarChart">
          {dataDoesExist ? <RadarChart
            captions={dataIndicators}
            data={chartData}
            size={450}
            options={{
              dots: true,
              captionProps: () => ({
                className: 'caption',
                textAnchor: 'middle',
                fontSize: 20,
                fontFamily: 'sans-serif'
              }),
            }}
          /> : <p>No data to display</p>}
        </div>
    </>
  );
};

export default UserDashboard;
