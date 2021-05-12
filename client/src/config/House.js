import React from "react";
import Particles from "react-particles-js";

function House() {
  return (
    <Particles
      params={{
        polygon: {
          color: {
            value: "#ffffff"
          },
          number: {
            value: 160,
            density: {
              enable: true,
              value_area: 1500,
            },
          },
          line_linked: {
            enable: false,
            opacity: 0.03,
            color: {
              value: "#ffffff"
            }
          },
          move: {
            direction: "right",
            speed: 0.01,
          },
          size: {
            value: 1,
          },
          opacity: {
            polygon: {
              enable: true,
              speed: 1,
              opacity_min: 0.05,
            },
          },
        },
        interactivity: {
          events: {
            onclick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              particles_nb: 1,
            },
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default House;