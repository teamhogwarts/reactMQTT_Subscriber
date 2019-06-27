import React from 'react';
import {Col, Card, CardBody, CardTitle, CardText} from "reactstrap";


export const MessageItem = ({messageItem}) =>
    <Col sm="6">
        <Card body inverse color="dark" className="m-3">
            <CardBody>
                <CardTitle> {messageItem.topic} - {new Date().toLocaleTimeString()} </CardTitle>
                <CardText> {messageItem.text} </CardText>
            </CardBody>
        </Card>
    </Col>;
