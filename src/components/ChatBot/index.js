import React from "react";
import bot from "../../assets/imageBot.png";

function ChatBot(){
    return (
        <>
            <df-messenger
                chat-icon={bot}
                intent="WELCOME"
                chat-title="ChatBot_MãeVacina"
                agent-id="54a241cd-ffcc-44ca-b9c7-a32778ad1977"
                language-code="pt-br"
            ></df-messenger>
        </>
    )
}

export default ChatBot;