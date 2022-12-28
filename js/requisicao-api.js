//Objeto em escopo global para ser acessado pelos demais arquivos
const PokeApi = {}

//Função para realizar a requisição dos detalhes dos pokemons e tranformar a resposta em JSON
PokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(detailPokemon)
}

//Fazer requisição http via JavaScript com Fetch API usando arrow function
//Arrow function que recebe parâmetros com valores default
PokeApi.getPokemons = (offset = 0, limit = 100) => {
    //Variável que recebe o endereço da API, que será usada para fazer a requisição
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    //O fetch() realiza a requisição e retorna uma promisse - É assincrona
    return fetch(url)
        //.then() serve para processar o sucesso da promisse - Neste caso transformará a resposta da requisição em formato JSON
        .then((response) => response.json())
        //Exibir a lista de pokemons em JSON
        .then((jsonBody) => jsonBody.results)
        //Cada pokemon da lista tem uma url nos detelhes, que vamos usá-la para realizar outra requisição
        //o .map transformará a lista de pokemons em uma lista de novas requisições em formato JSON
        .then((pokemons) => pokemons.map(PokeApi.getPokemonsDetail))
        //Lista de requisições de promessa e vamos esperar ela ser resolvida
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        //.catch() serve para capturar o erro da promisse
        .catch((error) => console.log(error))       
    ;
}

function detailPokemon(pokeDetail){
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.order;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}