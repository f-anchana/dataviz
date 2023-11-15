gsap.registerPlugin(TextPlugin, ScrollTrigger)


gsap.from('#section2', {
    duration: 2,  
    opacity: 0.5,
    fontSize: '3em',
    y: 50, 
    ease: 'power2.out'
});
