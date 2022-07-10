import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse } from '../interfaces'

interface Props {
  pokemons: PokemonListResponse
}

const HomePage: NextPage<Props> = (props) => {
  const { pokemons } = props

  return (
    <Layout title='Listado de Pokémnos'>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}>
        {pokemons.results.map((pokemon, i) => (
          <li key={pokemon.name}>
            <a
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              href={`/pokemon/${pokemon.name}`}>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  i + 1
                }.png`}
                alt={pokemon.name}
                width={200}
                height={200}
              />
              {pokemon.name}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

  return {
    props: {
      pokemons: data,
    },
  }
}

export default HomePage
