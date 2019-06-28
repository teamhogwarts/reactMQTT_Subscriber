import React from 'react';
import {Row} from "reactstrap";
import {SubscribeForm} from "./components/SubscribeForm";
import {MessageItem} from "./components/MessageItem";
import Mqtt from 'mqtt';
import {SubscribeList} from "./components/SubscribeList";

let client;

export default class App extends React.Component {

    state = {
        newTopic: '',
        topics: [],
        messages: [
            {
                time: "14:33:12",
                topic: "News",
                text: "Trump is new president!"
            },
            {
                time: "17:13:55",
                topic: "Jobs",
                text: "No jobs available at the moment"
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
            console.log('connected with mqtt server ' + SERVER_URL);
        });

        client.on('message', this.messageHandler);
    }

    render() {
        return (
            <div>
                <h1>WELCOME TO SUBSCRIBER CLIENT</h1>
                <Row>
                    <SubscribeForm subscribeHandler={this.subscribeToTopic}
                                   topicHandler={e => this.topicHandler(e)}
                    />

                    <SubscribeList allTopics={this.state.topics}
                                   unsubscribeHandler={e => this.unsubscribeHandler(e)}
                    />

                </Row>
                <Row>
                    {this.state.messages.map((messageItem, i) =>
                        <MessageItem key={i}
                                     messageItem={messageItem}
                        />
                    )}
                </Row>
            </div>
        )
    }

    messageHandler = (topic, message) => {
        console.log("message received over topic '%s'", topic);

        let response = JSON.parse(message);
        response.time = new Date().toLocaleTimeString();

        this.setState(state => ({
            messages: [...state.messages, response]
        }));
    };

    topicHandler = (topic) => {
        this.setState({
            newTopic: topic
        })
    };

    subscribeToTopic = () => {

        if (!this.state.topics.includes(this.state.newTopic)
            && this.state.newTopic.length > 0) {

            const topic = this.state.newTopic;

            this.setState(state => ({
                topics: [...state.topics, topic],
                newTopic: ""
            }));

            client.subscribe(topic);
            console.log("subscribed to topic: " + topic)

        } else {
            console.log("already to topic subscribed: " + this.state.newTopic);
        }
    };

    unsubscribeHandler = (topic) => {
        console.log("unsubscribed from topic: " + topic);
        const index = this.state.topics.indexOf(topic);

        let currentTopics = [...this.state.topics];
        currentTopics.splice(index, 1);

        this.setState({
            topics: currentTopics
        });

        client.unsubscribe(topic)
    };

    componentWillUnmount() {
        client.end(true);
    }
}