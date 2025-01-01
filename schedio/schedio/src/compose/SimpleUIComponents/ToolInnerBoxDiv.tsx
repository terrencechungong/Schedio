import styles from '../ScssModules/compose.module.scss';


interface ToolInnerBoxDivInput {
    variable: {
        addedDate: string;
        name: string;
        description: string;
    };
    setVar: () => void;
    isSelected: boolean;
}



export const VariablesBoxDiv: React.FC<ToolInnerBoxDivInput> = ({variable, setVar, isSelected}) => {


    return (
        <div className={`${styles.toolBoxDashDiv} transition-transform duration-200 transform hover:scale-105 rounded-md bg-[#eff6ff] BORDER`}
        style={{border: isSelected ? '1px solid hsl( 263.4, 70%, 50.4%)' : '2px dashed lightgray'}}
        onClick={() => setVar()}
      >
        {/* Truncate function */}
        <p style={{ color: '#425466' }}>{variable.addedDate}</p>
        <p style={{ color: '#2d3748', fontSize: '18px' }}>
          <span style={{ color: '#67707f' }}>{`{{ `}</span>
          <span style={{ fontWeight: 'bold' }}>{variable.name}</span>
          <span style={{ color: '#67707f' }}>{` }}`}</span>
        </p>
        <p style={{ color: '#2d3748', textAlign: 'center', maxWidth: '270px' }}>{variable.description}</p>
      </div>
    )
}