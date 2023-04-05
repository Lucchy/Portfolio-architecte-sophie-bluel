
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

// on génère les projets dans la gallerie
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

const modaleContainer = document.querySelector('.modale_container');
const modaleBtn = document.querySelector('.modale_btn');
const closeBtn = document.querySelectorAll('.close_btn');
const overlay = document.querySelector('.overlay');
const modale2 = document.querySelector('.modale_2');
const addBtn = document.querySelector('.modale input');
const arrow = document.querySelector('.back_btn');

modaleBtn.addEventListener('click', function modale() {
    console.log('modale');
    modaleContainer.style.display = 'block';
});
for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', function (){
        console.log('close button');
        modaleContainer.style.display = 'none';
        modale2.style.display = 'none';
    });
}
overlay.addEventListener('click', function (){
    console.log('overlay');
    modaleContainer.style.display = 'none';
    modale2.style.display = 'none';

});

addBtn.addEventListener('click', function(event){
    event.preventDefault();
    console.log('modale_2');
    modale2.style.display ='block';
});

arrow.addEventListener('click', function(){
    console.log('retour');
    modale2.style.display = 'none';
})


/* __________ GENERATION DE LA GALERIE DE LA MODALE __________ */

const modaleGallery = document.querySelector('.modale_gallery');

for (let i = 0; i < works.length; i++) {
    let tab = [];
    tab[i] = document.createElement('div');
    tab[i].classList.add(`div_${i}`);
    modaleGallery.append(tab[i]);
    
    const figure = document.querySelector(`.modale_gallery .div_${i}`);
    tab[i] = document.createElement('img');
    tab[i].src = works[i].imageUrl;
    figure.append(tab[i]);
    
    tab[i] = document.createElement('a');
    tab[i].classList.add('trash');
    let id = works[i].id;
    console.log(id);
    tab[i].classList.add(`delete_btn_${id}`);
    tab[i].innerHTML = '<i class="fa-solid fa-trash-can fa-inverse fa-xl"></i>';
    figure.append(tab[i]);

    tab[i] = document.createElement('a');
    tab[i].innerHTML = 'éditer';
    figure.append(tab[i]);
}

/* ______________________________________________________________ */


// DELETEWORK SI CLIC SUR UNE ICONE POUBELLE

const token = window.localStorage.getItem('token');
console.log(token);
const deleteBtn = document.querySelectorAll (`.trash`);
for (let i = 0; i < works.length; i++) {
    let id = works[i].id;
    
    deleteBtn[i].addEventListener('click', function(e){
       e.preventDefault();
        console.log(id); 
       fetch(`http://localhost:5678/api/works/${id}`, {
        method:"DELETE",
        headers:{
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
        },

        }).then(res => {
            console.log(res.status);
            
        })
})
}



   



/* ______________________________________________________________ */

// CREATION D'UN NOUVEAU PROJET

const validBtn = document.querySelector('.valid_btn');
let urlImg = document.querySelector('.input_img').value;
console.log(urlImg);
let title = document.querySelector('.input_txt').value;
let category = document.querySelector('select option').value;
const form = document.querySelector('.modale_2 form');

form.addEventListener('submit', function(event){
    event.preventDefault();
    
    const formData = new FormData(form);
    console.log(formData);
    console.log(Array.from(formData));
    const fd = Array.from(formData);
    let data = [];
    for(let i = 0; i < fd.length; i++){
        console.log(fd[i][1]);
        data[i] = fd[i][1];
   }
    
console.log(data);
    // for(let obj of formData){
    //     console.log(obj[1]);
    // }


fetch('http://localhost:5678/api/works', {

    method: "POST",
    body : data,
    headers: {
        "Content-Type":"mutltipart/form-data",
        "Accept":"application/json",
        "Authorization": `Bearer ${token}`,
    }
}).then(res => {
    console.log(res.status);
})
})





// function DeleteAllWorks() {
//     for(let i = 0; i < works.length; i++) {
//         fetch(`http://localhost:5678/api/works/${i}`, {
//             method : "DELETE";
//             header: {
//                accept:'*/*'
//}
//         });
//         console.log(`le projet numéro ${i} à été supprimé`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
//     }
// } 



// function sendNewProject() {
// 
//event.preventDefault();
//     const newproject = {
//         img : event.target.querySelector(),
//         title : event.target.querySelector(),
//         categorie : event.traget.querySelector() 
//     }
//     new_project = JSON.stringify(newProject);
//     fetch('', {
//         method: "POST",
//         body: new_project,
//         headers: {
//             "Content-Type":"application/json",
//             "Accept":"application/json",
//             "Authorization": tokenBearer
//             },
//     })
// }