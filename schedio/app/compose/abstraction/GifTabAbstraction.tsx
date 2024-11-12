

export const createGifOverlay = (overlay: HTMLDivElement) => {
    const useGifDiv = document.createElement('div');
    useGifDiv.style.width = '80%';
    useGifDiv.style.height = '100px';
    useGifDiv.style.backgroundColor = 'white';
    useGifDiv.style.borderRadius = '7px';
    useGifDiv.style.display = 'flex';
    useGifDiv.style.flexDirection = 'column';
    useGifDiv.style.gap = '5px';
    useGifDiv.style.justifyContent = 'center';
    useGifDiv.style.alignItems = 'center';

    const useGifTextDiv = document.createElement('div');
    useGifTextDiv.style.backgroundColor = '#2c5ad7';
    useGifTextDiv.style.borderRadius = '7px'
    useGifTextDiv.style.width = '50%';
    useGifTextDiv.style.height = '40px';
    useGifTextDiv.style.display = 'flex';
    useGifTextDiv.style.color = 'white'
    useGifTextDiv.style.alignItems = 'center';
    useGifTextDiv.style.justifyContent = 'center';
    useGifTextDiv.style.fontSize = '14px';
    useGifTextDiv.style.fontWeight = '600';
    useGifTextDiv.innerText = 'Use gif';


    const fromTenerText = document.createElement('p');
    fromTenerText.innerText = 'GIF from Tenor';
    fromTenerText.style.color = 'rgb(80, 80, 80)';
    fromTenerText.style.fontSize = '14px'

    useGifDiv.appendChild(useGifTextDiv)
    useGifDiv.appendChild(fromTenerText)

    overlay.appendChild(useGifDiv);
}



export const createImageOverlay = (overlay: HTMLDivElement) => {
    const useGifDiv = document.createElement('div');
    useGifDiv.style.width = '80%';
    useGifDiv.style.height = '100px';
    useGifDiv.style.backgroundColor = 'white';
    useGifDiv.style.borderRadius = '7px';
    useGifDiv.style.display = 'flex';
    useGifDiv.style.flexDirection = 'column';
    useGifDiv.style.gap = '5px';
    useGifDiv.style.justifyContent = 'center';
    useGifDiv.style.alignItems = 'center';

    const useGifTextDiv = document.createElement('div');
    useGifTextDiv.style.backgroundColor = '#2c5ad7';
    useGifTextDiv.style.borderRadius = '7px'
    useGifTextDiv.style.width = '50%';
    useGifTextDiv.style.height = '40px';
    useGifTextDiv.style.display = 'flex';
    useGifTextDiv.style.color = 'white'
    useGifTextDiv.style.alignItems = 'center';
    useGifTextDiv.style.justifyContent = 'center';
    useGifTextDiv.style.fontSize = '14px';
    useGifTextDiv.style.fontWeight = '600';
    useGifTextDiv.innerText = 'Use image';


    const fromTenerText = document.createElement('p');
    fromTenerText.innerText = 'Image from Unsplash';
    fromTenerText.style.color = 'rgb(80, 80, 80)';
    fromTenerText.style.fontSize = '14px'

    useGifDiv.appendChild(useGifTextDiv)
    useGifDiv.appendChild(fromTenerText)

    overlay.appendChild(useGifDiv);
}