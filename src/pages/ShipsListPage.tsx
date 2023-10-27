import React from "react";
// import { useRequest } from "../hooks/useRequest"
// import { IShipsData } from "../models/shipModel";
import ShipsTable from "../components/ShipsTable"


function ShipsListPage() {
  // const ships = useRequest();
  return (
    <ShipsTable></ShipsTable>
   
  //  {console.log('res: ' + ships[1].nation.name)} 
   

  );
}

export default ShipsListPage;