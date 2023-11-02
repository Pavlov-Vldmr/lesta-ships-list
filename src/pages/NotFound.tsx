import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import tableImg from "../assets/img/table.avif"
import { Link } from "react-router-dom";


function NotFound() {
  return (
    <>
      <Box className="homePage-container">
        <Flex h="inherit" gap="20px" align="center" justifyContent="center" flexDirection='column'>
            <Text fontSize={50}>Page not Found</Text>
            <Link to="/"><Text cursor='pointer' fontSize={20} >To Home</Text></Link>
        </Flex>
      </Box>
    </>
  );
}

export default NotFound;