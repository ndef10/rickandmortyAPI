// traer el contenido del input
const search = document.getElementById('search');

// traer el contenedor
const divCard = document.getElementById('containerCard');

// poner URLs en una constante 
const URL1 = 'https://rickandmortyapi.com/api/character/?page=';
const URL2 = 'https://rickandmortyapi.com/api/character/?name=';

let page = 1;

//Función asincrónica recibe una URL y page como parametro, 
//mediante fetch usa la URL para hacer una consulta a la API
//espera la respuesta, la parsea como JSON 
//y devuelve la propiedad results del objeto JSON resultante.
const getApi = async (URL1, page) => {
    const response = await fetch(URL1+ page);
    const data = await response.json()
    return data.results;
}

const getApi2 = async (URL2) => {
    const response = await fetch(URL2);
    const data = await response.json()
    return data.results;
}


//Funcion encargada de crear las cards
// en base a maquetacion en html anterior
const createCards = ( character) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;

    const description = document.createElement('div');
    description.classList.add('description');

    const title = document.createElement('h4');
    title.textContent = character.name
    const text = document.createElement('p');
    text.textContent = "Especie: " + character.species;
    // texto.textContent = "Procedencia: " + character.origin.name;
    

    card.appendChild(img);
    card.appendChild(description);

    description.appendChild(title);
    description.appendChild(text);

    divCard.appendChild(card);
}

//Trae la respuesta entregada por la funcion getApi usando la primera URL
//la mapea, y le entrega el resultado a la funcion que crea la card
const getToDoo = async () => {
    const response = await getApi (URL1, page);
    response.map(character => createCards(character));
}

//Funcion que muestra una card con un mensaje cuando no encuentra un personaje
const notFound = () => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = ('./assets/img/notfound.jpeg');
    img.alt = 'No lo encontramos';

    const description = document.createElement('div');
    description.classList.add('description');

    const title = document.createElement('h4');
    title.textContent = 'Personaje no encontrado'
    const text = document.createElement('p');
    text.textContent = "Realiza otra busqueda ";

    card.appendChild(img);
    card.appendChild(description);

    description.appendChild(title);
    description.appendChild(text);

    divCard.appendChild(card);
}

//Esta limpia el contenedor cuando recibe el evento keyup  que le llega por parametro
//trae la respuesta de la URL2 + el valor ingresado por el usuario en el input
//lo mapea y entrega el resultado a la funcion que crea la card
const getPersonForName = async (event) => {
   divCard.innerHTML = "" ;
   const response = await getApi2 (URL2+event.target.value);
   if (response && response.length > 0) {
    response.map(character => createCards(character));
    } else {
        notFound();
    }
}

//avanza a la siguiente pagina
const nextPage = () => {
    console.log('click en siguiente')
    page++;
    console.log(page)
    divCard.innerHTML = "";
    getToDoo(page);
    const prevButton = document.getElementById('prevPage')
        console.log(prevButton)
        prevButton.classList.remove('inactive')
}

//retrocede a la pagina anterior
const prevPage = () => {
    if (page > 1) {
        page--;
        divCard.innerHTML = "";
        getToDoo(page);
        
    } else {
        const prevButton = document.getElementById('prevPage')
        prevButton.classList.add('inactive')
    }
}


//cuando carga la aplicacion se ejecuta la funcion getToDoo y muestra el resultado (20 personajes)
window.addEventListener('DOMContentLoaded', getToDoo);

//cuando cliente escribe en el input se ejecuta la funcion getPersonForName y muestra coincidencias
search.addEventListener('keyup', getPersonForName);

//trae los botones de paginación
document.getElementById('nextPage').addEventListener('click', nextPage);
document.getElementById('prevPage').addEventListener('click', prevPage);


