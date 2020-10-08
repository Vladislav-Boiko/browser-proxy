import React from "react";
import cn from "classnames";
import { ReactComponent as NewWindowIcon } from "./new_window.svg";

import "./Footer.css";
const Footer = ({ className }) => {
  return (
    <ul className={cn("footer", className)}>
      <li>
        <a
          className="footer__link"
          href="#"
          onClick={() => {
            const features = {
              menubar: false,
              location: false,
              resizable: true,
              toolbar: false,
              scrollbars: true,
            };
            const featuresString = Object.keys(features)
              .map((key) => `${key}=${features[key] ? "yes" : "no"}`)
              .join(",");
            const createdWin = window.open(
              "popup.html",
              "Browser-proxy",
              featuresString
            );
          }}
        >
          <NewWindowIcon className="new-window__icon" />
          Open in a separate window
        </a>
      </li>
    </ul>
  );
};

export default Footer;
