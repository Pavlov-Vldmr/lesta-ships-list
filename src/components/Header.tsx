import { Flex, Center, Box, Image } from "@chakra-ui/react";
import logo from "../assets/img/logo-long.svg"

import { NavLink } from "react-router-dom";

function Header() {
    return (
      <>
        <Box className="header">
        <Flex h="inherit">
          <Center h="inherit">
            <Image src={logo} marginLeft="80px"/>
            <NavLink className="nav-link" to="/">Главная</NavLink>
            <NavLink className="nav-link" to="/shipslist">Корабли</NavLink>
          </Center>
        </Flex>
      </Box>
      </>
    )
  }
  
  export default Header