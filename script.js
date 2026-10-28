let audio;

function playAudio() {

    if (!audio) {

        audio = new Audio(
            "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3"
        );

        const ayahs = document.querySelectorAll(".ayah");

        audio.ontimeupdate = function () {

            const t = audio.currentTime;

            ayahs.forEach(a => a.classList.remove("active"));

            if (t < 4) {
                ayahs[0].classList.add("active");
                ayahs[0].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            else if (t < 10) {
                ayahs[1].classList.add("active");
                ayahs[1].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            else if (t < 14) {
                ayahs[2].classList.add("active");
                ayahs[2].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            else if (t < 18) {
                ayahs[3].classList.add("active");
                ayahs[3].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            else if (t < 25) {
                ayahs[4].classList.add("active");
                ayahs[4].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            else if (t < 32) {
                ayahs[5].classList.add("active");
                ayahs[5].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

            else {
                ayahs[6].classList.add("active");
                ayahs[6].scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }

        };
    }

    audio.play();
}

function pauseAudio() {
    if (audio) {
        audio.pause();
    }
}

function stopAudio() {

    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    document.querySelectorAll(".ayah")
        .forEach(a => a.classList.remove("active"));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}