import { useRecoilState, useRecoilValue } from "recoil";
import { sendExploreModelOperation, ws } from "../App.js";
import BlueButton from "./BlueButton.js";
import styled from "styled-components";
import { currentModelConfig } from "../state/atoms.js";
import { useEffect } from "react";

const FooterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function ModelToolbar() {
  const modelConfig = useRecoilValue(currentModelConfig);
  const { isTrace } = modelConfig;

  return (
    <nav
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "#F4F4F4",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      {isTrace ? (
        <FooterButtonContainer>
          <BlueButton
            title="Changes the initial values of variables and provides a new trace"
            onClick={() => sendExploreModelOperation("NewInit")}
          >
            New Init
          </BlueButton>
          <BlueButton
            title="Keeps the initial state but provides a new trace"
            onClick={() => sendExploreModelOperation("NewTrace")}
          >
            New Trace
          </BlueButton>
          <BlueButton
            title="Keeps the intial state and all prior steps, but provides a new successor step"
            onClick={() => sendExploreModelOperation("NewFork")}
          >
            New Fork
          </BlueButton>
          <BlueButton
            title="Step left"
            onClick={() => sendExploreModelOperation("StepLeft")}
          >
            ←
          </BlueButton>
          <BlueButton
            title="Step right"
            onClick={() => sendExploreModelOperation("StepRight")}
          >
            →
          </BlueButton>
        </FooterButtonContainer>
      ) : (
        <FooterButtonContainer>
          <BlueButton
            title="Changes the initial values of variables"
            onClick={() => sendExploreModelOperation("Next")}
          >
            New
          </BlueButton>
        </FooterButtonContainer>
      )}
    </nav>
  );
}
