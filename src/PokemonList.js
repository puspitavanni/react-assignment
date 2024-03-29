import { useEffect, useState } from "react";
import {
  Card,
  HStack,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1); // TODO: replace this

  useEffect(() => {
    if (searchParams) {
      const page = parseInt(searchParams.get("page") || 1);
      setCurrentPage(page);
    }
  }, [searchParams])

  const moveTo = (direction) => {
    if (direction === "prev") {
      // TODO: answer here
      // setCurrentPage(currentPage - 1);
      setSearchParams({ page: currentPage - 1 });
    } else {
      // TODO: answer here
      // setCurrentPage(currentPage + 1);
      setSearchParams({ page: currentPage + 1 })
    }
  };

  return (
    <HStack>
      {/* TODO: render Prev and Next button */}
      <Button onClick={() => moveTo('prev')} disabled={currentPage == 1}>{'< Prev'}</Button>
      <Button onClick={() => moveTo('next')}>{'Next >'}</Button>
      {/* TODO: answer here */}
    </HStack>
  );
};

const PokemonList = ({ pokemons }) => {
  console.log(pokemons);
  return (
    pokemons &&
    pokemons.length > 0 && (
      <Box role="pokemon-list">
        {pokemons.map((pokemon) => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <Card padding={3}>
              <CardHeader>
                <Heading as="h3" size="md">
                  {pokemon.name}
                </Heading>
              </CardHeader>
              {/* TODO: render pokemon images & type here */}
              <Flex>
                <Image src={pokemon?.sprites?.front_default} alt='Front Default' /> 
                <Image src={pokemon?.sprites?.back_default} alt='Back Default' /> 
                <Image src={pokemon?.sprites?.front_shiny} alt='Front Shiny' /> 
                <Image src={pokemon?.sprites?.back_shiny} alt='Back Shiny' /> 
              </Flex>
              <Flex>
                {pokemon.types.map((type) => (
                  <Badge key={type.type.name} marginLeft={1}>{type.type.name}</Badge>
                ))}
              </Flex>
              {/* TODO: answer here */}
            </Card>
          </Link>
        ))}
      </Box>
    )
  );
};
const Home = () => {
  //get list
  const fetchPokemons = async (page) => {
    //get pokemon list with image
    const displayPerPage = 20;
    const offset = (page - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${displayPerPage}&offset=${offset}`;

    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results.map(async (pokemon) => {
      const pokemonResponse = await fetch(pokemon.url);
      const pokemonData = await pokemonResponse.json();
      return pokemonData;
    });

    //set pokemonList to state
    setPokemons(await Promise.all(pokemonList));
  };

  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || 1);
    fetchPokemons(page);
  }, [searchParams]);

  return (
    <>
      <Heading as="h2" size="lg">
        Pokemon List
      </Heading>
      <Pagination />
      <PokemonList pokemons={pokemons} />
    </>
  );
};

export default Home;
