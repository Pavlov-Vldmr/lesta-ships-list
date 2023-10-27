import React from "react";
// import { useRequest } from "../hooks/useRequest"
// import { IShipsData } from "../models/shipModel";
import ShipsTable from "../components/ShipsTable"
import StageOuter from '../components/StageOuter/StageOuter';


function ShipsListPage() {
  // const ships = useRequest();
  const test =() => {
    let tr = document.getElementsByTagName("tr");
    let test = tr[0].getAttribute("content")
    console.log(test)
  }

  return (<>
  {console.log("1")} 
    <StageOuter/>
    <ShipsTable></ShipsTable>
  {/* {test()}  */}
  

  </>
   
   
  //  {console.log('res: ' + ships[1].nation.name)} 
   

  );
  console.log('3');
}

export default ShipsListPage;