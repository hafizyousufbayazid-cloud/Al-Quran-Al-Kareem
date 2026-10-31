let audio; 
let currentSurah = "fatihah"; 
let lastTrackedIndex = -1;

// ⚡ Mishary Rashid Alafasy ke audio ke bilkul exact timestamps (Sub-second precision)
const surahTimings = {
    fatihah: [0, 4.5, 9.2, 13.8, 18.2, 22.4, 27.1], 
    baqarah: [0, 4.8, 12.5, 16.9, 28.5, 41.2, 55.0, 68.0, 82.0, 95.0], 
    kahf: [0, 6.2, 19.8, 30.5, 47.1, 62.8, 77.0, 92.0],     
    yasin: [0, 5.1, 11.8, 18.5, 26.9, 34.4, 42.1, 50.8, 61.2, 69.5, 78.4, 88.1, 95.3], 
    mulk: [0, 6.2, 15.1, 22.8, 32.4, 41.1, 50.9, 61.5, 71.4, 82.2], 
    waqia: [0, 5.8, 12.4, 20.1, 26.5, 34.2, 41.8, 48.9, 54.3, 60.1], 
    ikhlas: [0, 4.2, 7.8, 11.5, 16.0], 
    falaq: [0, 4.8, 9.1, 13.6, 18.2, 22.9], 
    naas: [0, 4.8, 9.5, 14.6, 19.8, 25.3, 31.0] 
};

function initializeAudioElement() {
    if (!audio) {
        audio = new Audio();
        audio.addEventListener('timeupdate', () => {
            executePureHTML5ScrollOnly();
        });
    }
}

function playAudio() { 
    initializeAudioElement();
    
    let targetSrc = "";
    if (currentSurah === "fatihah") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3";
}
else if (currentSurah === "baqarah") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/002.mp3";
}
else if (currentSurah === "kahf") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/018.mp3";
} 
  else if (currentSurah === "yasin") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/036.mp3";
}

else if (currentSurah === "mulk") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/067.mp3";
}

else if (currentSurah === "waqia") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/056.mp3";
}

else if (currentSurah === "ikhlas") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/112.mp3";
}

else if (currentSurah === "falaq") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/113.mp3";
}

else if (currentSurah === "naas") {
    targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/114.mp3";
}

    if (audio.src !== targetSrc) {
        audio.src = targetSrc;
        lastTrackedIndex = -1; 
    }
    
    audio.play().catch(error => {
        console.log("Play blocked by browser, user interaction required.");
    });
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
    lastTrackedIndex = -1;
    resetActiveAyahs();
} 

function resetActiveAyahs() {
    document.querySelectorAll('.ayah').forEach(a => a.classList.remove('active')); 
}

function toggleDarkMode() { 
    document.body.classList.toggle('dark'); 
} 

function changeSurah() { 
    const selected = document.getElementById('surahSelect').value; 
    resetActiveAyahs();
    lastTrackedIndex = -1;

    if (selected === "fatihah") { 
        currentSurah = "fatihah"; 
        document.getElementById('surahTitle').innerText = "📖 Surah Al-Fatihah"; 
        location.reload(); 
        return; 
    } 

    setupSurahView(selected);
} 

function setupSurahView(surahKey) {
    currentSurah = surahKey;
    let title = surahKey.charAt(0).toUpperCase() + surahKey.slice(1);
    document.getElementById('surahTitle').innerText = `📖 Surah Al-${title}`; 

    // Alag-alag files ke functions ko theek tarike se trigger karne ke liye loop logic
    if (surahKey === "baqarah" && typeof loadBaqarah === "function") loadBaqarah();
    else if (surahKey === "kahf" && typeof loadKahf === "function") loadKahf();
    else if (surahKey === "yasin" && typeof loadYasin === "function") loadYasin();
    else if (surahKey === "mulk" && typeof loadMulk === "function") loadMulk();
    else if (surahKey === "waqia" && typeof loadWaqia === "function") loadWaqia();
    else if (surahKey === "ikhlas" && typeof loadIkhlas === "function") loadIkhlas();
    else if (surahKey === "falaq" && typeof loadFalaq === "function") loadFalaq();
    else if (surahKey === "naas" && typeof loadNaas === "function") loadNaas();

    setTimeout(() => { playAudio(); }, 400);
}

function executePureHTML5ScrollOnly() {

    if (!audio) return;

    const currentTime = audio.currentTime;
    const timings = surahTimings[currentSurah];
    const ayahs = document.querySelectorAll('.ayah');
    const arabicContainer = document.querySelector('.arabic');

    if (!timings || ayahs.length === 0 || !arabicContainer) return;

    let targetIndex = 0;

    for (let i = 0; i < timings.length; i++) {
        if (currentTime >= timings[i]) {
            targetIndex = i;
        }
    }

    if (targetIndex !== lastTrackedIndex && ayahs[targetIndex]) {

        lastTrackedIndex = targetIndex;

        ayahs[targetIndex].scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}
    

function quickSurah(name) {

    document.getElementById("surahSelect").value = name;

    changeSurah();
}