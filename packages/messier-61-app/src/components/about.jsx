/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { useTranslation } from "react-i18next";

export const About = (props) => {
  const { t } = useTranslation();

  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>{t("About")}</h2>
              <p>{t("About (Why)")}</p>
              <h3>{t("About (How)")}</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>{t("About (How 1)")}</li>
                    <li>{t("About (How 3)")}</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>{t("About (How 2)")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
