let couleur = ["black", "#5E504C", "#8A6E56"];

d3.json("rapdata.json").then(function (data) {
    console.log("youpi")
    let largeur_baton = 210 / data.length;
    // let espaceEntreBarres = 10;
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
        // .attr("width", largeur_baton)   
        // .attr("width", (d, i) => i * (largeur_baton + `{espaceEntreBarres}px`))
        .attr("height", (d) => d.Nbr * 100 / 2000000000)
        .attr("fill", (d, i) => couleur[i % couleur.length])
        .attr("transform", `scale(1,-1)`)
    // .style("padding-right", "50px")
})

document.addEventListener("DOMContentLoaded", function () {
    fetch('rapdata.json').then(function (response) {
        response.json().then(function (data) {
            data.forEach(function afficherap(items) {
                var liste = document.querySelector(".chanteurs");
                liste.innerHTML = liste.innerHTML + "<section class='rap' id=" + items.id + "><img src='" + items["img"] + "'class='image'><p> Winner : " + items.year + " </p><h1></h1></section>";

            });


            // Popup
            // var popup = document.querySelector('.popup-visible')
            // var btnMentions = document.querySelector('.image-cliquable p')
            // btnMentions.addEventListener('click', function () {
            //   popup.style.display = 'block'
            // })


            // var fermer = document.querySelector('.fermer')
            // fermer.addEventListener('click', function () {
            //   popup.style.display = 'none'

            // })



        });

    })
});