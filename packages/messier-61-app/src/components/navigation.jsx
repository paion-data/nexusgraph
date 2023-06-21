/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { useTranslation } from "react-i18next";
import "../i18n";

export const Navigation = (props) => {
  const { t } = useTranslation();

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span> <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
            Paion Data
          </a>{" "}
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#about" className="page-scroll">
                {t("About")}
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                {t("Highlights")}
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                {t("Team")}
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                {t("Contact")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
