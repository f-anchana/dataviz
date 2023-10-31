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

    d3.selectAll('.histobarre')
        .on("mouseenter", function (e, d) {
            d3.selectAll('.histobarre')
                .style("opacity", 0.5)
            d3.select(this)
                .style("opacity", 1)
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
                liste.innerHTML = liste.innerHTML + "<section id=" + items.id + "><img src='" + items["img"] + "'class='image' alt=''> <img class='strokeright' src='./img/strokeright.png' alt=''> <img class='strokedown' src='./img/strokedown.png' alt=''> <h1> Winner : " + items.year + " </h1><h2>" + items.titre + " by <span class='artista'>" + items.artiste + "</span></h2><h3>Artist Biography :</h3><p class='bio'>" + items["content-artist"] + "</p><h3>About the Hit :</h3><p class='bio'>" + items["content-titre"] + "</p>" + items["frame"] + "</section>";

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

