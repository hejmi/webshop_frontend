import React, {Component} from "react";
import ChatBot from "react-simple-chatbot";

export class Contact extends Component {
    render() {
        const steps = [
            {
                id: '0',
                message: 'Hello! Welcome to GeekSueek\'s chatbot!',
                trigger: '1'
            },
            {
                id: '1',
                message: 'How can I help you?'
            },
        ];
        return (
            <div className="contact">
                <div className="container">
                        <div className="container">

                            <ChatBot steps={steps} />

                        </div>

                </div>
            </div>
        )
    }
}
export default Contact
