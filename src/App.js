import React from 'react';
import './App.css';
import {Row} from "reactstrap";

import {SubscribeForm} from "./components/SubscribeForm";
import {MessageItem} from "./components/MessageItem";
import Mqtt from 'mqtt';
import {SubscribeList} from "./components/SubscribeList";

let client;

export default class App extends React.Component {

    state = {
        newTopic: "",
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
    };

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
                <Row>
                    <SubscribeForm subscribeHandler={this.subscribe}
                                   topicHandler={e => this.topicHandler(e)}
                    />

                    <SubscribeList allTopics={this.state.topics}
                                   unsubscribeHandler={e => this.unsubscribeHandler(e)}
                    />

                </Row>
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

        this.setState(state => ({
            topics: [...state.topics, response.topic],
            messages: [...state.messages, response]
        }));
    };

    topicHandler = (topic) => {
        this.setState({
            newTopic: topic
        })
    };

    subscribe = () => {
        const topic = this.state.newTopic;

        this.setState(state => ({
            topics: [...state.topics, topic],
            newTopic: ""
        }));
        client.subscribe(topic);
    };

    unsubscribeHandler = (topic) => {
        console.log("unsubscribed " + topic);
        client.unsubscribe(topic)
    }

    componentWillUnmount() {
        // client.end(true);
    }
}