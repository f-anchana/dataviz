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

gsap.from(".section-4  > .deco", {
    x: "-50",
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",

    scrollTrigger: {
        trigger: '.section-4 > .deco',
        start: "left 80%",
        toggleActions: 'play reverse play reverse'
    },
});
gsap.from(".section-4  > .logo_noir", {
    x: "-80",
    opacity: 0,
    duration: 2,
    ease: "power2.inOut",

    scrollTrigger: {
        trigger: '.section-4 > .logo_noir',
        start: "left 80%",
        toggleActions: 'play reverse play reverse'
    },
});

