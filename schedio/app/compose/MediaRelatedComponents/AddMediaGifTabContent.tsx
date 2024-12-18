import { ImageUp, Search, X } from 'lucide-react';
import styles from '../ScssModules/giftabcontent.module.scss'
import { createGifOverlay } from '../abstraction/GifTabAbstraction';
import { useEffect, useRef, useState } from 'react';
import { PhotoInPost, useModalStatesContext } from '@/app/layout';
import { fetchDimensions } from '@/app/utilFunctions';

export const AddMediaGifTabContent: React.FC = () => {
    const searchInput = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    const { setShowMediaModal, imgContainer, setShowEditMediaModal, setMediaBeingEditedUrl, mediaBeingEditedId,
        addOrUpdatePhotoInPost
    } = useModalStatesContext();

    const photoOnClick = async (photoObj: PhotoInPost) => {
        addOrUpdatePhotoInPost(photoObj);
        setShowMediaModal(false);
        const { width, height } = await fetchDimensions(photoObj.regUrl);
        addOrUpdatePhotoInPost({ ...photoObj, naturalAspectRatio: width / height, beingEdited: false })
    }


    function httpGetAsync(): void {
        var query = searchInput.current ? searchInput.current.value : "";
        var apikey = "AIzaSyAv_DKYQt5k6AlPgDKAx2370Za3iaQ2cwA";
        var clientkey = "Schedio";
        var limit = 8;
        var keyword = query.trim() == "" ? "random" : query;
        //create skeletons
        // create the request object
        fetch(`https://tenor.googleapis.com/v2/search?q=${keyword}&key=${apikey}&client_key=${clientkey}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                const gifs = data.results;
                const containerOne = document.getElementsByClassName(styles.rowOne)[0];
                const containerTwo = document.getElementsByClassName(styles.rowTwo)[0];
                containerOne.innerHTML = '';
                containerTwo.innerHTML = '';
                gifs.forEach((gif: { media_formats: { gif: { url: string; }; }; title: string; }, index: number) => {
                    console.log(gif)
                    const overlay = document.createElement('div');
                    overlay.className = styles.overlay;
                    createGifOverlay(overlay, gif.media_formats.gif.url, photoOnClick);
                    const gifDiv = document.createElement('div');
                    gifDiv.className = styles.gifItem;
                    const img = document.createElement('img');
                    img.style.borderRadius = '7px'
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.src = gif.media_formats.gif.url;
                    img.alt = gif.title;
                    img.id = gif.media_formats.gif.url;
                    gifDiv.appendChild(img);
                    gifDiv.appendChild(overlay)

                    if (index % 2 == 0) {
                        containerOne.appendChild(gifDiv);
                        return
                    }
                    containerTwo.appendChild(gifDiv);
                });
            }) // handle better
            .catch(error => console.error('Error fetching GIFs:', error));
    };


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
                <input placeholder="Search Tenor" className={styles.uploadUrlTextArea} ref={searchInput} onChange={handleChange} />
                <X onClick={() => { if (searchInput.current) searchInput.current.value = '' }} style={{ cursor: 'pointer' }} />
            </div>
            <div className={styles.rowsOfGifs}>
                <div className={styles.rowOne}>

                </div>
                <div className={styles.rowTwo}>

                </div>
            </div>

        </div>

    );
}