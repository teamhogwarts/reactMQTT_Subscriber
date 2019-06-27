import React from 'react';
import './App.css';
import {SubscribeForm} from "./components/SubscribeForm";
import {MessageItem} from "./components/MessageItem";


export default class App extends React.Component {

    state = {
        topics: [],
        message: [
            {
                topic: "News",
                text: "Whatzuuup!"
            },
            {
                topic: "Jobs",
                text: "Keine für dich!"
            }
        ]
    }

    componentDidMount() {


    }


    render() {
        return (
            <div>
                <h1>Eingabe</h1>
                <SubscribeForm/>
                {this.state.message.map((messageItem, i) => <MessageItem key={i}
                                                                         messageItem={messageItem}
                    />
                )}
            </div>
        )
    }


}