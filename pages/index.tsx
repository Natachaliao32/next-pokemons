import { List, Typography } from "antd"

import { GetStaticProps } from "next"
import Link from "next/link"

type PokemonsProps = {
  pokemons: {
    name: string,
    url: string,
  }[]
}

const Pokemons = ({ pokemons }: PokemonsProps) => {

  const { Title } = Typography

  return (
    <div className="page">

      <List
        header={<Title level={3}>Pokemons</Title>}
        bordered
        dataSource={pokemons.map(pokemon => pokemon.name)}
        renderItem={item => (
          <List.Item>
            <Link href={`/pokemons/${item}`}>{item}</Link>
          </List.Item>
        )}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const req = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await req.json();

  return {
    props: { pokemons: data.results }
  }
}

export default Pokemons;