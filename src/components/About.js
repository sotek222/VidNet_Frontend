import React from "react";
import { ThemeProvider } from "styled-components";
import { themes, WindowContent, Divider } from "react95";
import Me from "../icons/me.png";

const About = props => {
  return (
    <ThemeProvider theme={themes.default}>
      <WindowContent style={{ marginTop: -15 }}>
        <h1 style={{ marginBottom: -3 }}>About</h1>
        <Divider style={{ marginBottom: 12 }} />
        <img className="me-icon" src={Me} alt="Me" />
        <p>
          VidNet is a website for watching videos with your friends. Vidnet
          allows for sharing of Youtube, Dailymotion, Soundcloud and more!
        </p>
        <p>
          Aesthetically the website is designed with a certain operating system
          in mind. If you like the 90s then you'll like this site!
        </p>
        <h4 style={{ marginBottom: -2 }}>About the Developer:</h4>
        <p>
          Matthew is a New York based Full Stack Web Developer, this is his
          capstone project as part of the Flatiron School curriculum.
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/sotek222"
          >
            Github
          </a>
        </p>
      </WindowContent>
    </ThemeProvider>
  );
};

export default About;
