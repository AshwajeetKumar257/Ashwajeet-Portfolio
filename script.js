/* =====================================================
   AK PORTFOLIO
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   INTRO ELEMENTS
===================================================== */

const introScreen =
    document.getElementById("introScreen");

const portfolio =
    document.getElementById("portfolio");

const video =
    document.getElementById("introVideo");

const soundButton =
    document.getElementById("soundButton");

const progressBar =
    document.getElementById("progressBar");

const progressPercent =
    document.getElementById("progressPercent");

const enterButton =
    document.getElementById("enterButton");


/* =====================================================
   INITIAL STATE
===================================================== */

if (portfolio) {
    portfolio.style.visibility = "hidden";
    portfolio.style.opacity = "0";
}


/* =====================================================
   VIDEO START
===================================================== */

if (video) {

    video.addEventListener(
        "loadedmetadata",
        () => {

            video.muted = true;

            video.play().catch(
                (error) => {

                    console.log(
                        "Autoplay blocked:",
                        error
                    );

                }
            );

        }
    );


    /* =================================================
       VIDEO PROGRESS
    ================================================= */

    video.addEventListener(
        "timeupdate",
        () => {

            if (!video.duration) {
                return;
            }


            const progress =
                (video.currentTime /
                    video.duration) * 100;


            if (progressBar) {

                progressBar.style.width =
                    `${progress}%`;

            }


            if (progressPercent) {

                progressPercent.textContent =
                    `${Math.floor(progress)}%`;

            }

        }
    );


    /* =================================================
       TAP TO HEAR
    ================================================= */

    if (soundButton) {

        soundButton.addEventListener(
            "click",
            () => {

                video.muted = false;

                video.volume = 1;


                video.play().catch(
                    (error) => {

                        console.log(
                            "Playback error:",
                            error
                        );

                    }
                );


                soundButton.classList.add(
                    "active"
                );

            }
        );

    }


    /* =================================================
       VIDEO END
    ================================================= */

    video.addEventListener(
        "ended",
        () => {

            if (progressBar) {

                progressBar.style.width =
                    "100%";

            }


            if (progressPercent) {

                progressPercent.textContent =
                    "100%";

            }


            if (enterButton) {

                enterButton.disabled = false;

            }

        }
    );

}


/* =====================================================
   ENTER MY WORLD
===================================================== */

if (enterButton) {

    enterButton.addEventListener(
        "click",
        () => {

            enterButton.disabled = true;


            /* Fade intro */

            if (introScreen) {

                introScreen.style.opacity =
                    "0";

            }


            /* Reveal portfolio */

            setTimeout(
                () => {

                    if (portfolio) {

                        portfolio.style.visibility =
                            "visible";

                        portfolio.style.opacity =
                            "1";

                    }


                    document.body.classList.add(
                        "site-open"
                    );


                    window.scrollTo(
                        0,
                        0
                    );

                },
                450
            );


            /* Remove intro */

            setTimeout(
                () => {

                    if (introScreen) {

                        introScreen.style.display =
                            "none";

                    }

                },
                900
            );

        }
    );

}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "open"
            );

        }
    );


    /* Close menu after link click */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "open"
                    );

                }
            );

        }
    );

}


/* =====================================================
   NAVBAR ACTIVE SECTION
===================================================== */

const sections =
    document.querySelectorAll(
        ".section, .home-section"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNav() {

    let currentSection = "home";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;


            const scrollPosition =
                window.scrollY + 180;


            if (
                scrollPosition >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


/* =====================================================
   JOURNEY STACK
===================================================== */

const journeyCards =
    document.querySelectorAll(
        ".journey-card"
    );


let activeJourney = 0;


function updateJourney() {

    journeyCards.forEach(
        (card, index) => {

            card.classList.toggle(
                "active",
                index === activeJourney
            );

        }
    );

}


journeyCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                activeJourney =
                    index;

                updateJourney();

            }
        );

    }
);


/* =====================================================
   KEYBOARD SUPPORT FOR JOURNEY
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Don't control Journey
         * while typing in an input.
         */

        const activeElement =
            document.activeElement;


        if (
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowRight" &&
            activeJourney <
            journeyCards.length - 1
        ) {

            activeJourney++;

            updateJourney();

        }


        if (
            event.key === "ArrowLeft" &&
            activeJourney > 0
        ) {

            activeJourney--;

            updateJourney();

        }

    }
);


/* =====================================================
   NAVIGATION CLICK
===================================================== */

navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                const target =
                    link.getAttribute(
                        "href"
                    );


                if (
                    target &&
                    target.startsWith("#")
                ) {

                    const element =
                        document.querySelector(
                            target
                        );


                    if (element) {

                        setTimeout(
                            () => {

                                updateActiveNav();

                            },
                            400
                        );

                    }

                }

            }
        );

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

updateJourney();

updateActiveNav();


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    () => {

        updateActiveNav();

        updateJourney();

    }
);