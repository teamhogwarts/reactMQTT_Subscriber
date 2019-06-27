import React from 'react';
import {Col, Row, Card, CardBody, CardTitle, CardText, Button} from "reactstrap";


export const MessageItem = ({messageItem}) =>
    <Row>
        <Col sm="6">
            <Card body inverse color="dark">
                <CardBody>
                    <CardTitle> {messageItem.topic} </CardTitle>
                    <CardText> {messageItem.text} </CardText>
                    <CardText> {messageItem.date} </CardText>
                </CardBody>
            </Card>
        </Col>
    </Row>;
