// Copyright 2023 Paion Data. All rights reserved.
import { useEffect, useState } from "react";
import Alert from "../../../nexusgraph-app/src/component/Alert";
import { VizItem } from "../VizItem";

export default function NodeDetailPanel({ selectedItem }: { selectedItem: VizItem }): JSX.Element {
  const shownEl = selectedItem;
  const item: any = selectedItem.item;

  const [x, setX] = useState(item["x"]);
  const [y, setY] = useState(item["y"]);

  useEffect(() => {
    setX(-item["x"] + 968);
    setY(-item["y"] + 326);
  }, [item["x"], item["y"]]);

  return (
    <>
      {shownEl.type === "node" && (
        <>
          <Alert
            showAlert={true}
            setShowAlert={() => {}}
            alertContent={getNodeName(selectedItem)}
            x={x + "px"}
            y={y + "px"}
          ></Alert>
        </>
      )}
    </>
  );
}

const getNodeName = (selectedItem: any) => {
  const nodeProperty = selectedItem.item["propertyMap"];
  for (let key in nodeProperty) {
    if (key == "name") {
      return nodeProperty[key];
    }
  }
};
