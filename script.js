fetch("rapdata.json")
d3.json("rapdata.json", function (data){
    
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