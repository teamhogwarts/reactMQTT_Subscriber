import React from 'react';
import {Col, Input, Card, CardBody, CardTitle, Button} from "reactstrap";

export const SubscribeForm = ({subscribeHandler, topicHandler}) =>
    <Col md="8">
        <Card body inverse color="dark" className="mx-5">
            <CardBody>
                <CardTitle><strong>Subscribe to Topic</strong></CardTitle>
                <Input id='inputText'
                       type="text"
                       placeholder={'Enter the Topic'}
                       name="topic"
                       onChange={e => topicHandler(e.target.value)}
                />
                <Button color="primary"
                        onClick={() => subscribeHandler()}>Subscribe</Button>
            </CardBody>
        </Card>
    </Col>;