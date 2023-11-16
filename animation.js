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
