import { NextPage, GetStaticProps } from 'next'
import Image from 'next/image'
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import { PokemonListResponse, SmallPokemon } from '../interfaces'

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
        {pokemons.map((pokemon: SmallPokemon, i: number) => (
          <li key={pokemon.name}>
            <a
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
              href={`/pokemon/${pokemon.name}`}>
              <Image
                src={pokemon.img}
                alt={pokemon.name}
                width={200}
                height={200}
                placeholder='blur'
                blurDataURL={pokemon.img}
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
  const { data } = await pokeApi.get(`/pokemon/?limit=150`)

  const pokemons = data.results.map((pokemon: SmallPokemon, i: number) => {
    const paddedId = ('00' + (i + 1)).slice(-3)
    const img = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`
    return { ...pokemon, img }
  })

  return {
    props: { pokemons: pokemons },
  }
}

export default HomePage
