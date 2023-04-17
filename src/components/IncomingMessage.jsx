import { horaMes } from '../helpers/horaMes';

const userImage = `/assets/userImage.png`;

export const IncomingMessage = ({ msg }) => {
    return (
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <img src={ userImage } alt="sunil" />
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{ msg.mensaje }</p>
                    <span className="time_date">{ horaMes( msg.createdAt ) }</span>
                </div>
            </div>
        </div> 
    )
}
