document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuContent = document.querySelector('.menu-content');
    const menuPreviewImg = document.querySelector('.menu-preview-img');
    const menuLinks = document.querySelectorAll('.link a');
    const homeContent = document.querySelector('h1, p');

    let isOpen = false;
    let isAnimating = false;

    menuToggle.addEventListener('click', () => {
        if (!isOpen) openMenu();
        else closeMenu();
    });

    // Close menu when navigation links are clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (isOpen) {
                closeMenu();
            }
            // Add a small delay to allow menu closing animation before scrolling
            setTimeout(() => {
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });

    function cleanupPreviewImages() {
        const previewImages = menuPreviewImg.querySelectorAll('img');
        if (previewImages.length > 3) {
            for (let i = 0; i < previewImages.length - 3; i++) {
                menuPreviewImg.removeChild(previewImages[i]);
            }
        }
    }

    function resetPreviewImages() {
        menuPreviewImg.innerHTML = '';
        const defaultPreviewImg = document.createElement('img');
        defaultPreviewImg.src = 'img/menu-preview.jpg';
        menuPreviewImg.appendChild(defaultPreviewImg);
    }

    function animateMenuToggle() {
        const open = document.querySelector('p#menu-open');
        const close = document.querySelector('p#menu-close');

        gsap.to(isOpen ? close : open, {
            x: isOpen ? -5 : 5,
            y: isOpen ? -10 : 10,
            rotation: isOpen ? -5 : 5,
            duration: 0.5,
            opacity: 0,
            delay: 0.25,
            ease: 'power2.out',
        });

        gsap.to(isOpen ? open : close, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            opacity: 1,
            delay: 0.25,
            ease: 'power2.out',
        });
    }

    function openMenu() {
        if (isAnimating || isOpen) return;
        isAnimating = true;

        gsap.to(container, {
            rotation: 10,
            x: 300,
            y: 450,
            scale: 1.5,
            duration: 1.25,
            ease: 'power4.inOut',
        });
        ;
        animateMenuToggle();
        
        gsap.to(menuContent, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.25,
            ease: 'power4.inOut',
        });

        gsap.to([".link a", ".social a"], {
            y: "0%",
            opacity: 1,
            duration: 1,
            delay: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
        });

        gsap.to(menuOverlay, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)',
            duration: 1.25,
            ease: 'power4.inOut',
            onComplete: () => {
                isAnimating = false;
                isOpen = true;
            },
        });
    }

    function closeMenu() {
        if (isAnimating || !isOpen) return;
        isAnimating = true;

        gsap.to(container, {
            rotation: 0,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.25,
            ease: 'power4.inOut',
        });

        animateMenuToggle();

        gsap.to(menuContent, {
            x: -100,
            y: -100,
            scale: 1.5,
            opacity: 0.25,
            rotation: -15,
            duration: 1.25,
            ease: 'power4.inOut',
        });

        gsap.to(menuOverlay, {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
            duration: 1.25,
            ease: 'power4.inOut',
            onComplete: () => {
                isAnimating = false;
                isOpen = false;
                gsap.set([".link a", ".social a"], {
                    y: "120%",
                    opacity: 0.25,
                });
                resetPreviewImages();
            },
        });
    }

    // NEW SCROLLTRIGGER AND SPLIT TEXT ANIMATIONS
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(SplitText);

    // // Split text function for creating character animations
    // function splitText(element, type = "chars") {
    //     if (!element) return null;
        
    //     const text = element.textContent;
    //     element.textContent = '';
        
    //     const chars = text.split('').map(char => {
    //         const span = document.createElement('span');
    //         span.textContent = char === ' ' ? '\u00A0' : char;
    //         span.style.display = 'inline-block';
    //         span.style.opacity = '0';
    //         span.style.transform = 'translateY(100%)';
    //         element.appendChild(span);
    //         return span;
    //     });
        
    //     return chars;
    // }

    // Hero section text animation
    const heroTitle = document.querySelector('#home h1');
    const heroSubtitle = document.querySelector('#home p');
    const heroDescription = document.querySelector('#home p:nth-of-type(2)');
    const heroButtons = document.querySelectorAll('#home button');
    const heroImg = document.querySelector('#home .hero-img');
    
    const animatedFeaturedTitle = document.querySelector('.animated-featured-title');
    const animatedFeaturedSubtitle = document.querySelector('.animated-featured-subtitle');
    const animatedFeaturedDescription = document.querySelector('.animated-featured-description');
    const animatedProjectTitle = document.querySelector('.animated-project-title');
    const animatedProjectDescription = document.querySelector('.animated-project-description');
    const animatedAboutTitle = document.querySelector('.animated-about-title');
    const animatedAboutDescription = document.querySelector('.animated-about-description');
    const animatedContactTitle = document.querySelector('.animated-contact-title');
    const animatedContactDescription = document.querySelector('.animated-contact-description');
    const animatedFooterTitle = document.querySelector('.animated-footer-title');
    const animatedFooterDescription = document.querySelector('.animated-footer-description');

    // Common Animation Functions

    gsap.to([".hero-img"], {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.25,
        ease: 'power4.inOut',
    });

    
    gsap.to(homeContent, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.25,
        ease: 'power4.inOut',
    });

    if (animatedFeaturedTitle) {
        const splitFeaturedTitle = new SplitText(animatedFeaturedTitle, { type: "lines" });
        gsap.from(splitFeaturedTitle.lines, {
            scrollTrigger: {
                trigger: animatedFeaturedTitle,
                start: "top 80%",
            },
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.25,
            ease: "power4.out",
            delay: 0.2
        });
    }

    if (animatedFeaturedSubtitle) {
        const splitFeaturedSubtitle = new SplitText(animatedFeaturedSubtitle, { type: "lines" });
        gsap.from(splitFeaturedSubtitle.lines, {
            scrollTrigger: {
                trigger: animatedFeaturedSubtitle,
                start: "top 80%",
            },
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.25,
            ease: "power4.out",
            delay: 0.2
        });
    }

    if (animatedFeaturedDescription) {
        const splitFeaturedDescription = new SplitText(animatedFeaturedDescription, { type: "lines" });
        gsap.from(splitFeaturedDescription.lines, { 
            scrollTrigger: {
                trigger: animatedFeaturedDescription,
                start: "top 80%",
            },
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.25,
            ease: "power4.out",
            delay: 0.2  
        });
    }
    
    

    // Animate heroTitle with SplitText (words -> chars)
    if (heroTitle) {
        const splitTitle = new SplitText(heroTitle, { type: "lines" });
        const splitSubtitle = new SplitText(heroSubtitle, { type: "lines" });
        const splitDescription = new SplitText(heroDescription, { type: "lines" });
        gsap.from([splitSubtitle.lines, splitTitle.lines, splitDescription.lines], {
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.25,
            ease: "power4.out",
            delay: 0.2
        });

        // y: "0%",
        // opacity: 1,
        // duration: 1,
        // delay: 0.75,
        // stagger: 0.1,
        // ease: 'power3.out',
    }

    // Animate heroSubtitle with SplitText (words)
    // if (heroSubtitle) {
    //     const splitSubtitle = new SplitText(heroSubtitle, { type: "words" });
    //     gsap.from(splitSubtitle.words, {
    //         opacity: 0,
    //         y: 40,
    //         duration: 0.7,
    //         stagger: 0.06,
    //         ease: "power2.out",
    //         delay: 0.7
    //     });
    // }

    // // Animate heroDescription with SplitText (words)
    // if (heroDescription) {
    //     const splitDesc = new SplitText(heroDescription, { type: "words" });
    //     gsap.from(splitDesc.words, {
    //         opacity: 0,
    //         y: 40,
    //         duration: 0.7,
    //         stagger: 0.05,
    //         ease: "power2.out",
    //         delay: 1.0
    //     });
    // }

    // // Animate heroButtons
    // if (heroButtons.length > 0) {
    //     gsap.from(heroButtons, {
    //         opacity: 0,
    //         y: 30,
    //         duration: 0.7,
    //         stagger: 0.15,
    //         ease: "power2.out",
    //         delay: 1.3
    //     });
    // }



    // if (heroTitle) {
    //     const titleChars = splitText(heroTitle, "chars");
    //     if (titleChars) {
    //         gsap.to(titleChars, {
    //             opacity: 1,
    //             y: 0,
    //             duration: 0.8,
    //             stagger: 0.03,
    //             ease: "power2.out",
    //             delay: 0.5
    //         });
    //     }
    // }

    // if (heroSubtitle) {
    //     gsap.fromTo(heroSubtitle, 
    //         { opacity: 0, y: 30 },
    //         { 
    //             opacity: 1, 
    //             y: 0, 
    //             duration: 0.8, 
    //             delay: 1.2,
    //             ease: "power2.out"
    //         }
    //     );
    // }

    // if (heroDescription) {
    //     gsap.fromTo(heroDescription, 
    //         { opacity: 0, y: 30 },
    //         { 
    //             opacity: 1, 
    //             y: 0, 
    //             duration: 0.8, 
    //             delay: 1.4,
    //             ease: "power2.out"
    //         }
    //     );
    // }

    // if (heroButtons.length > 0) {
    //     gsap.fromTo(heroButtons, 
    //         { opacity: 0, y: 30 },
    //         { 
    //             opacity: 1, 
    //             y: 0, 
    //             duration: 0.8, 
    //             stagger: 0.1,
    //             delay: 1.6,
    //             ease: "power2.out"
    //         }
    //     );
    // }

    // Projects section animations
    // const projectSections = document.querySelectorAll('#projects, #about, #contact');
    
    // projectSections.forEach(section => {
    //     const sectionTitle = section.querySelector('h2');
    //     const sectionDescription = section.querySelector('p');
    //     const sectionContent = section.querySelectorAll('.grid, .flex');
        
    //     if (sectionTitle) {
    //         ScrollTrigger.create({
    //             trigger: section,
    //             start: "top 80%",
    //             onEnter: () => {
    //                 const titleChars = splitText(sectionTitle, "chars");
    //                 if (titleChars) {
    //                     gsap.to(titleChars, {
    //                         opacity: 1,
    //                         y: 0,
    //                         duration: 0.6,
    //                         stagger: 0.02,
    //                         ease: "power2.out"
    //                     });
    //                 }
    //             }
    //         });
    //     }

    //     if (sectionDescription) {
    //         ScrollTrigger.create({
    //             trigger: section,
    //             start: "top 70%",
    //             onEnter: () => {
    //                 gsap.fromTo(sectionDescription, 
    //                     { opacity: 0, y: 20 },
    //                     { 
    //                         opacity: 1, 
    //                         y: 0, 
    //                         duration: 0.8, 
    //                         delay: 0.3,
    //                         ease: "power2.out"
    //                     }
    //                 );
    //             }
    //         });
    //     }

    //     if (sectionContent.length > 0) {
    //         ScrollTrigger.create({
    //             trigger: section,
    //             start: "top 60%",
    //             onEnter: () => {
    //                 gsap.fromTo(sectionContent, 
    //                     { opacity: 0, y: 40 },
    //                     { 
    //                         opacity: 1, 
    //                         y: 0, 
    //                         duration: 0.8, 
    //                         stagger: 0.1,
    //                         delay: 0.5,
    //                         ease: "power2.out"
    //                     }
    //                 );
    //             }
    //         });
    //     }
    // });

    // // Project cards animation
    // const projectCards = document.querySelectorAll('#projects .relative');
    
    // projectCards.forEach((card, index) => {
    //     ScrollTrigger.create({
    //         trigger: card,
    //         start: "top 85%",
    //         onEnter: () => {
    //             gsap.fromTo(card, 
    //                 { opacity: 0, y: 50, scale: 0.9 },
    //                 { 
    //                     opacity: 1, 
    //                     y: 0, 
    //                     scale: 1, 
    //                     duration: 0.8, 
    //                     delay: index * 0.1,
    //                     ease: "power2.out"
    //                 }
    //             );
    //         }
    //     });
    // });

    // // Skills grid animation
    // const skillCards = document.querySelectorAll('#about .bg-white-transparent');
    
    // skillCards.forEach((card, index) => {
    //     ScrollTrigger.create({
    //         trigger: card,
    //         start: "top 85%",
    //         onEnter: () => {
    //             gsap.fromTo(card, 
    //                 { opacity: 0, y: 30, scale: 0.8 },
    //                 { 
    //                     opacity: 1, 
    //                     y: 0, 
    //                     scale: 1, 
    //                     duration: 0.6, 
    //                     delay: index * 0.1,
    //                     ease: "power2.out"
    //                 }
    //             );
    //         }
    //     });
    // });

    // // Contact form animation
    // const contactForm = document.querySelector('#contact form');
    // const formInputs = document.querySelectorAll('#contact input, #contact textarea');
    
    // if (contactForm) {
    //     ScrollTrigger.create({
    //         trigger: contactForm,
    //         start: "top 80%",
    //         onEnter: () => {
    //             gsap.fromTo(formInputs, 
    //                 { opacity: 0, y: 20 },
    //                 { 
    //                     opacity: 1, 
    //                     y: 0, 
    //                     duration: 0.6, 
    //                     stagger: 0.1,
    //                     ease: "power2.out"
    //                 }
    //             );
    //         }
    //     });
    // }

    // // Footer animation
    // const footer = document.querySelector('footer');
    
    // if (footer) {
    //     ScrollTrigger.create({
    //         trigger: footer,
    //         start: "top 90%",
    //         onEnter: () => {
    //             gsap.fromTo(footer, 
    //                 { opacity: 0, y: 30 },
    //                 { 
    //                     opacity: 1, 
    //                     y: 0, 
    //                     duration: 0.8,
    //                     ease: "power2.out"
    //                 }
    //             );
    //         }
    //     });
    // }

    // // Parallax effect for hero image
    // const heroImage = document.querySelector('.hero-img');
    
    // if (heroImage) {
    //     ScrollTrigger.create({
    //         trigger: heroImage,
    //         start: "top bottom",
    //         end: "bottom top",
    //         scrub: true,
    //         onUpdate: (self) => {
    //             gsap.to(heroImage, {
    //                 y: self.progress * -100,
    //                 ease: "none"
    //             });
    //         }
    //     });
    // }

    // // Smooth reveal animation for all sections
    // const allSections = document.querySelectorAll('section');
    
    // allSections.forEach(section => {
    //     ScrollTrigger.create({
    //         trigger: section,
    //         start: "top 90%",
    //         onEnter: () => {
    //             gsap.fromTo(section, 
    //                 { opacity: 0, y: 50 },
    //                 { 
    //                     opacity: 1, 
    //                     y: 0, 
    //                     duration: 1,
    //                     ease: "power2.out"
    //                 }
    //             );
    //         }
    //     });
    // });

});