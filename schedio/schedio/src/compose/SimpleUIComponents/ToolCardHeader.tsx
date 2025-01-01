import lightbulb from '@/assets/light-bulb-with-removebg-preview (2).png';
import template from '@/assets/icons8-template-64 (1).png';
import hashtag from '@/assets/hashtag.png';
import styles from '../ScssModules/compose.module.scss';
import { X } from 'lucide-react';


export const GetInspirationHeader = () => {

    return (
        <div className={styles.toolCardHeader}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '9px' }}>
                <div style={{
                    width: '58px', height: '58px', borderRadius: '6px', backgroundColor: '#FDE68A', alignItems: 'center', justifyContent: 'center'
                    , minHeight: '58px', minWidth: '58px'
                }}>
                    <img src={lightbulb} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '58px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Get inspiration</p>
                    <p style={{ fontSize: '16px', color: 'grey' }}>Get inspired by an AI-generated template.</p>
                </div>
            </div>
            <X style={{ alignSelf: 'flex-start', cursor: 'pointer' }} size={15} />
        </div>
    )
}


export const PostTemplatesHeader = () => {

    return (
        <div className={styles.toolCardHeader}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '9px' }}>
                <div style={{
                    width: '58px', height: '58px', borderRadius: '6px', backgroundColor: '#BFDBFE', alignItems: 'center', justifyContent: 'center'
                    , minHeight: '58px', minWidth: '58px', display:'flex'
                }}>
                    <img src={template} style={{width:'75%', alignSelf:'center'}}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '58px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Post templates</p>
                    <p style={{ fontSize: '16px', color: 'grey' }}>Pick from your saved templates.</p>
                </div>
            </div>
            <X style={{ alignSelf: 'flex-start', cursor: 'pointer' }} size={15} />
        </div>
    )
}

export const UseHashtagsHeader = () => {

    return (
        <div className={styles.toolCardHeader}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '9px' }}>
                <div style={{
                    width: '58px', height: '58px', borderRadius: '6px', backgroundColor: '#e8c3bb', alignItems: 'center', justifyContent: 'center'
                    , minHeight: '58px', minWidth: '58px', display:'flex'
                }}>
                    <div className={styles.hashtagIcon}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '58px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Hashtag groups</p>
                    <p style={{ fontSize: '16px', color: 'grey' }}>Pick from your saved hashtag groups.</p>
                </div>
            </div>
            <X style={{ alignSelf: 'flex-start', cursor: 'pointer' }} size={15} />
        </div>
    )
}

export const VariablesHeader = () => {

    return (
        <div className={styles.toolCardHeader}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '9px' }}>
                <div style={{
                    width: '58px', height: '58px', borderRadius: '6px', backgroundColor: '#c3fbe2', alignItems: 'center', justifyContent: 'center'
                    , minHeight: '58px', minWidth: '58px', display:'flex'
                }}>
                    <div className={styles.variablesIcon}></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '58px' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Variables</p>
                    <p style={{ fontSize: '16px', color: 'grey' }}>Add a variable to your popst.</p>
                </div>
            </div>
            <X style={{ alignSelf: 'flex-start', cursor: 'pointer' }} size={15} />
        </div>
    )
}