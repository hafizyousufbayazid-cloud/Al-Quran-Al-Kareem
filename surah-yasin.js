function loadYasin() {

    let html = "";

    fetch("https://api.alquran.cloud/v1/surah/36")
        .then(response => response.json())
        .then(data => {

            data.data.ayahs.forEach(ayah => {

                html += `
                <div class="ayah" id="a${ayah.numberInSurah}">
                    (${ayah.numberInSurah}) ${ayah.text}
                </div>
                `;
            });

            document.querySelector(".arabic").innerHTML = html;

        })
        .catch(error => console.error("Error loading Yasin:", error));
}