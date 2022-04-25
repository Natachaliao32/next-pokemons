import { Divider, Typography } from "antd";

import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BackButton } from "../../components/BackButton";
import styles from "../../styles/Pokemon.module.css";

type PokemonProps = {
  pokemon: any
}

const Pokemon = ({ pokemon }: PokemonProps) => {

  console.log("pokemon: ", pokemon);
  const { Text, Title } = Typography;
  const router = useRouter();
  const { name } = router.query;
  const { height, weight, types, stats, sprites } = pokemon;

  return (
    <div className="page">
      <Head>
        <title>{name}</title>
      </Head>

      <BackButton />

      <main className={styles.container}>

        <Title className={styles.title}>{name}</Title>
        <Divider></Divider>

        <div className={styles.row}>

          <Image src={sprites.front_default} width={400} height={400} />

          <div className={styles.info}>

            <div className={styles.basicInfo}>
              <Text strong>name</Text>
              <Text>{name}</Text>
              <Text strong>height</Text>
              <Text>{height} m</Text>
              <Text strong>weight</Text>
              <Text>{weight} kg</Text>
            </div>

            <div>
              <Divider>Types</Divider>
              <div className={styles.types}>
                {types.map((type: any, i: number) =>
                  <span key={`type-${i}`} className={styles.type}>{type.type.name}</span>
                )}
              </div>
            </div>

            <div>
              <Divider>Stats</Divider>
              <div className={styles.stats}>
                {stats.map((stat: any, i: number) =>
                  <>
                    <Text strong>{stat.stat.name}</Text>
                    <Text >{stat.base_stat}</Text>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  if (!params) return { props: {} }

  const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const data = await req.json();

  return {
    props: { pokemon: data }
  }
}

export default Pokemon;