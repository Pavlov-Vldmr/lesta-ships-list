import React from "react";
// import { useRequest } from "../hooks/useRequest"
// import { IShipsData } from "../models/shipModel";
import ShipsTable from "../components/ShipsTable"
import StageOuter from '../components/StageOuter/StageOuter';


function ShipsListPage() {
  // const ships = useRequest();


  return (<>
    {console.log("1")}
    <StageOuter />
    <ShipsTable></ShipsTable>
  </>
  );
  // console.log('3');
}

export default ShipsListPage;