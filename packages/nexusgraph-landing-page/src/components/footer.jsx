/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import { useTranslation } from "react-i18next";
import "../i18n";

export const Footer = (props) => {
  const { t } = useTranslation();

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>{t("Contact")}</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i>
                </span>
                {t("Address")}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i>
                </span>{" "}
                {t("Phone")}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i>
                </span>{" "}
                {t("Email")}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={t("github")}>
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>&copy; 2023 Paion Data.</p>
        </div>
      </div>
    </div>
  );
};
