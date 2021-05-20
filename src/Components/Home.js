import { Component } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
require("dotenv").config();

const Home = () => {
  const [videoShow, setvideoShow] = useState([]);
  const [userInput, setuserInput] = useState("");

  const fetchVideos = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}&part=snippet&type=video&q=${userInput}`
      );
      const items = res.data.items;
      const item = items.map((item) => {
        return item.id;
      });
      setvideoShow(item);
      debugger;
    } catch (error) {
      console.log(error);
    }
  };

  // const videoList = () => {
  //   videoShow.map((video) => {
  //     return <ul>
  //       <li>https://www.youtube.com/watch?v={video}</li>
  //     </ul>
  //   })

  // }

  const handleInput = (e) => {
    setuserInput(e.target.value);
  };
  return (
    <div>
      <h1>Search for some videos</h1>
      <form onSubmit={fetchVideos}>
        <input
          type="text"
          placeholder="search for a video"
          id="video"
          onChange={handleInput}
        />
        <button type="submit" value="search">
          Search
        </button>
      </form>

      {videoShow.map((video) => {
        const link = `https://www.youtube.com/watch?v=${video.videoId}`;
        return (
          <ul>
            <li>
              <a href={link}>{link}</a>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

// we can get videoId from axios return
// cannot place videoId into link
// cannot show video results from search
// was able to get result using map returning <a> tag in <li> tag
// no video preview

export default Home;
