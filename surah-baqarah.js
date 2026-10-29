function loadBaqarah() {

    let html = `
    <div class="ayah">
        (1) الم
    </div>
    `;

    fetch("https://api.alquran.cloud/v1/surah/2")
        .then(response => response.json())
        .then(data => {

            data.data.ayahs.forEach(ayah => {

                if (ayah.numberInSurah === 1) return;

                html += `
                <div class="ayah">
                    (${ayah.numberInSurah}) ${ayah.text}
                </div>
                `;
            });

            document.querySelector(".arabic").innerHTML = html;

        });
}