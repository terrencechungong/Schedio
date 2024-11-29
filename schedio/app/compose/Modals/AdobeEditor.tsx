import { useModalStatesContext } from '@/app/layout';
import { useEffect, useRef } from 'react';

const AdobeEditor = () => {
    const { setShowAdobeEditor, mediaBeingEditedUrl } = useModalStatesContext();
    const inProgress = useRef(false);

    useEffect(() => {
        const loadAdobeSDK = () =>
            new Promise((resolve, reject) => {
                if (window.CCEverywhere) {
                    resolve(window.CCEverywhere); // SDK already loaded
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://cc-embed.adobe.com/sdk/v4/CCEverywhere.js';
                    script.async = true;
                    script.onload = () => resolve(window.CCEverywhere);
                    script.onerror = () => reject(new Error('Failed to load Adobe SDK'));
                    document.body.appendChild(script);
                }
            });

        const initializeAdobeEditor = async () => {
            if (inProgress.current) return;
            try {
                const CCEverywhere = await loadAdobeSDK();
                inProgress.current = true;
                // Initialize Adobe Express
                const { editor } = await CCEverywhere.initialize({
                    clientId: "21d0ed5094db45ee800ba12ab7c1b684", // Replace with your Adobe API Key
                    appName: 'Schedio', // Replace with your application name
                });
                console.log(typeof editor);
                // Launch the editor with the provided image URL
                editor.create({ canvasSize: 'BusinessCard' }, {
                    selectedCategory: "media",
                    callbacks: {
                        onPublish: () => {
                            alert("yess") // Trigger onSuccess with publish data
                        },
                        onCancel: () => {
                            setShowAdobeEditor(false); // Trigger onCancel when user closes the editor
                        },
                    },
                    //   inputParams: {
                    //     asset: {
                    //       data: mediaBeingEditedUrl, // The URL of the image to be edited
                    //       dataType: 'url', // or 'base64' if you're passing Base64-encoded data
                    //       type: 'image', // Specifies this is an image asset
                    //     },
                    //   },

                },[
                    {
                      id: "download",
                      label: "Download",
                      action: { target: "download" },
                      style: { uiType: "button" },
                    },
                    {
                      id: "save-modified-asset",
                      label: "Save image",
                      action: { target: "publish" },
                      style: { uiType: "button" },
                    },
                  ]);
            } catch (error) {
                console.error('Error initializing Adobe Editor:', error);
            }
        };

        initializeAdobeEditor();
    }, []);
    return (
        <div
            style={{
                position: 'absolute', height: '100vh', width: '100vw',
                backgroundColor: 'rgb(0, 0, 0, 0.0)',
                display: 'flex',
                flexDirection: 'row',
                overflowY: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 20
            }}
        >
            <div
                id="adobe-express-editor"
                style={{
                    width: '94vw',
                    height: '94vh', // Full screen height
                    position: 'relative',
                    zIndex: 22
                }}
            ></div>
        </div>
    );
};

export default AdobeEditor;
