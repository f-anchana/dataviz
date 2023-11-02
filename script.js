fetch('rapdata.json').then(function (response) {
    response.json().then(function () {


        d3.json("rapdata.json").then(function (data) {

            console.log(data);
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

            // Création des barres
            d3.selectAll(".histobarre")
                .append("rect")
                .attr("width", `${largeur_baton - espaceEntreBarres}px`)
                .attr("height", (d) => d.Nbr * 100 / 2000000000)
                .attr("fill", (d, i) => couleur[i % couleur.length])
                .attr("transform", `scale(1,-1)`);

            // groupe pour les lignes représentant les années
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
                .attr("y1", 0.1)
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

            d3.selectAll('.histobarre')
                .on("mouseenter", function (e, d) {
                    d3.selectAll('.histobarre').style("opacity", 0.5);
                    d3.select(this).style("opacity", 1).style("cursor", "pointer");
                })
                .on("mouseleave", function (e, d) {
                    d3.selectAll('.histobarre').style("opacity", 1);
                });

            // Fonction qui permet de sélectionner une barre pour afficher l'artiste associé

            let sectioncontainer = d3.select("#section-3");
            d3.selectAll('.histobarre')
                .on("click", function (e, d) {
                    let sectionId = d.id;

                    // Suppression des anciennes sections de l'élément <div id="section-3">
                    sectioncontainer.selectAll("section").remove();

                    // Création d'une section avec l'id correspondant
                    const section = sectioncontainer.append("section")
                        .attr("id", "section-" + sectionId);

                    // Remplissement de la section avec les données
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
                });

        });

    });

    // Popup de l'élément legal notice
    var popup = document.querySelector('.popup-visible');
    var btnMentions = document.querySelector('.mentions-légale p');
    btnMentions.addEventListener('click', function () {
        popup.style.display = 'block';
    });
    var fermer = document.querySelector('.fermer');
    fermer.addEventListener('click', function () {
        popup.style.display = 'none';
    });
})
