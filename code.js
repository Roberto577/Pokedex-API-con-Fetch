const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const btnPrevious = document.getElementById('previous');
const btnNext = document.getElementById('next');

let offset = 1;
let limit = 11;

btnPrevious.addEventListener('click', ()=>{
    //offset no sea igual a 1, es decir, que no esta en la primera pagina
    if(offset != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
    
})

btnNext.addEventListener('click', ()=>{
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
})

//Cargamos el api por su id
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPokemon(data);
        spinner.style.display = "none";
    });
}

//Bucle for para traer 12 pokemons
//offset: inicio y limit final
function fetchPokemons (offset, limit){
    spinner.style.display = "block";
    for(let i = offset; i <= offset + limit; i++){
        fetchPokemon(i);
    }
}

function createPokemon(pokemon){
    //Paso 2: Crear la parte trasera de la card
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer);


    //Paso 1: creacion de la estructura de la card pokemon
    //Creamos la estructura de la card
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    //Creamos el contenedor de la imagen
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    //Creamos la imagen llamada sprite = duendecillos
    //cargamos la imagen desde la url del json
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    //añadimos la imagen al contenedor
    spriteContainer.appendChild(sprite);

    //Creamos el numero del pokemon
    //para el numero mostramos su id y modificamos su string añadiendo 3 ceros delante
    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    //Crear el nombre
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    //Añadimos todo a la car
    //imagen, numero y nombre
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);


    //Paso 3: creacion de la estrutura trasera
    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    
    //Llamamos la funcion de barras en el contenedor trasero
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);

    //Por ultimo añadimos la card con todos sus datos al div creado en el html
    pokemonContainer.appendChild(flipCard);
}

function progressBars(stats){
    //Contiene todos los stats
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');

    //itera uno a uno los stats
    for(let i=0; i < 6; i++){
        const stat = stats[i];

        //Obtiene el porcentaje del width
        const statPercent = stat.base_stat / 2 + "%";

        //Contiene solo un stat
        const statContainer = document.createElement('div');
        statContainer.classList.add('stat-container');

        //Contiene el nombre
        const statName = document.createElement('div');
        statName.classList.add('stat-name');
        statName.textContent = stat.stat.name;

        //Contiene todas las barrs
        const progress = document.createElement('div');
        progress.classList.add('progress');

        //Contiene una bar
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        //Config de barras para bootstrap
        progressBar.setAttribute('aria-valuenow', stat.base_stat);
        progressBar.setAttribute('aria-valuemin', 0);
        progressBar.setAttribute('aria-valuemax', 230);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        //Al container le almacenos las barras
        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }
    return statsContainer;
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset,limit);