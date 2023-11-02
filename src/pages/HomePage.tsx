import { Box, Flex, Image } from "@chakra-ui/react";
import tableImg from "../assets/img/table.avif"
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <>
      <Box className="homePage-container">
        <Flex h="inherit" gap="20px" align="center" justifyContent="center">
            <Link className="nav-item ships" to='/shipslist' ><Image src={tableImg} /></Link>
            
        </Flex>
      </Box>
    </>
  );
}

export default HomePage;