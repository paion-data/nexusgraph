/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import { useTranslation } from "react-i18next";

export const Team = (props) => {
  const { t } = useTranslation();

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>{t("Team")}</h2>
          <p>
            <em>{t("Team Tag Line")}</em>
          </p>
        </div>
        <div id="row">
          <div key="member-1" className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="img/team/ceo.png" alt="Member 1" className="team-img" />
              <div className="caption">
                <h4>{t("Team Member 1 Name")}</h4>
                <p>{t("Team Member 1 Title")}</p>
              </div>
            </div>
          </div>

          <div key="member-2" className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="img/team/02.jpg" alt="Member 2" className="team-img" />
              <div className="caption">
                <h4>{t("Team Member 2 Name")}</h4>
                <p>{t("Team Member 2 Title")}</p>
              </div>
            </div>
          </div>

          <div key="member-3" className="col-md-4 col-sm-6 team">
            <div className="thumbnail">
              {" "}
              <img src="img/team/Minghui.png" alt="Member 3" className="team-img" />
              <div className="caption">
                <h4>{t("Team Member 3 Name")}</h4>
                <p>{t("Team Member 3 Title")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
