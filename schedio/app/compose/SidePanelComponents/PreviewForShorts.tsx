import styles from '../ScssModules/shortdevicepreview.module.scss'
import { useModalStatesContext } from '@/app/layout';
import { Skeleton } from '@/components/ui/skeleton';
import iphoneFrame from '../../assets/iphoneframe.png'
import signalStrength from '../../assets/signal.png'
import battery from '../../assets/image (4).png'
import wifi from '../../assets/image (5).png'

export const PreviewForShorts = () => {
    const { shortVideoForPostData } = useModalStatesContext();

    return (
        <div className={styles.container} style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: 'red' }}>
            <div style={{ position: 'absolute', top: 0, zIndex: 10 }}>
                <img src={iphoneFrame.src} style={{ width: '100%', height: '100%' }} />
            </div>
            <div style={{ position: 'absolute', padding: '5px 12px 5px', top: '21px', left: '25px', width: '333px', height: '720px', zIndex: 1 }}>
                <div style={{ width: '100%', height:'15px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'11px' }}>
                    <div style={{ width: '37%', textAlign: 'center' }}>
                        <p style={{ color: 'white', margin:0, padding:0, lineHeight:'15px'}}>8:19</p>
                    </div>
                    <div style={{ width: '37%', height:'15px', display:'flex', flexDirection:'row', gap:'5px',justifyContent:'center', alignItems:'center' }}>
                        <img src={signalStrength.src} style={{width:'auto', height:'100%'}} />
                        <img src={wifi.src} style={{width:'auto', height:'105%'}} />
                        <img src={battery.src} style={{width:'auto', height:'103%'}} />
                    </div>
                </div>
            </div>
            <div style={{position:'absolute', backgroundColor: 'blue', top: '21px', left: '25px', width: '333px', height: '720px', zIndex: 0}}>
                <video src={shortVideoForPostData.url} style={{width:'100%', height:'100%',}} controls/>
            </div>

        </div>
    )
}