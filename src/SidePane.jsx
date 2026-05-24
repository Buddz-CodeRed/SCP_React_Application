import RecordDetails from "./RecordDetails"


export default function SidePane({recordData, onOpenFull}) {

    if (!recordData) {
            return(
                <div className="side-pane">Select a Record</div>
            )
        }

    return(
        <div className={`side-pane ${recordData ? 'open' : ''}`}>
                <div className='detail-item'>{recordData.item}</div>
            <img src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${recordData.image}`} className='detail-image' alt="SCP Image" />
            {/* meta data */}
            <div className="detail-meta">
                <div className="detail-meta-row">
                    <span className="detail-key">ITEM#:</span>
                    <span className="detail-value">{recordData.item}</span>
                </div>
                <div className="detail-meta-row">
                    <span className="detail-key">OBJECT CLASS:</span>
                    <span className="detail-value ob_class">{recordData.object_class}</span>
                </div>
            </div>
            {/* description */}
            <div className="detail-section">
                <div className="detail-section-title">Description</div>
                <p className="detail-section-text">
                    {recordData.description}
                </p>
            </div>
            <div className="side-pane-btn">
                <button onClick={() => onOpenFull(<RecordDetails/>)}>View full details</button>
            </div>
        </div>
    )
}