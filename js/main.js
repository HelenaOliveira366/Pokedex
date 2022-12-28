function generatePokemonList(pokemon){
    //Lista HTML de pokemons
    //${pokemon.order} serve para indicar o número de cada pokemon através da resposta da requisição
    //${pokemon.name} serve para indicar o nome de cada pokemon através da resposta da requisição
    return(`
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
                    
            <div class="detail">
                <ol class="types">
                    <!--Adicionando parte dinâmica que exibe os tipos específicos de cada pokemon-->
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                    
                <!--Especificar o caminho da imagem na pokeapi-->
                <img src="${pokemon.photo}" alt="Imagem do ${pokemon.name}">
            </div>
        </li>
    `)
}

//Mapear o resultado da requisição para popular a lista HTML
//Captura da estrutura de lista HTML (<ol></ol>)
const pokemonList = document.getElementById('pokemonsList');

/*Mapear lista de pokemons e transformar em um item de lista HTML e juntar esses itens sem separador e inserir no front-end*/
PokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(generatePokemonList).join('')
})

/*Função que retorna os tipos de cada pokemon para um item de lista*/
function pokemonTypes(type){
    //Retorna o name que está dentro de type - podem ser visto na resposta da requisição
    return type.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}