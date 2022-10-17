const containerDiv = document.querySelector('.container');

const baseURL = 'https://restcountries.com/v2';

const fetchCountryNames = async () => {
    const response = await fetch(`${baseURL}/all?fields=name,alpha3Code,flags`);
    const data = await response.json();

    data.forEach((country) => {
        const countryButton = document.createElement('button');

        countryButton.innerHTML = `
            <img width="16px" src="${country.flags.png}">
            <span>${country.name}</span>
        `;
        
        countryButton.setAttribute('data-iso', country.alpha3Code.toLowerCase());

        countryButton.classList.add('country-button');

        containerDiv.append(countryButton);
    })
}

fetchCountryNames().then(() => {
    const countryButtons = document.querySelectorAll('.country-button')
    
    countryButtons.forEach((button) => {

        button.addEventListener('click', async (event) => {
            event.currentTarget.classList.add('selected');

            const isoCode = event.currentTarget.getAttribute('data-iso');

            const response = await fetch(`${baseURL}/alpha/${isoCode}`);
            const data = await response.json();
            console.log(data)
        })
    })
})