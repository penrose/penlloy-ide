import BlueButton from "./BlueButton.js";
import styled from "styled-components";


const FooterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
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
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      boxSizing: "border-box",
    }}>
      <FooterButtonContainer>
        <BlueButton title="Changes the initial values of variables and provides a new trace">New Init</BlueButton>
        <BlueButton title="Keeps the initial state but provides a new trace">New Trace</BlueButton>
        <BlueButton title="Keeps the intial state and all prior steps, but provides a new successor step">New Fork</BlueButton>
        <BlueButton title="Step left">←</BlueButton>
        <BlueButton title="Step right">→</BlueButton>
      </FooterButtonContainer>
    </nav>
  );

}




  



