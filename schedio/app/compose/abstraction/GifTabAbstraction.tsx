import ReactDOM from 'react-dom/client';
import { EllipsisVertical } from 'lucide-react';
import { generateRandom4Digit } from '@/app/utilFunctions';


export const createGifOverlay = (overlay: HTMLDivElement, url: string, photoOnClick) => {
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
    
    useGifTextDiv.onclick = () => {
        const id = `${url}-${generateRandom4Digit()}`;
        const photoObj = { naturalAspectRatio:1, smallUrl: url, regUrl: url, fileType:'gif', id, isGif: true, beingEdited:true };
        photoOnClick(photoObj);
    }

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

export const createImageOverlayUnsplash = (overlay: HTMLDivElement, photo, photoOnClick) => {
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

    useGifTextDiv.onclick = () => {
        const naturalAspectRatio = photo.width / photo.height;
        const fileType = photo.urls.regular.split('&fm=')[1].split('&')[0];
        const id = `${photo.urls.regular}-${generateRandom4Digit()}`
        const photoObj = { naturalAspectRatio,
            smallUrl: photo.urls.small,
            regUrl: photo.urls.regular,
            fileType, id,
            beingEdited: false,
            isGif: false };
        photoOnClick(photoObj);
    }

    const useImageAndElipsisDiv = document.createElement('div');
    useImageAndElipsisDiv.style.display = 'flex';
    useImageAndElipsisDiv.style.flexDirection = 'row';
    useImageAndElipsisDiv.style.alignItems = 'center';
    useImageAndElipsisDiv.style.justifyContent = 'center';
    useImageAndElipsisDiv.style.alignSelf = 'center'
    useImageAndElipsisDiv.style.width = '100%';
    useImageAndElipsisDiv.style.gap = '6px';
    const ellipse = document.createElement('div');
    ellipse.style.width = 'auto';
    useImageAndElipsisDiv.appendChild(useGifTextDiv)
    useImageAndElipsisDiv.appendChild(ellipse)
    const root = ReactDOM.createRoot(ellipse);
    root.render(<EllipsisVertical />);

    const textDiv = document.createElement('div');
    textDiv.style.display = 'flex';
    textDiv.style.flexDirection = 'column';
    textDiv.style.alignItems = 'center';
    const fromTenerText = document.createElement('p');
    fromTenerText.innerText = 'Image from Unsplash';
    fromTenerText.style.color = 'rgb(80, 80, 80)';
    fromTenerText.style.fontSize = '14px';
    const creator = document.createElement('p');
    fromTenerText.innerHTML = `<i>By <a style="color: #3364ff; text-decoration: underline" target="_blank" href="${photo.links.html}">${photo.user.name}</a></i>`;
    fromTenerText.style.color = 'rgb(80, 80, 80)';
    fromTenerText.style.fontSize = '14px';


    useGifDiv.appendChild(useImageAndElipsisDiv)
    useGifDiv.appendChild(fromTenerText)

    overlay.appendChild(useGifDiv);
}