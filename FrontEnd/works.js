const reponse = await fetch ('http://localhost:5678/api/works');
let works = await reponse.json();

console.log(works);


const gallery = document.querySelector('.gallery');


let categories = document.querySelector('#categories');
let tabbtn = Array.from(categories.children);

function removeActif() {
    for (let i = 0; i < tabbtn.length; i++) {
        tabbtn[i].classList.remove('actif');
    }
}

function deleteWorks() {
    for (let i = 0; i < displayed_works; i++) {
        const figure = document.querySelector(`.gallery .fig_${i}`);
        gallery.remove(figure);
    }
    displayed_works = 0;
}


function displayWorks(i) {
    let tab = [];
    tab[i] = document.createElement('figure');
    tab[i].classList.add(`fig_${i}`,`cat${works[i].categoryId}`);
    gallery.append(tab[i]);
    
    const figure = document.querySelector(`.gallery .fig_${i}`);
    tab[i] = document.createElement('img');
    tab[i].src = works[i].imageUrl;
    figure.append(tab[i]);
    
    tab[i] = document.createElement('figcaption');
    tab[i].innerHTML = works[i].title;
    figure.append(tab[i]);

    displayed_works++;

}

const tous = document.querySelector('.b0');
const objet = document.querySelector('.b1');
const appartements = document.querySelector('.b2');
const hôtels = document.querySelector('.b3');

let category_active = 0;
let displayed_works = works.length;

function filter_works() {
    for (let i = 0; i < works.length; i++) {
        

        if (category_active == 0) {
            displayWorks(i);
            
        }
        
        else if (category_active == 1) {
            if (works[i].categoryId == category_active) {
                displayWorks(i);
                
            }
        }
        else if (category_active == 2) {
            if (works[i].categoryId == category_active) {
                displayWorks(i);
            }
        }
        else if (category_active == 3) {
            if (works[i].categoryId == category_active) {
                displayWorks(i);
            }
        }
    }
}

filter_works();

objet.addEventListener ('click', function() {
    console.log('objet');
    category_active = 1;
    deleteWorks();
    filter_works();
    removeActif();
    tabbtn[category_active].classList.add('actif');
})
appartements.addEventListener ('click', function() {
    category_active = 2;
    deleteWorks();
    filter_works();
    removeActif();
    tabbtn[category_active].classList.add('actif');
})
hôtels.addEventListener ('click', function() {
    category_active = 3;
    deleteWorks();
    filter_works();
    removeActif();
    tabbtn[category_active].classList.add('actif');
})
tous.addEventListener ('click', function() {
    category_active = 0;
    deleteWorks();
    filter_works();
    removeActif();
    tabbtn[category_active].classList.add('actif');
})