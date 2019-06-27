import React from 'react';
import {Col, Card, CardBody, CardTitle, CardText} from "reactstrap";


export const MessageItem = ({messageItem}) =>
    <Col sm="6">
        <Card body inverse color="dark">
            <CardBody>
                <CardTitle> {messageItem.topic} </CardTitle>
                <CardText> {messageItem.text} </CardText>
            </CardBody>
        </Card>
    </Col>;
