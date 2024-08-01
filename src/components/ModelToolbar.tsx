import { broadcast, ws } from "../App.js";
import BlueButton from "./BlueButton.js";
import styled from "styled-components";


const FooterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;



export default function ModelToolbar() {


  {/*  
  const newInit;
  const newTrace;
  const newFork;
  const stepLeft;
  const stepRight;
  */}
  

  return (

    <nav style={{
      display: "flex",
      width: "100%",
      backgroundColor: "#F4F4F4",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
      boxSizing: "border-box",
    }}>
      <FooterButtonContainer>
        <BlueButton title="Changes the initial values of variables and provides a new trace" onClick={() => broadcast({operation: 'NewInit'})}>New Init</BlueButton>
        <BlueButton title="Keeps the initial state but provides a new trace" onClick={() => broadcast({operation: 'NewTrace'})}>New Trace</BlueButton>
        <BlueButton title="Keeps the intial state and all prior steps, but provides a new successor step" onClick={() => broadcast({operation: 'NewFork'})}>New Fork</BlueButton>
        <BlueButton title="Step left" onClick={() => broadcast({operation: 'StepLeft'})}>←</BlueButton>
        <BlueButton title="Step right" onClick={() => broadcast({operation: 'StepRight'})}>→</BlueButton>
      </FooterButtonContainer>
    </nav>
  );

}




  



