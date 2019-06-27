import React from 'react';
import {Col, Input, Row, Card, CardBody, CardTitle, Button} from "reactstrap";


export const SubscribeForm = (subscribeHandler, topicHandler) =>
    <Row>
        <Col md="6">
            <Card body inverse color="dark" className="mx-5">
                <CardBody>
                    <CardTitle><strong>Subribe to Topic</strong></CardTitle>

                    <Input type="text"
                           placeholder={'Enter the Topic'}
                           name="topic"
                           onChange={e => topicHandler(e.target.value)}
                    />
                    <Button color="primary" onClick={() => subscribeHandler()}>Subscribe</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>;

