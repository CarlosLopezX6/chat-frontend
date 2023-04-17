import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export const ChatSelect = () => {
    return (
        <div className="middle-screen">
            <div className="alert-primary pb-3">
                <hr />
                <HiOutlineChatBubbleLeftRight style={{fontSize: '50px'}}/>
                <h3>Selecciona a una persona</h3>
                <span>Para iniciar una conversación</span>
            </div>
        </div>
    )
}
