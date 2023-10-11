/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { useTranslation } from "react-i18next";

export const Header = (props) => {
  const { t } = useTranslation();

  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  External Brain
                  <span></span>
                </h1>
                <p>{t("Tag Line")}</p>
                <a href="#about" className="btn btn-custom btn-lg page-scroll">
                  Learn More
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
