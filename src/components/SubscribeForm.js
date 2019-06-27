import React from 'react';
import {Col, Input, Row, Card, CardBody, CardTitle} from "reactstrap";


export const SubscribeForm = (subscribeHandler) =>
    <Row>
        <Col md="6">
            <Card body inverse color="dark" className="mx-5">
                <CardBody>
                    <CardTitle><strong>Subribe to Topic</strong></CardTitle>
                    <form onSubmit={(topic) => subscribeHandler(topic)}>
                        <Input type="text"
                               placeholder={'Enter the Topic'}
                               name="topic"
                        />
                        <Input color="primary" type="submit" value="Subscribe"/>
                    </form>
                </CardBody>
            </Card>
        </Col>
    </Row>;

