import { useModalStatesContext } from "@/layout";


export const ImageSection = ({ localPostVariationKey }: { localPostVariationKey: string }) => {
    const { postVariations } = useModalStatesContext();

    return (
        <div style={{ width: '100%' }}>
            {postVariations[localPostVariationKey].postMedia.length === 1 &&
                postVariations[localPostVariationKey].postMedia.map((photo) => {
                    return <img key={photo.regUrl} src={photo.regUrl} alt="Photo" />;
                })}
            {postVariations[localPostVariationKey].postMedia.length === 2 && (
                <div
                    style={{
                        width: '100%',
                        height: '425px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        overflow: 'hidden', // Ensures images outside bounds are hidden
                    }}
                >
                    {postVariations[localPostVariationKey].postMedia.map((photo) => (
                        <div
                            key={photo.regUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden', // Hides overflow of individual images
                            }}
                        >
                            <img
                                src={photo.regUrl}
                                alt="Photo"
                                style={{
                                    height: '100%',
                                    width: 'auto',
                                    objectFit: 'cover', // Ensures the image covers its container
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {postVariations[localPostVariationKey].postMedia.length === 3 && (
                <div
                    style={{
                        width: '100%',
                        height: '425px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        overflow: 'hidden', // Ensures images outside bounds are hidden
                    }}
                >
                    <div
                        key={postVariations[localPostVariationKey].postMedia[0].regUrl}
                        style={{
                            minWidth: '100%',
                            minHeight: '100%',
                            overflow: 'hidden', // Hides overflow of individual images
                        }}
                    >
                        <img
                            src={postVariations[localPostVariationKey].postMedia[0].regUrl}
                            alt="Photo"
                            style={{
                                height: '100%',
                                minWidth: '100%',
                                width: 'auto',
                                objectFit: 'cover', // Ensures the image covers its container
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        />
                    </div>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        overflow: 'hidden', // Ensures images outside bounds are hidden
                    }}
                    >
                        {postVariations[localPostVariationKey].postMedia.slice(1).map((photo) => (
                            <div
                                key={photo.regUrl}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    overflow: 'hidden', // Hides overflow of individual images
                                }}
                            >
                                <img
                                    src={photo.regUrl}
                                    alt="Photo"
                                    style={{
                                        height: '100%',
                                        minWidth: '100%',
                                        width: 'auto',
                                        objectFit: 'cover', // Ensures the image covers its container
                                        position: 'relative',
                                        overflow: 'hidden',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {postVariations[localPostVariationKey].postMedia.length === 4 &&
                (
                    <div
                        style={{
                            width: '100%',
                            height: '425px',
                            display: 'grid',
                            gridTemplateRows: '2fr 1fr',
                            overflow: 'hidden', // Ensures images outside bounds are hidden
                        }}
                    >
                        <div
                            key={postVariations[localPostVariationKey].postMedia[0].regUrl}
                            style={{
                                minWidth: '100%',
                                minHeight: '100%',
                                overflow: 'hidden', // Hides overflow of individual images
                            }}
                        >
                            <img
                                src={postVariations[localPostVariationKey].postMedia[0].regUrl}
                                alt="Photo"
                                style={{
                                    height: '100%',
                                    minWidth: '100%',
                                    width: 'auto',
                                    objectFit: 'cover', // Ensures the image covers its container
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', width: '100%', height: '100%' }}>
                            {postVariations[localPostVariationKey].postMedia.slice(1).map((photo) => (
                                <div
                                    key={photo.regUrl}
                                    style={{
                                        width: '100%',
                                        minWidth: '100%',
                                        height: '100%',
                                        overflow: 'hidden', // Hides overflow of individual images
                                    }}
                                >
                                    <img
                                        src={photo.regUrl}
                                        alt="Photo"
                                        style={{
                                            height: '100%',
                                            minWidth: '100%',
                                            width: 'auto',
                                            objectFit: 'cover', // Ensures the image covers its container
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            {postVariations[localPostVariationKey].postMedia.length === 5 && (
                <div
                    style={{
                        width: '100%',
                        height: '425px',
                        display: 'grid',
                        gridTemplateRows: '1fr 1fr', // Top row takes 2/3 height, bottom row takes 1/3
                        // gap: '5px', // Optional: adds spacing between images
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            minWidth: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={postVariations[localPostVariationKey].postMedia[0].regUrl}
                            alt="Photo"
                            style={{
                                minWidth: '100%',
                                width: 'auto',
                                height: '100%',
                                objectFit: 'cover', // Ensures the image covers its container
                            }}
                        />
                    </div>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr', // Two columns
                            gridTemplateRows: '1fr 1fr',
                            overflow: 'hidden',
                        }}
                    >
                        {postVariations[localPostVariationKey].postMedia.slice(1).map((photo) => (
                            <div
                                style={{
                                    width: '100%',
                                    minWidth: '100%',
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <img
                                    src={photo.regUrl}
                                    alt="Photo"
                                    style={{
                                        minWidth: '100%',
                                        width: 'auto',
                                        height: '100%',
                                        objectFit: 'cover', // Ensures the image covers its container
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {postVariations[localPostVariationKey].postMedia.length > 5 &&
                (
                    <div
                        style={{
                            width: '100%',
                            height: '425px',
                            display: 'grid',
                            gridTemplateRows: '1fr 1fr', // Top row takes 2/3 height, bottom row takes 1/3
                            // gap: '5px', // Optional: adds spacing between images
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                minWidth: '100%',
                                height: '100%',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={postVariations[localPostVariationKey].postMedia[0].regUrl}
                                alt="Photo"
                                style={{
                                    minWidth: '100%',
                                    width: 'auto',
                                    height: '100%',
                                    objectFit: 'cover', // Ensures the image covers its container
                                }}
                            />
                        </div>
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr', // Two columns
                                gridTemplateRows: '1fr 1fr',
                                overflow: 'hidden',
                            }}
                        >
                            {postVariations[localPostVariationKey].postMedia.slice(1, 5).map((photo, index) => {
                                console.log(index, postVariations[localPostVariationKey].postMedia.length)
                                if (index != 3) {
                                    return (
                                        <div
                                            style={{
                                                width: '100%',
                                                minWidth: '100%',
                                                height: '100%',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <img
                                                src={photo.regUrl}
                                                alt="Photo"
                                                style={{
                                                    minWidth: '100%',
                                                    width: 'auto',
                                                    height: '100%',
                                                    objectFit: 'cover', // Ensures the image covers its container
                                                }}
                                            />
                                        </div>
                                    )
                                } else {
                                    console.log("fourth")
                                    return (
                                        <div
                                            style={{
                                                width: '100%',
                                                minWidth: '100%',
                                                height: '100%',
                                                overflow: 'hidden',
                                                position: 'relative'
                                            }}
                                        >
                                            <div style={{
                                                width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.4)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute'
                                            }}>
                                                <p style={{ fontWeight: '700', fontSize: '20px', color: 'white' }}>{`+${postVariations[localPostVariationKey].postMedia.length - 5}`}</p>
                                            </div>
                                            <img
                                                src={photo.regUrl}
                                                alt="Photo"
                                                style={{
                                                    minWidth: '100%',
                                                    width: 'auto',
                                                    height: '100%',
                                                    objectFit: 'cover', // Ensures the image covers its container
                                                }}
                                            />
                                        </div>


                                    )
                                }
                            })}
                        </div>
                    </div>
                )}
        </div>
    )
}