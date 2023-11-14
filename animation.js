// Parce qu'on est dans un environnement Node.js
import gsap from 'gsap'
import {Bounce} from 'gsap'
import TextPlugin from 'gsap/TextPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(TextPlugin, ScrollTrigger)


gsap.from('#section2', {
    duration: 2,  
    opacity: 0.5,
    fontSize: '3em',
    y: 50, 
    ease: 'power2.out'
});
