import React from 'react';
import {Col, Input, Row, Card, CardBody, CardTitle, Button} from "reactstrap";


export const SubscribeForm = () =>
    <Row>
        <Col md="6">
            <Card body inverse color="dark" className="mx-5">
                <CardBody>
                    <CardTitle><strong>Subribe to Topic</strong></CardTitle>
                    <Input type="text"
                           placeholder={'Enter the Topic'}
                    />

                    <Button color="primary">Subscribe</Button>
                </CardBody>
            </Card>
        </Col>
    </Row>;

