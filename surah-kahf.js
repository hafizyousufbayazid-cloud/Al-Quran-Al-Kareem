function loadKahf() {

    fetch("https://api.alquran.cloud/v1/surah/18")
        .then(response => response.json())
        .then(data => {

            let html = "";

            data.data.ayahs.forEach(ayah => {

                html += `
                <div class="ayah">
                (${ayah.numberInSurah}) ${ayah.text}
                </div>
                `;
            });

            document.querySelector(".arabic").innerHTML = html;

        });

}