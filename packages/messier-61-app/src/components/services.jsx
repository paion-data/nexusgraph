/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { useTranslation } from "react-i18next";

export const Services = (props) => {
  const { t } = useTranslation();

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>{t("Highlights")}</h2>
          <p>{t("Highlights Tag Line")}</p>
        </div>
        <div className="row">
          <div key="hightlight-1" className="col-md-4">
            {" "}
            <i className="fa fa-github"></i>
            <div className="hightlight-desc">
              <h3>{t("Hightlights 1 Title")}</h3>
              <p>{t("Hightlights 1 Description")}</p>
            </div>
          </div>

          <div key="hightlight-2" className="col-md-4">
            {" "}
            <i className="fa fa-heart"></i>
            <div className="hightlight-desc">
              <h3>{t("Hightlights 2 Title")}</h3>
              <p>{t("Hightlights 2 Description")}</p>
            </div>
          </div>

          <div key="hightlight-3" className="col-md-4">
            {" "}
            <i className="fa fa-cloud"></i>
            <div className="hightlight-desc">
              <h3>{t("Hightlights 3 Title")}</h3>
              <p>{t("Hightlights 3 Description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
