import React from 'react';
import './App.css';
import {SubscribeForm} from "./components/SubscribeForm";
import {MessageItem} from "./components/MessageItem";
import Mqtt from 'mqtt';

let client;

export default class App extends React.Component {

    state = {
        topics: [],
        messages: [
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
        const SERVER_URL = process.env.REACT_APP_MQTT_SERVER_URL;
        const USERNAME = process.env.REACT_APP_USERNAME;
        const PASSWORD = process.env.REACT_APP_PASSWORD;

        console.log("using server '%s'", SERVER_URL);

        client = Mqtt.connect('mqtt://' + SERVER_URL, {
            username: USERNAME,
            password: PASSWORD,
            clientId: 'mqttclient_' + Math.random()
        });

        client.on('connect', function () {
            console.log('connected');
            // client.subscribe('voting');
        });

        client.on('message', this.messageHandler);
    }


    render() {
        return (
            <div>
                <h1>WELCOME TO SUBSCRIBER CLIENT</h1>
                <SubscribeForm subscribeHandler={(topic) => this.subscribe(topic)}/>
                {this.state.messages.map((messageItem, i) => <MessageItem key={i}
                                                                         messageItem={messageItem}
                    />
                )}
            </div>
        )
    }

    messageHandler = (topic, message) => {
        console.log("message received over topic '%s'", topic);

        const response = JSON.parse(message);

        this.setState( state => ({
            topics: [...state.topics, response.topic],
            messages: [...state.messages, response.text]
        }));
    };

    subscribe = (topic) => {
        alert(topic);
        //client.subscribe(topic);
    };

    componentWillUnmount() {
        // client.end(true);
    }
}