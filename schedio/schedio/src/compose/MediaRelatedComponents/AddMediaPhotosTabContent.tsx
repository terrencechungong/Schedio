// @ts-ignore
import { ImageUp, Search, X } from 'lucide-react';
// @ts-ignore
import styles from '../ScssModules/photostabcontent.module.scss'
// @ts-ignore
import { createGifOverlay, createImageOverlay, createImageOverlayUnsplash } from '../abstraction/GifTabAbstraction';
// @ts-ignore
import { useEffect, useRef, useState } from 'react';
// @ts-ignore
import { PhotoInPost, useModalStatesContext } from '@/layout';
// @ts-ignore
import { generateRandom4Digit } from '@/utilFunctions';

export const AddMediaPhotosTabContent: React.FC = () => {
    const searchInput = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    var useResults = false;
    const { setShowMediaModal, imgContainer, setShowEditMediaModal, setMediaBeingEditedUrl, mediaBeingEditedId,addOrUpdatePhotoInPost  } = useModalStatesContext();

    const photoOnClick = (photoObj: PhotoInPost) => {
        addOrUpdatePhotoInPost(photoObj);
        // setPhotosInPost((prev) => [...prev, {...photoObj, beingEdited:false}])
        setShowMediaModal(false)
    }

    function httpGetAsync(): void {
        var accessKey = 'wtjgXEDZos65Wa2CVTrmIJImM_wxjzy_hb5sYIoVXac';
        var url;
        if (!searchInput.current) {
            url = `https://api.unsplash.com/photos?page=1&client_id=${accessKey}`;
        } else if ((/^[\s]*$/.test(searchInput.current.value))) {
            url = `https://api.unsplash.com/photos?page=1&client_id=${accessKey}`;
        } else {
            url = `https://api.unsplash.com/search/photos?page=1&query=${searchInput.current.value}&client_id=${accessKey}`;
            useResults = true;
        }

        // var apikey = "AIzaSyAv_DKYQt5k6AlPgDKAx2370Za3iaQ2cwA";
        // var clientkey = "Schedio";
        // var limit = 8;
        // var keyword = query.trim() == "" ? "random" : query;
        //create skeletons
        // create the request object
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
                const photos = useResults ? data.results : data;
                console.log(photos)
                const containerOne = document.getElementsByClassName(styles.rowOne)[0];
                const containerTwo = document.getElementsByClassName(styles.rowTwo)[0];
                containerOne.innerHTML = '';
                containerTwo.innerHTML = '';
                photos.forEach((photo: { urls: { regular: string; }; slug: string; }, index: number) => {

                    const overlay = document.createElement('div');
                    overlay.className = styles.overlay;
                    createImageOverlayUnsplash(overlay, photo, photoOnClick);
                    const gifDiv = document.createElement('div');
                    gifDiv.className = styles.photoItem;
                    const img = document.createElement('img');
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.borderRadius = '7px'
                    img.src = photo.urls.regular;
                    img.alt = photo.slug;
                    img.id = photo.slug;
                    gifDiv.appendChild(img);
                    gifDiv.appendChild(overlay)

                    if (index % 2 == 0) {
                        containerOne.appendChild(gifDiv);
                        return
                    }
                    containerTwo.appendChild(gifDiv);
                }
                )

            }) // handle better
            .catch(error => console.error('Error fetching GIFs:', error));
    }


    useEffect(() => {
        // Set up a timeout to call handleCall after 2 seconds
        if (!searchInput.current || !/\S/.test(inputValue) || !/\S/.test(searchInput.current.value)) {
            return;
        }

        const timeoutId = setTimeout(() => {
            httpGetAsync();
        }, 1000);

        // Clear timeout if inputValue changes before 2 seconds
        return () => clearTimeout(timeoutId);
    }, [inputValue]);

    useEffect(() => {
        httpGetAsync();
    }, []);

    // Update inputValue when user types in the input
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };


    return (

        <div className={styles.container}>
            <div className={styles.uploadFromUrl}>
                {/* MAKE ICONS SMALLER */}
                <Search />
                <input placeholder="Search Unsplash" className={styles.uploadUrlTextArea} ref={searchInput} onChange={handleChange} />
                <X onClick={() => { if (searchInput.current) searchInput.current.value = '' }} style={{ cursor: 'pointer' }} />
            </div>
            <div className={styles.rowsOfPhotos}>
                <div className={styles.rowOne}>

                </div>
                <div className={styles.rowTwo}>

                </div>
            </div>

        </div>

    );
}