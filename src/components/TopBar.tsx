import styled from "styled-components";
import { useCompileDiagram, useResampleDiagram } from "../state/callbacks.js";
import BlueButton from "./BlueButton.js";
import {
  currentDirtyStyleProgramState,
  currentStyleProgramState,
} from "../state/atoms.js";
import { useRecoilState, useRecoilValue } from "recoil";

// const HeaderButtonContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `;

export default function TopBar() {
  const compileDiagram = useCompileDiagram();
  const resampleDiagram = useResampleDiagram();

  const dirtyStyleProgram = useRecoilValue(currentDirtyStyleProgramState);
  const [, setStyle] = useRecoilState(currentStyleProgramState);
  return (
    <nav
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: "#F4F4F4",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <BlueButton
        onClick={() => {
          setStyle(dirtyStyleProgram);
          compileDiagram();
        }}
      >
        apply style ▶
      </BlueButton>
      <BlueButton onClick={resampleDiagram}>resample ↻ </BlueButton>
    </nav>
  );
}
