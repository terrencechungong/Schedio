import { truncateString } from '@/app/utilFunctions';
import styles from './ScssModules/compose.module.scss';


interface ToolInnerBoxDivInput {
    lineOne: string;
    lineTwo: string;
    lineThree: string;
}



export const ToolInnerBoxDiv: React.FC<ToolInnerBoxDivInput> = ({lineOne, lineTwo, lineThree}) => {


    return (
        <div className={`${styles.toolBoxDashDiv} rounded-md bg-[#eff6ff]`} style={{ width: '160px', border: '2px dashed lightgrey', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', flex: '0 0 auto' }}>
            <p style={{ color: '#425466' }}>{lineOne}</p>
            <p style={{ color: '#2d3748', fontSize: '18px' }}>
                <span style={{ color: '#67707f' }}>{`{{ `}</span>
                <span style={{ fontWeight: 'bold' }}>{lineTwo}</span>
                <span style={{ color: '#67707f' }}>{` }}`}</span>
            </p>
            <p style={{ color: '#2d3748' }}>{truncateString(lineThree, 63)}</p>
        </div>
    )
}