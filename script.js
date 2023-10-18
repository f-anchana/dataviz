fetch("rapdata.json")
d3.json("rapdata.json", function (data){
    
})

document.addEventListener("DOMContentLoaded", function () {
    fetch('rapdata.json').then(function (response) {
        response.json().then(function (data) {
            data.forEach(function afficherap(items) {
                var liste = document.querySelector(".chanteurs");
                liste.innerHTML = liste.innerHTML + "<section id=" + items.id + "><img src='" + items["img"] + "'class='image'><p> Winner : " + items.year + " </p><h1></h1></section>";

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