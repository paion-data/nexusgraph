// Copyright 2023 Paion Data. All rights reserved.
import * as Sentry from "@sentry/react";
import { produce } from "immer";
import { useDispatch } from "react-redux";
import { AstraiosClient } from "../../nexusgraph-astraios";
import { GraphBrowser } from "../../nexusgraph-graph";
import {
  GraphMetaData,
  GraphState,
  initialState,
  selectGraphData,
  selectGraphList,
  selectOAuth,
  updateGraphData,
  updateGraphList,
  updateSingleItem,
} from "../../nexusgraph-redux";
import logo from "../public/logo.svg";
import user from "../public/user.svg";
import { DeleteButton } from "./component";
import GraphTitle from "./component/GraphTitle";
import { SideBar } from "./component/sidebar";
import {
  AppLogo,
  AppName,
  StyledApp,
  StyledAppHeader,
  StyledBody,
  StyledFooter,
  StyledGraphBrowser,
  StyledGraphTitle,
  StyledSidebar,
  StyledUserIcon,
} from "./styled";

/**
 * {@link App} defines the overall [layout](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background)
 * as well as the common dynamics of the app, such as deleting a graph or updating a graph state.
 *
 * @returns a React DOM object
 */
export default function App(): JSX.Element {
  const dispatch = useDispatch();

  const userId = selectOAuth().userInfo.sub;
  const accessToken = selectOAuth().accessToken;

  const astraiosClient = new AstraiosClient(userId, accessToken);
  const graphSate = selectGraphData();
  const graphId = graphSate.id;
  const graphList = selectGraphList();

  const setDisplayingGraphById = (graphId: string | undefined) => {
    if (graphId == null) {
      return;
    }

    astraiosClient.getGraphById(graphId).then((response) => {
      const graph = response.data.data.graph.edges[0].node;
      dispatch(
        updateGraphData({
          id: graph.id,
          name: graph.name,
          nodes: JSON.parse(graph.graph).nodes,
          links: JSON.parse(graph.graph).links,
        })
      );
    });
  };

  const onTitleUpdate = (graphId: string, newTitle: string) => {
    if (graphId == null) {
      const error = new Error("graphId is null");
      Sentry.captureException(error);
      throw error;
    }

    let newGraphData: GraphState = produce(graphSate, (draft) => {
      draft.name = newTitle;
    });

    astraiosClient.saveOrUpdate(newGraphData).then((response) => {
      dispatch(updateSingleItem({ id: graphId, name: newTitle }));
    });
  };

  const deleteGraphById = (graphId: string) => {
    if (graphId == null) {
      const error = new Error("graphId is null");
      Sentry.captureException(error);
      throw error;
    }

    astraiosClient.deleteGraphById(graphId).then((response) => {
      const nextDisplayedGraphId = getNextDisplayedGraphId(graphList, graphId);

      if (nextDisplayedGraphId == null) {
        dispatch(updateGraphList([]));
        dispatch(updateGraphData(initialState));
        return;
      }

      astraiosClient.getGraphById(nextDisplayedGraphId).then((response) => {
        const graph = response.data.data.graph.edges[0].node;
        dispatch(
          updateGraphData({
            id: graph.id,
            name: graph.name,
            nodes: JSON.parse(graph.graph).nodes,
            links: JSON.parse(graph.graph).links,
          })
        );
        dispatch(updateGraphList(graphList.filter((metadata) => metadata.id != graphId)));
      });
    });
  };

  return (
    <StyledApp>
      <StyledAppHeader>
        <StyledUserIcon>
          <img src={user} alt="User" />
        </StyledUserIcon>
        {graphId && (
          <StyledGraphTitle>
            <GraphTitle graphId={graphId} onChange={onTitleUpdate} />
          </StyledGraphTitle>
        )}
      </StyledAppHeader>

      <StyledBody>
        <StyledSidebar>
          <SideBar onClick={setDisplayingGraphById} graphList={graphList} />
        </StyledSidebar>
        <StyledGraphBrowser id="graphBrowser">
          {graphId && <DeleteButton graphId={graphId} onClick={deleteGraphById} />}
          <GraphBrowser />
        </StyledGraphBrowser>
      </StyledBody>

      <StyledFooter>
        <AppLogo>
          <img src={logo} alt="Logo" />
        </AppLogo>
        <AppName>Nexus Graph</AppName>
      </StyledFooter>
    </StyledApp>
  );
}

function getNextDisplayedGraphId(graphList: GraphMetaData[], deletedGraphId: string) {
  const listLen = graphList.length;

  if (listLen == 1) {
    return null;
  }

  const deletedGraphIdIdx = graphList.findIndex((metadata) => metadata.id == deletedGraphId);

  return deletedGraphIdIdx == listLen - 1 ? graphList[deletedGraphIdIdx - 1].id : graphList[deletedGraphIdIdx + 1].id;
}
