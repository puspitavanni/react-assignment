import { useEffect, useState } from "react";
import { Badge, Tr, Td, HStack, VStack, Heading, Box, TableContainer, Tab } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Table } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";

const Detail = ({ pokemon }) => {
  return (
    <Box>
      {pokemon && (
        <Box role="pokemon-detail">
          {/* TODO: display pokemon name here */}
          <Heading>{pokemon.name}</Heading>
          {/* TODO: answer here */}

          {/* TODO: display pokemon type here */}
          {pokemon.types.map((type) => (
            <Badge key={type.type.name} marginLeft={1}>{type.type.name}</Badge>
          ))}
          {/* TODO: answer here */}
          <HStack>
            <Image src={pokemon.sprites.front_default} />
            <Image src={pokemon.sprites.back_default} />
            <Image src={pokemon.sprites.front_shiny} />
            <Image src={pokemon.sprites.back_shiny} />
          </HStack>
          {/* TODO: render pokemon height, weight, base_experience, abilities, and stats here */}
          <TableContainer>
            <Table variant='simple'>
              <Tbody>
                <Tr>
                  <Td>Height</Td>
                  <Td>{pokemon.height}</Td>
                </Tr>
                <Tr>
                  <Td>Weight</Td>
                  <Td>{pokemon.weight}</Td>
                </Tr>
                <Tr>
                  <Td>Base Experience</Td>
                  <Td>{pokemon.base_experience}</Td>
                </Tr>
                <Tr>
                  <Td>Abilities</Td>
                  <Td>{pokemon.abilities.map((ability) => <p>{ability.ability.name}</p>)}</Td>
                </Tr>
                <Tr>
                  <Td>Stats</Td>
                  <Td>
                    {pokemon.stats.map((stat) => (
                      <p>{stat.stat.name}: {stat.base_stat}</p>
                    ))}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          {/* TODO: answer here */}
        </Box>
      )}
    </Box>
  );
};
const Page = () => {
  //TODO: read pokemonId from parameter
  const { pokemonId } = useParams(); // TODO: replace this
  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();
    setPokemon(data);
  };

  useEffect(() => {
    // TODO: answer here
    fetchPokemon(pokemonId);
  }, [pokemonId]);

  return <Detail pokemon={pokemon} />;
};

export default Page;
