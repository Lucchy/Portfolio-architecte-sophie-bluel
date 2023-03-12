
// **************** FETCH ********************

const reponse = await fetch ('http://localhost:5678/api/works');
let works = await reponse.json();
console.log(works);

// **************** INIT ********************

const gallery = document.querySelector('.gallery');
let categories = document.querySelector('#categories');
let tabbtn = Array.from(categories.children);

const tous = document.querySelector('.b0');
const objet = document.querySelector('.b1');
const appartements = document.querySelector('.b2');
const hôtels = document.querySelector('.b3');

let category_active = 0;


// **************** FUNCTIONS ********************
function removeActif() {
    for (let i = 0; i < tabbtn.length; i++) {
        tabbtn[i].classList.remove('actif');
    }
}

function filter () {
    // on display none les élements qui ne correspondent pas
    for (let i = 0; i < works.length; i++) {
        
        const figure = document.querySelector(`.gallery figure.fig_${i}`);
        if (figure.classList[1] !== `cat_${category_active}`) {
            figure.style.display = 'none';
        }

        else {
            figure.style.display = 'block';   
        }
    }
}


// **************** MAIN ********************

// on affiche les projets dans la gallerie
for (let i = 0; i < works.length; i++) {
    let tab = [];
    tab[i] = document.createElement('figure');
    tab[i].classList.add(`fig_${i}`,`cat_${works[i].categoryId}`);
    gallery.append(tab[i]);
    
    const figure = document.querySelector(`.gallery .fig_${i}`);
    tab[i] = document.createElement('img');
    tab[i].src = works[i].imageUrl;
    figure.append(tab[i]);
    
    tab[i] = document.createElement('figcaption');
    tab[i].innerHTML = works[i].title;
    figure.append(tab[i]);
}

// on écoute l'évènement click sur les boutons

objet.addEventListener ('click', function() {
    category_active = 1;
    removeActif();
    tabbtn[category_active].classList.add('actif');
    filter();
})

appartements.addEventListener ('click', function() {
    category_active = 2;
    removeActif();
    tabbtn[category_active].classList.add('actif');
    filter();
})

hôtels.addEventListener ('click', function() {
    category_active = 3;
    removeActif();
    tabbtn[category_active].classList.add('actif');
    filter();
})

tous.addEventListener ('click', function() {
    category_active = 0;
    removeActif();
    tabbtn[category_active].classList.add('actif');

    for (let i = 0; i < works.length; i++) {
        const figure = document.querySelector(`.gallery figure.fig_${i}`);
        figure.style.display = 'block'; 
    }
})


