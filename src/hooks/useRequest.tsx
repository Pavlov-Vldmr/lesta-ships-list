
import { useState, useEffect } from 'react';
import { IShip } from "../models/shipModel";
// import { json } from "stream/consumers"
function useRequest() {
    const [ships, setShips] = useState<IShip[]>([]);
    const requestUrl = 'https://vortex.korabli.su/api/graphql/glossary/';
    // let ships
    const requestAllShips = (query: string) => {
        return fetch(requestUrl, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ query })
        }).then(res => res.json()).then((data) => {
            const takeShips = data.data.vehicles;
            const arrangedShips = takeShips.map((el: IShip) => {
                return {
                  ...el,
                  image: el.icons.medium,
                  country: el.nation.title,
                  class: el.type.title,
                  flag: el.nation.icons.large,
                  contour: el.icons.contour,
                };
              });
              setShips(arrangedShips);
            
        })
    }
    useEffect(() => {
        requestAllShips(`query allShips {
          vehicles (lang: "Ru") {
          title
          description
          icons {
            large
            medium
            contour
          }
          level
          type {
            name
            title
            icons {
              default
            }
          }
          nation {
            name
            title
            color
            icons {
              small
              medium
              large
            }
          }
        }

        
      }`);
    }, []);
    return ships;
}
// return useRequest();
export { useRequest };
