let audio; 
let currentSurah = "fatihah"; 
let lastTrackedIndex = -1;

// ⚡ Har Surah ke exact audio seconds jab text automatically window ke center mein scroll hona chahiye
const surahTimings = {
    fatihah: [0, 4.5, 9.0, 13.5, 18.0, 22.5, 27.0], 
    baqarah: [0, 4.8, 12.5, 16.9, 28.5, 41.2, 55.0, 68.0, 82.0, 95.0], 
    kahf: [0, 6.2, 19.8, 30.5, 47.1, 62.8, 77.0, 92.0]
};

// ⚡ HTML5 Audio initialization ek hi baar hoti hai (YouTube style pause/resume ke liye)
function initializeAudioElement() {
    if (!audio) {
        audio = new Audio();
        
        // Native HTML5 event listener jo audio ke sath live scrolling sync rakhta hai
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
    } else if (currentSurah === "baqarah") { 
        targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/002.mp3"; 
    } else if (currentSurah === "kahf") { 
        targetSrc = "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/018.mp3"; 
    } 

    if (audio.src !== targetSrc) {
        audio.src = targetSrc;
        lastTrackedIndex = -1; 
    }
    
    audio.play().catch(error => {
        console.log("Browser safety play handler triggered.");
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

    if (selected === "baqarah") {
        currentSurah = "baqarah"; 
        document.getElementById('surahTitle').innerText = "📖 Surah Al-Baqarah"; 
        document.getElementById('notification').innerText = "✅ Surah Al-Baqarah Loaded"; 
        loadBaqarah(); 
        setTimeout(() => { playAudio(); }, 300); 
        return; 
    } 
    
    if (selected === "fatihah") { 
        currentSurah = "fatihah"; 
        document.getElementById('surahTitle').innerText = "📖 Surah Al-Fatihah"; 
        document.getElementById('notification').innerText = "✅ Surah Al-Fatihah Loaded"; 
        location.reload(); 
        return; 
    } 
    
    if (selected === "kahf") { 
        currentSurah = "kahf"; 
        document.getElementById('surahTitle').innerText = "📖 Surah Al-Kahf"; 
        document.getElementById('notification').innerText = "✅ Surah Al-Kahf Loaded"; 
        loadKahf(); 
        setTimeout(() => { playAudio(); }, 300); 
        return; 
    } 
} 

// ⚡ Core Master Scrolling Engine
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

        const containerHeight = arabicContainer.clientHeight;
        const ayahTopPosition = ayahs[targetIndex].offsetTop - arabicContainer.offsetTop;
        const ayahHeight = ayahs[targetIndex].clientHeight;

        arabicContainer.scrollTo({
            top: ayahTopPosition - (containerHeight / 2) + (ayahHeight / 2),
            behavior: 'smooth'
        });
    }
}
