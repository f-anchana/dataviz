fetch('rapdata.json').then(function (response) {
    response.json().then(function () {


        d3.json("rapdata.json").then(function (data) {
            let couleur = ["black", "#5E504C", "#8A6E56"];
            let espaceEntreBarres = 1.4;
            let largeur_baton = 210 / data.length;


            d3.select("#objet")
                .selectAll("g")
                .data(data)
                .join("g")
                .attr("class", "histobarre")
                .attr("id", (d) => d.id)
                .attr("transform", (d, i) => `translate(${largeur_baton * i},0)`)


            d3.selectAll(".histobarre")
                .append("rect")
                .attr("tabindex","0")
                .attr("width", `${largeur_baton - espaceEntreBarres}px`)
                .attr("height", (d) => d.Nbr * 100 / 2000000000)
                .attr("fill", (d, i) => couleur[i % couleur.length])
                .attr("transform", `scale(1,-1)`);


            // Fonction qui permet d'apporter des espaces dans les grands nombres en les transformant en string
            function formatNumberWithSpaces(number) {
                return number.toLocaleString();
            }


            // Partie concernant l'axe des ordonnées (nombre de streams)
            let minY = 0;
            let maxY = 2000000000;
            let espace = 400000000;
            let chiffresClés = [];
            for (let i = minY; i <= maxY; i += espace) {
                chiffresClés.push(i);
            }
            let svg = d3.select("svg");
            let verticalSpacing = 20; // Ajustement de l'espacement vertical fixe entre les nombres de streams (légende)


            svg.selectAll(".tiret")
                .data(chiffresClés)
                .enter()
                .append("line")
                .attr("class", ".tiret")
                .attr("x1", -3)
                .attr("y1", (d, i) => -(i * verticalSpacing))
                .attr("y2", (d, i) => -(i * verticalSpacing))
                .attr("stroke", "black")
                .attr("stroke-width", 0.2);


            svg.selectAll(".chiffresClés")
                .data(chiffresClés)
                .enter()
                .append("text")
                .attr("class", "chiffresClés")
                .attr("x", -8)
                .attr("y", (d, i) => -(i * verticalSpacing))
                .text((d) => formatNumberWithSpaces(d)) // On appelle la fonction pour appliquer des espaces entre les nombres
                .attr("text-anchor", "end")
                .attr("font-size", "3px")
                .attr("fill", "black");



            // Partie concernant l'axe des abscisses (années/years)
            let anneesGroup = d3.select("#objet")
                .append("g")
                .attr("class", "annees");

            // Création des petits traits
            anneesGroup.selectAll("line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", (d, i) => largeur_baton * i + (largeur_baton - espaceEntreBarres) / 2)
                .attr("x2", (d, i) => largeur_baton * i + (largeur_baton - espaceEntreBarres) / 2)
                .attr("y2", 3)
                .attr("stroke", "black")
                .attr("stroke-width", 0.2);

            // Sélection de "year" à partir de rapdata.json
            anneesGroup.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", (d, i) => largeur_baton * i + (largeur_baton - espaceEntreBarres) / 2)
                .attr("y", 7)
                .text(d => d.year)
                .attr("text-anchor", "middle")
                .attr("font-size", "3px")
                .attr("fill", "black");



            // Effet selection barre
            let barreSelectionnee = null;

            d3.selectAll('.histobarre')
                .on("mouseenter", function (e, d) {
                    d3.selectAll('.histobarre').style("opacity", 0.5);
                    d3.select(this).style("opacity", 1).style("cursor", "pointer");

                    // Pour afficher les images miniatures quand on passe la souris au hover
                    d3.select("#image-miniature").attr("src", d.mini);
                    d3.select("#title").html(`${d.titre} by <span class='artista'> ${d.artiste} </span>`);
                    d3.select("#description").text(`${d.Nbr} streams on Spotify`);
                    d3.select("#description").text(formatNumberWithSpaces(d.Nbr) + " streams on Spotify");
                })
                .on("mouseleave", function (e, d) {
                    if (barreSelectionnee == null) {
                        d3.selectAll('.histobarre').style("opacity", 1);
                    } else if (this != barreSelectionnee) {
                        d3.selectAll('.histobarre').style("opacity", 0.5);
                        d3.select(barreSelectionnee).style("opacity", 1);
                    }

                    // Pour faire disparaître l'image miniature et sa description lorsque la souris sort du bâton
                    d3.select("#image-miniature").attr("src", "");
                    d3.select("#description").text("");
                    d3.select("#title").text("");
                });


            // Fonction click pour sélectionner l'artiste associé au bâton 
            let contenusection = d3.select("#section-3");
            let LastBatonnet = null;
            d3.selectAll('.histobarre')
                .each(function (d) {
                    d.compteclick = 0; //On ajoute un compteur qui permet de compter le nombre de click sur un baton
                })
                .on("click", function (e, d) {
                    barreSelectionnee = this;
                    let sectionId = d.id;

                    // Suppression des anciennes sections (pour ne pas qu'il y ait plusieurs sections à la fois qui apparaissent)
                    contenusection.selectAll("section").remove();

                    d3.selectAll('.histobarre').style("opacity", 0.5);
                    d3.select(this).style("opacity", 1);


                    // Création d'une section avec l'id correspondant
                    let section = contenusection.append("section")
                        .attr("id", sectionId);

                    // Remplissage de la section avec les données
                    section.html(`
                        <img src="${d.img}" class="image" alt="">
                        <img class="strokeright" src="./img/strokeright.png" alt="">
                        <img class="strokedown" src="./img/strokedown.png" alt="">
                        <div class="contenu">
                            <h1> Winner : ${d.year} </h1>
                            <h2 class="titre">${d.titre} by <span class="artista">${d.artiste}</span></h2>
                            <h3>Artist Biography :</h3>
                            <p class="bio">${d["content-artist"]}</p>
                            <h3>About the Hit :</h3>
                            <p class="bio">${d["content-titre"]}</p>
                            ${d.frame}
                        </div>
                    `);

                    // Affichage de la section
                    section.style("display", "block");

                    let sectionElement = section.node();
                    sectionElement.scrollIntoView({ behavior: "smooth" });

                    if(d != LastBatonnet){
                        d.compteclick = 0;
                    }
                    // L'autoincrémentation du nombre de clicks + Pour la suppression de la section lorsqu'il y a 2 clicks sur la même barre
                    d.compteclick++;
                    LastBatonnet = d;

                    if (d.compteclick == 2) {
                        barreSelectionnee = null;
                        d3.selectAll('.histobarre').style("opacity", 1);
                        contenusection.selectAll("section").remove();
                        // À la fin, on rénitialite le nombre de clicks pour ne pas faire d'erreurs
                        d.compteclick = 0;
                    }


                });


        });

    });

    // Popup
    let popup = document.querySelector('.popup-visible');
    let btnMentions = document.querySelector('.mentions-légale p');
    btnMentions.addEventListener('click', function () {
        popup.style.display = 'block';
    });
    var fermer = document.querySelector('.fermer');
    fermer.addEventListener('click', function () {
        popup.style.display = 'none';
    });


    // fonction hover du texte what is grap - faire plutôt au scroll
    let gRap = document.querySelector('.g-rap');
    let explication = document.getElementById('explication');
    explication.style.transition = 'opacity 1s ease-in-out';
    // explication.style.transition = 'opacity 0.2s ease-in-out, visibility 1s ease-in-out';


    gRap.addEventListener('mouseenter', function () {
        explication.style.visibility = 'visible';
        explication.style.opacity = 1;
    });

    gRap.addEventListener('mouseleave', function () {
        explication.style.visibility = 'hidden';
        explication.style.opacity = 0;

    });

});
