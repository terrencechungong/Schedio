import { useModalStatesContext } from "@/app/layout";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion'





export const DeleteVersionConfirmationModal = () => {
    const { setShowDeletionConfirmationModal, setCheckedProfile, postVariationKey, textareaRef, setPostVariationKey, postVariations, setPostVariations } = useModalStatesContext();
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '78px',
        zIndex: 20
    };

    return (
        <div
            style={containerStyle}
            onClick={() => setShowDeletionConfirmationModal(false)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.1 }}
                style={{ width: '440px', height: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '15px' }}
                className={`rounded-lg`} onClick={(e) => e.stopPropagation()}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c' }}>Deletion Confirmation</h4>
                <p style={{ color: '#2d3748' }}>
                    Are you sure you want to delete this version? Its content will be permanently removed and cannot be recovered.
                </p>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', gap: '7px', marginTop: '9px' }}>
                    <Button
                    onClick={() =>  setShowDeletionConfirmationModal(false)}
                    className="p-5 shadow-none bg-accent transition traition-color color hover:bg-gray-200 transition-duration-200 text-black">Cancel</Button>
                    <Button className="p-5 bg-red-500 transition traition-color color hover:bg-red-400 transition-duration-200 text-white"
                        onClick={() => {
                            setCheckedProfile((prev) =>
                                prev.map((p) => {
                                    if (postVariationKey === `${p.platform}-${p.name}-${p.id}`) {
                                        return { ...p, unique: false };
                                    }
                                    return p;
                                })
                            )
                            setPostVariationKey("GenericTemplate")
                            setShowDeletionConfirmationModal(false)
                            if (textareaRef.current) textareaRef.current.innerHTML = postVariations["GenericTemplate"].postCaption
                        }
                        }

                    >Delete</Button>
                </div>
            </motion.div >
        </div >
    )
}