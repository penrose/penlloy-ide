import { Layout, TabNode } from "flexlayout-react";
import "flexlayout-react/style/light.css";
import { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRecoilCallback } from "recoil";
import { styleEditorLayoutModel, topLayoutModel } from "./Layout.js";
import { NonStyleEditor, StyleEditor } from "./components/ProgramEditor.js";
import { StyleResourceEditor } from "./components/StyleResourceEditor.js";
import VizPanel from "./components/VizPanel.js";
import {
  currentDomainProgramState,
  currentSubstanceProgramState,
} from "./state/atoms.js";
import { useCompileDiagram } from "./state/callbacks.js";
import TopBar from "./components/TopBar.js";

type DomainAndSubstanceMessage = {
  kind: "DomainAndSubstance";
  domain: string;
  substance: string;
};

const App = ({ port }: { port: number }) => {
  if (port === null) {
    port = 1550;
  }

  const ws = useRef<WebSocket | null>(null);

  const compileDiagram = useCompileDiagram();
  const updateDomainAndSubstance = useRecoilCallback(
    ({ set }) =>
      async (domain: string, substance: string) => {
        await set(currentDomainProgramState, domain);
        await set(currentSubstanceProgramState, substance);
        await compileDiagram();
      }
  );

  const connectPenroseProgramServer = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:" + port);
    ws.current.onclose = () => {
      toast.error("disconnected from Penlloy's Penrose program server", {
        duration: 2000,
      });
    };
    ws.current.onerror = () => {
      toast.error("couldn't connect to Penlloy's Penrose program server", {
        duration: 2000,
      });
    };
    ws.current.onopen = () => {
      toast.success("connected to Penlloy's Penrose program server", {
        duration: 2000,
      });
    };
    ws.current.onmessage = (e) => {
      const parsed = JSON.parse(e.data) as DomainAndSubstanceMessage;
      console.log(parsed);
      const { domain, substance } = parsed;
      updateDomainAndSubstance(domain, substance);
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
    </div>
  );
};

export default App;
