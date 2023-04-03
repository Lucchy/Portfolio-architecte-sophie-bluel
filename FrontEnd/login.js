

const form = document.querySelector('.form_container');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const identifiants = {
        email : event.target.querySelector('.form_container .email').value,
        password : event.target.querySelector('.form_container .psw').value,
    };

    const chargeUtile = JSON.stringify(identifiants);

    fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            body : chargeUtile,
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
    })
    .then(res => {
        console.log(res);
        if(res.ok) {
            res.json().then(data => {
                console.log(data);
                console.log(data.token);
                window.localStorage.setItem('token', data.token);
                location.href = "./index.html";
            })
        }
        else {
            const erreur = document.querySelector('.form_container p')
            if(res.status === 401) {
                console.log('Erreur : Mot de passe incorrect');
                erreur.innerHTML = "*Mot de passe incorrect";
                erreur.style.marginBottom = '40px';

            }
            else if (res.status === 404) {
                console.log('Erreur : utilisateur introuvable');
                erreur.innerHTML = "*Utilisateur introuvable";
                erreur.style.marginBottom = '40px';
            }
            }
       })
    
   
})

    

    

   




