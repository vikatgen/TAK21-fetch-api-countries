const baseURL = 'https://restcountries.com/v3.1';

const fetchCountries = async () => {
    await fetch(`${baseURL}/all?fields=name,flags,cca2`)
        .then(response => response.json())
        .then((data) => {
            const containerDiv = document.querySelector('.container');

            data.forEach((country) => {
                const countryButton = document.createElement('button');
                countryButton.classList.add('country-button');
                countryButton.setAttribute('data-iso', country.cca2.toLowerCase())

                countryButton.innerHTML = `
                    <img width="20px" src="${country.flags.png}">
                    <span>${country.name.official}</span>
                `

                containerDiv.append(countryButton);
            })
        })
}

const fetchSingleCountry = async (cca2) => {
    const response = await fetch(`${baseURL}/alpha/${cca2}`);
    const data = await response.json();
    return data;
}

fetchCountries().then(() => {
    const buttons = document.querySelectorAll('.country-button');
    buttons.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const cca2 = event.currentTarget.getAttribute('data-iso');
            const singleCountry = await fetchSingleCountry(cca2);
            console.log(singleCountry[0]);
        })
    })
});