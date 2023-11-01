let couleur = ["black", "#5E504C", "#8A6E56"];

d3.json("rapdata.json").then(function (data) {
    console.log("youpi")
    let espaceEntreBarres = 1.4;
    let largeur_baton = 210 / data.length;
    // 210
    console.log(data)
    d3.select("#objet")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("class", "histobarre")
        .attr("transform", (d, i) => `translate(${largeur_baton * i},0)`)

    d3.selectAll(".histobarre")
        .append("rect")
        .attr("width", `${largeur_baton - espaceEntreBarres}px`)
        .attr("height", (d) => d.Nbr * 100 / 2000000000)
        .attr("fill", (d, i) => couleur[i % couleur.length])
        .attr("transform", `scale(1,-1)`)

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
        .attr("y1", 0.1) // La position verticale de la ligne
        .attr("y2", 3) // La position verticale de la ligne
        .attr("stroke", "black")
        .attr("stroke-width", 0.2);

    // Sélection de "year" à partir de rapdata.json
    anneesGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => largeur_baton * i + (largeur_baton - espaceEntreBarres) / 2)
        .attr("y", 7) // Ajustez la position verticale
        .text(d => d.year)
        .attr("text-anchor", "middle")
        .attr("font-size", "3px")
        .attr("fill", "black")
    

    d3.selectAll('.histobarre')
        .on("mouseenter", function (e, d) {
            d3.selectAll('.histobarre')
                .style("opacity", 0.5)
            d3.select(this)
                .style("opacity", 1)
                .style("cursor", "pointer")
        })
        .on("mouseleave", function (e, d) {
            d3.selectAll('.histobarre')
                .style("opacity", 1)
        })
        .on("mouseclick", function (e, d) {
            d3.select(this)
        })
})

document.addEventListener("DOMContentLoaded", function () {
    fetch('rapdata.json').then(function (response) {
        response.json().then(function (data) {
            data.forEach(function afficherap(items) {
                var liste = document.querySelector(".chanteurs");
                liste.innerHTML += "<section id=" + items.id + "><img src='" + items["img"] + "'class='image' alt=''> <img class='strokeright' src='./img/strokeright.png' alt=''> <img class='strokedown' src='./img/strokedown.png' alt=''> <div class='contenu'> <h1> Winner : " + items.year + " </h1><h2 class='titre'>" + items.titre + " by <span class='artista'>" + items.artiste + "</span></h2><h3>Artist Biography :</h3><p class='bio'>" + items["content-artist"] + "</p><h3>About the Hit :</h3><p class='bio'>" + items["content-titre"] + "</p>" + items["frame"] + "</div></section>";

            })
        });


        // Popup
        var popup = document.querySelector('.popup-visible')
        var btnMentions = document.querySelector('.mentions-légale p')
        btnMentions.addEventListener('click', function () {
            popup.style.display = 'block'
        })
        var fermer = document.querySelector('.fermer')
        fermer.addEventListener('click', function () {
            popup.style.display = 'none'
        })


    })
});

