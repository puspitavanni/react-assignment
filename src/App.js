import { Box, HStack, Container, Heading } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pokemon from "./PokemonList";
import { Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";
import PokemonLegend from "./PokemonLegend";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { useNavigate } from "react-router-dom";

const App = () => {
  let navigate = useNavigate();
  const enterSecretPage = () => {
    navigate("/legend?password=secret");
  };

  return (
    <Container marginTop="2">
      <Box marginBottom={5}>
        <Heading as="h1">PokeDeh</Heading>
        <HStack spacing="2">
          <Link to="/">Home</Link>
          <Link to="/pokemon">Pokemon</Link>
          <Link to="/legend" onDoubleClick={enterSecretPage}>
            Legend
          </Link>
        </HStack>
      </Box>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* TODO: answer here */}
        <Route path="pokemon" element={<Pokemon />} />
        <Route path="pokemon/:pokemonId" element={<PokemonDetail />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="legend" element={
          <ProtectedRoute>
            <PokemonLegend />
          </ProtectedRoute>
        } />
      </Routes>
    </Container>
  );
};

export default App;
