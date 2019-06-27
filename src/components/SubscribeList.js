import React from 'react';
import {Col, Button} from "reactstrap";

export const SubscribeList = ({allTopics, unsubscribeHandler}) =>
    <Col sm="4">
        <h3>Topics List</h3>
        <div>
            {allTopics.map((topicItem, i) =>
                <li key={i}>
                    {topicItem}
                    {"  <--  "}
                    <Button onClick={() => unsubscribeHandler(topicItem)}> Unsubscribe</Button>
                </li>)}
        </div>
    </Col>;
