/*
 * Copyright 2023 Paion Data. All rights reserved.
 */
import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Free & Open Source",
    Svg: require("@site/static/img/github.svg").default,
    description: <>All Messier-61 features are free and can be easily customized</>,
  },
  {
    title: "Machine Learning",
    Svg: require("@site/static/img/machine-learning.svg").default,
    description: (
      <>We revolutionize the personal management by baking Machine Learning as our knowledge management assistant.</>
    ),
  },
  {
    title: "Cloud Native",
    Svg: require("@site/static/img/cloud-native.svg").default,
    description: (
      <>
        You can host your own External Brain instance on your own infrastructure or simply use our service online.
        Register today to start a new knowledge journey!
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
