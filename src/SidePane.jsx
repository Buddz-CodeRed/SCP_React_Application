import './assets/SidePane.css'
import { X } from 'lucide-react'


export default function SidePane({recordData, onOpenFull, onClose}) {


    if (!recordData) {
            return(
                <div className="side-pane">No Data Received</div>
            )
        }
        console.log(recordData)

    return(
        <div className={`side-pane ${recordData ? 'open' : ''}`}>
            <span className='pane-item'>{recordData.item}</span>
            <button className='pane-close' onClick={onClose}><X /></button>
            <img src={`https://gjhshavljufiktsguwpw.supabase.co/storage/v1/object/public/image/${recordData.image}`} className='pane-image' alt="SCP Image" />
            {/* meta data */}
            <div className="pane-meta">
                <div className="pane-meta-row">
                    <span className="pane-key">ITEM#:</span>
                    <span className="pane-value">{recordData.item}</span>
                </div>
                <div className="pane-meta-row">
                    <span className="pane-key">NAME:</span>
                    <span className="pane-value">{recordData.name}</span>
                </div>
                <div className="pane-meta-row">
                    <span className="pane-key">OBJECT CLASS:</span>
                    <span className="pane-value pane_ob_class">{recordData.object_class}</span>
                </div>
                <div className="pane-meta-row">
                    <span className="pane-key">RATING:</span>
                    <span className="pane-value rating">+{recordData.rating}</span>
                </div>
            </div>

            {/* description */}
            <div className="pane-section">
                <div className="pane-section-title">Description</div>
                <p className="pane-section-text">
                    {recordData.description}
                </p>
            </div>
            <div className="pane-btn-container">
                <button className="view-record" onClick={() => onOpenFull(recordData.id)}>View full details</button>
            </div>
        </div>
    )
}