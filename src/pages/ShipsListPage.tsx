import React from "react";
// import { useRequest } from "../hooks/useRequest"
// import { IShipsData } from "../models/shipModel";
import ShipsTable from "../components/ShipsTable"


function ShipsListPage() {
  // const ships = useRequest();


  return (<>
    {console.log("1")}
    <ShipsTable></ShipsTable>
  </>
  );
  // console.log('3');
}

export default ShipsListPage;