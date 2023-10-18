d3.json("rapdata.json").then(function (data) {
    console.log("youpi")
    let largeur_baton = 300 / data.length;
console.log(data)
    d3.select("#objet")
        .selectAll("g")
        .data(data)
        .join("g")
        .attr("class", "histobarre")
        .attr("transform", (d, i) => `translate(${largeur_baton * i},0)`)

    d3.selectAll(".histobarre") //selectAll et pas select pour tout sélectionner
        .append("rect") // pas besoin de coordonnées car il part de 0 , 0 par défaut
        .attr("width", largeur_baton)
        .attr("height", (d) => d.Nbr * 100 / 2000000000)
        .attr("fill", "brown")
        .attr("transform", `scale(1,-1)`)
})



// document.addEventListener("DOMContentLoaded", function () {
//     fetch('rapdata.json').then(function (response) {
//         response.json().then(function (data) {
//             data.forEach(function afficheAnalogie(items) {
//                 var liste = document.querySelector(".chanteurs");
//                 liste.innerHTML = liste.innerHTML + "<section id=" + items.id + "><img src='" + items["image"] + "'class='imag'><div class='content'><h2>Si j’étais " + items.analogie + ", je serais " + items.valeurAnalogie + ".</h2><p>" + items.explication + "</p></div></section>";

//             });


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



//         });

//     })
// });