import { Layout, TabNode } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRecoilCallback, useRecoilState } from "recoil";
import { styleEditorLayoutModel, topLayoutModel } from "./Layout.js";
import { NonStyleEditor, StyleEditor } from "./components/ProgramEditor.js";
import { StyleResourceEditor } from "./components/StyleResourceEditor.js";
import VizPanel from "./components/VizPanel.js";
import {
  currentDomainProgramState,
  currentServerStatusState,
  currentSubstanceProgramState,
  currentModelConfig,
} from "./state/atoms.js";
import { useCompileDiagram, useResampleDiagram } from "./state/callbacks.js";
import ModelToolbar from "./components/ModelToolbar.js";
import TopBar from "./components/TopBar.js";
import handleModelType from "./components/ModelToolbar.js";
import { ServerMessage } from "./types/MessageFromServer.js";
import {
  ExploreModelMessage,
  ExploreModelOp,
} from "./types/MessageToServer.js";

export let ws: React.MutableRefObject<WebSocket | null>;

export const sendExploreModelOperation = (op: ExploreModelOp) => {
  if (ws.current !== null) {
    console.log("sending model exploration operation: ", op);
    if (ws.current.readyState === WebSocket.OPEN) {
      const msg: ExploreModelMessage = {
        kind: "ExploreModel",
        operation: op,
      };
      const msgStr = JSON.stringify(msg);
      ws.current.send(msgStr);
      console.log("sent model exploration operation: ", op);
    }
  }
};

const App = ({ port }: { port: number }) => {
  if (port === null) {
    port = 1550;
  }

  const compileDiagram = useCompileDiagram();
  const updateDomainAndSubstance = useRecoilCallback(
    ({ set }) =>
      async (domain: string, substance: string) => {
        await set(currentDomainProgramState, domain);
        await set(currentSubstanceProgramState, substance);
        await compileDiagram();
      }
  );

  const [, setServerStatus] = useRecoilState(currentServerStatusState);

  const [, setModelConfig] = useRecoilState(currentModelConfig);

  ws = useRef<WebSocket | null>(null);
  const connectPenroseProgramServer = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:" + port);
    ws.current.onclose = () => {
      setServerStatus("disconnected");
    };
    ws.current.onerror = () => {
      setServerStatus("disconnected");
    };
    ws.current.onopen = () => {
      setServerStatus("connected");
    };

    //change here
    ws.current.onmessage = (e) => {
      const parsed = JSON.parse(e.data) as ServerMessage;
      if (parsed.kind === "DomainAndSubstance") {
        const { domain, substance } = parsed;
        updateDomainAndSubstance(domain, substance);
      } else {
        const { isTrace } = parsed;
        const newModelConfig = { isTrace };
        console.log(
          "received new model config: ",
          JSON.stringify(newModelConfig)
        );
        setModelConfig(newModelConfig);
      }
    };
  }, []);

  useEffect(() => {
    if (ws.current === null) {
      connectPenroseProgramServer();
    }
  }, []);

  const componentFactory = (node: TabNode) => {
    const component = node.getId();
    switch (component) {
      case "styleProgramEditor":
        return (
          <div
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                }}
              >
                <StyleEditor />
              </div>
            </div>
          </div>
        );
      case "styleResourcesEditor":
        return (
          <div
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <StyleResourceEditor />
            </div>
          </div>
        );
      case "domainProgramEditor":
        return (
          <div
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <span>
                <i>
                  This program is automatially generated from the Alloy model
                  and read-only.
                </i>
              </span>
              <NonStyleEditor languageType="domain" />
            </div>
          </div>
        );
      case "substanceProgramEditor":
        return (
          <div
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <span>
                <i>
                  This program is automatially generated from the Alloy instance
                  and read-only.
                </i>
              </span>
              <NonStyleEditor languageType="substance" />
            </div>
          </div>
        );
      case "vizPanel":
        return (
          <div
            style={{ display: "flex", flexDirection: "row", height: "100%" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
                width: "100%",
              }}
            >
              <VizPanel />
            </div>
          </div>
        );
      case "styleEditor":
        return (
          <Layout model={styleEditorLayoutModel} factory={componentFactory} />
        );
    }
    return <div> PlaceHolder </div>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <TopBar />
      <div style={{ position: "relative", flex: 1 }}>
        <Layout model={topLayoutModel} factory={componentFactory} />
      </div>
      <ModelToolbar />
    </div>
  );
};

export default App;
