gsap.registerPlugin(TextPlugin, ScrollTrigger);

gsap.from('#section2', {
    duration: 1,  
    opacity: 0,
    y: 100, 
    ease: 'power1',

   scrollTrigger: {
        trigger: '#section2',
        start: "top 80%",
        toggleActions: 'play reverse play reverse'
    },
});


// lui là ne marche pas - section artiste
// gsap.from("#section-3 > h1", {
//     x: "-50",
//     opacity: 0,
//     duration: 1,
//     ease: "power2.inOut",

//     scrollTrigger: {
//         trigger: '#section-3 > h1',
//         start: "left 80%",
//         toggleActions: 'play reverse play reverse'
//     },
// });

// gsap.from(".about-h3", {
//     y: 80,
//     opacity: 0,
//     duration: 1,
//     ease: "power2.inOut",

//     scrollTrigger: {
//         trigger: '.about-h3',
//         start: "bottom %",
//         toggleActions: 'play reverse play reverse'
//     },
// });

gsap.from(".section-4  > .logo_noir", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",

    scrollTrigger: {
        trigger: '.section-4 > .logo_noir',
        start: "bottom 90%",
        toggleActions: 'play reverse play reverse'
    },
});
gsap.from(".section-4  > .about-h2", {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power2",

    scrollTrigger: {
        trigger: '.section-4  > .about-h2',
        start: "left 80%",
        toggleActions: 'play reverse play reverse'
    },
});
gsap.from(".section-4  > .about-h3", {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power2",

    scrollTrigger: {
        trigger: '.section-4  > .about-h3',
        start: "left 80%",
        toggleActions: 'play reverse play reverse'
    },
});
gsap.from(".section-4  > .about-p, .mentions-légale", {
    x: -80,
    opacity: 0,
    duration: 2,
    ease: "power2",

    scrollTrigger: {
        trigger: '.section-4  > .about-p',
        start: "left 80%",
        toggleActions: 'play reverse play reverse'
    },
});
