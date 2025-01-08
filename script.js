APIimage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/num.svg"
APInom="https://pokeapi.co/api/v2/pokemon-species/num/"
async function afficher() {
    
    document.querySelector(".bouton").style.display = "none"; //désaffichage du bouton
    
    //on peut aussi utiliser document.getElementById , document.getElementsByClassName dans ce cas là on a pas besoin de mettre le . ou le #
    for (let i = 0; i < 100; i++) {
        
        let template = document.querySelector("#card-template"); 
        let clone = document.importNode(template.content, true);

        let lienImage = APIimage.replace("num", i + 1);

        try{
                let response = await fetch (lienImage); //récupération du json lié au lien dans response
                //console.log(response) // on peut voir de quoi est fait le json donné et que le lien de l'image que nous voulons est dans la liste "url"
                clone.querySelector(".card-img").setAttribute('src', response.url) //setAttribute permet de définir la valeur d'un attribut sur un élément HTML
        }

        catch(error){
            console.error("Il y a eu un problème avec votre opération fetch(image)", error);
        }

        let lienNom = APInom.replace("num", i+1)
        try{
            let response = await fetch (lienNom); 
            let nom_json = await response.json(); //convertion en json
            nouveau_contenu= clone.firstElementChild.innerHTML
            .replace(/{{nom}}/g,nom_json.names[4].name)
            .replace(/{{numero}}/g, i+1)
            clone.firstElementChild.innerHTML = nouveau_contenu;
    }

    catch(error){
        console.error("Il y a eu un problème avec votre opération fetch(nom)", error);
    }
    document.getElementById("conteneur").appendChild(clone);
    }
    
}
