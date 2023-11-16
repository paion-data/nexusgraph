// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../../../../nexusgraph-astraios";
import { t } from "../../../../../nexusgraph-i18n";
import { NLPClient } from "../../../../../nexusgraph-nlp";
import { appendToGraphList, INITIAL_GRAPH_NAME, selectOAuth, updateGraphData } from "../../../../../nexusgraph-redux";
import { container, TYPES } from "../../../../inversify.config";
import { Method } from "./methods";

const nlpClient: NLPClient = container.get<NLPClient>(TYPES.NLPClient);

interface MethodsSelectionModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  newGraphMethod: Method;
}

export function MethodModal(props: MethodsSelectionModalProps): JSX.Element {
  const dispatch = useDispatch();

  const [textInput, setTextInput] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const userId = selectOAuth().userInfo.sub;
  const accessToken = selectOAuth().accessToken;
  const astraiosClient = new AstraiosClient(userId, accessToken);

  const onHide = () => props.setShowModal(false);
  const onChange = (event: any) => setTextInput(event.target.value);

  useEffect(() => {
    setButtonDisabled(!textInput);
  }, [textInput]);

  const onClick = () => {
    nlpClient.entityExtraction(textInput).then((graph) => {
      if (graph.nodes.length == 0) {
        return;
      }

      astraiosClient
        .saveOrUpdate({ id: undefined, ...graph, name: INITIAL_GRAPH_NAME })
        .then((response) => {
          const graphId = response.data.data.graph.edges[0]["node"]["id"];
          const graphName = response.data.data.graph.edges[0]["node"]["name"];

          dispatch(updateGraphData({ id: graphId, ...graph, name: graphName }));
          dispatch(appendToGraphList({ id: graphId, name: graphName }));

          props.setShowModal(false);
        })
        .catch((error) => Sentry.captureException(error));
    });
  };

  return (
    <Modal show={props.showModal} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">NLP Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="text">
            <Form.Control
              as="textarea"
              required
              type="text"
              value={textInput}
              onChange={onChange}
              placeholder="Please enter some texts"
              defaultValue={"Please enter some texts"}
            />
          </Form.Group>

          <Button data-testid="newGraphButton-NLP" variant="primary" disabled={buttonDisabled} onClick={onClick}>
            {t("generateGraphFromText")}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
