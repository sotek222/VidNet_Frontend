import React from "react";
import { ThemeProvider } from "styled-components";
import { themes, WindowContent, Divider } from "react95";
import Me from "../icons/me.png";

const About = props => {
  return (
    <ThemeProvider theme={themes.default}>
      <WindowContent style={{ marginTop: -15 }}>
        <h1>About</h1>
        <Divider stlye={{ marginBottom: 5 }} />
        <img className="me-icon" src={Me} alt="Me" />
        <p>
          VidNet is a website for watching videos with your friends. Vidnet
          allows for sharing of youtube, dailymotion, soundcloud and more!
        </p>
        <p>
          Aesthetically the website is designed with a certain operating system
          in mind. If you like the 90's than you'll like this site!
        </p>
        <h4 style={{ marginBottom: -2 }}>About the Developer:</h4>
        <p>
          Matthew is a New York based Full Stack Web Developer, this is my
          capstone project as part of the Flatiron school curriculum.
          <a src="https://github.com/sotek222">Github</a>
        </p>
      </WindowContent>
    </ThemeProvider>
  );
};

export default About;
