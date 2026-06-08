document.addEventListener("DOMContentLoaded", () => {
    const btnOpenInvitation = document.getElementById("btn-open-invitation");
    const envelopeWrapper = document.getElementById("envelope-wrapper");
    const hero = document.getElementById("hero");
    
    const btnSeeDetails = document.getElementById("btn-see-details");
    const invitationContentVerso = document.getElementById("invitation-content");
    const nossaHistoriaVerso = document.getElementById("nossa-historia");
    
    const bgMusic = document.getElementById("bg-music");
    const btnMusic = document.getElementById("btn-music");

   
    btnOpenInvitation.addEventListener("click", () => {
        envelopeWrapper.classList.add("open");
        
        bgMusic.play().catch(error => {
            console.log("Autoplay bloqueado pelo navegador.");
            btnMusic.innerText = "🎵 Tocar Música";
        });
        btnMusic.classList.remove("hidden");
    });

    btnSeeDetails.addEventListener("click", () => {
        hero.classList.add("fade-out");
        hero.classList.add("hidden");
        
        setTimeout(() => {
            hero.style.display = "none"; 
            
            document.body.classList.remove("no-scroll");
            document.body.classList.add("verso-active");
            
            invitationContentVerso.classList.remove("hidden-no-display");
            invitationContentVerso.classList.add("active-scroll");
            
            setTimeout(() => {
                startScrollAnimations();
            }, 100);

            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 1000);
    });

    btnMusic.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
            btnMusic.innerText = "🎵 Pausar Música";
        } else {
            bgMusic.pause();
            btnMusic.innerText = "🎵 Tocar Música";
        }
    });

    const weddingDate = new Date("Jun 15, 2026 13:00:00").getTime();

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const countdownElement = document.getElementById("countdown");
        
        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownElement.innerHTML = "<h3>Chegou o grande dia!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(document.getElementById("days")) {
            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        }
    }, 1000);

    function startScrollAnimations() {
        const observerOptions = {
            root: null, 
            threshold: 0.15, 
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    if (target.classList.contains('timeline-item')) {
                        target.classList.add('fade-in-up');
                    } else if (target.parentElement.id === 'countdown') {
                        target.classList.add('fade-in-zoom'); 
                    } else if (target.tagName === 'IMG' && target.closest('.gallery-grid')) {
                        target.classList.add('fade-in-zoom'); 
                    } else {
                        target.classList.add('fade-in-up'); 
                    }

                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        const elementsToAnimate = [
            ...document.querySelectorAll('section'),
            ...document.querySelectorAll('.timeline-item'),
            ...document.querySelectorAll('#countdown > div'),
            ...document.querySelectorAll('.gallery-grid img')
        ];

        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
});
