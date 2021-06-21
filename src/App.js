import React from "react";
import { Container, Row, Col, Navbar, Form, Card, InputGroup, Alert } from "react-bootstrap";

function App() {
  const [p, setP] = React.useState(0);
  const [f, setF] = React.useState(0);
  const [V1, setV1] = React.useState(0);
  const [vsc, setVsc] = React.useState(0);
  const [isc, setIsc] = React.useState(0);
  const [psc, setPsc] = React.useState(0);
  const [vdc, setVdc] = React.useState(0);
  const [idc, setIdc] = React.useState(0);

  const [rm, setRm] = React.useState(0);

  const [connection, setConnection] = React.useState("star");

  const [rdc, setRdc] = React.useState(0);
  const [re, setRe] = React.useState(null);

  const [answer, setAnswer] = React.useState(0);

  React.useEffect(() => {
    if (isNaN(p)) {
      setP(0);
    } if (isNaN(f)) {
      setF(0);
    } if (isNaN(V1)) {
      setV1(0);
    } if (isNaN(vsc)) {
      setVsc(0);
    } if (isNaN(isc)) {
      setIsc(0);
    } if (isNaN(psc)) {
      setPsc(0);
    } if (isNaN(vdc)) {
      setVdc(0);
    } if (isNaN(idc)) {
      setIdc(0);
    }
  }, [p, f, V1, vsc, isc, psc, vdc, idc]);

  React.useEffect(() => {
    if (isNaN(vdc) || isNaN(idc)) {
      return setRm(0);
    }
    setRm(vdc / idc);
  }, [vdc, idc]);

  React.useEffect(() => {
    if (isNaN(rm)) {
      return setRdc(0);
    }
    if (connection === "star") {
      return setRdc(rm / 2);
    } else {
      return setRdc((3 * rm) / 2);
    }
  }, [rm, connection]);

  React.useEffect(() => {
    if (isNaN(rdc)) {
      return setRe(null);
    }
    setRe(1.2 * rdc);
  }, [rdc]);

  React.useEffect(() => {
    if (isNaN(re)) {
      return setAnswer(0);
    } if (isNaN(V1)) {
      return setAnswer(0);
    } if (isNaN(f)) {
      return setAnswer(0);
    } if (isNaN(isc)) {
      return setAnswer(0);
    } if (isNaN(p)) {
      return setAnswer(0);
    } if (isNaN(psc)) {
      return setAnswer(0);
    } if (isNaN(vsc)) {
      return setAnswer(0);
    }
    let statorSpeed = (2 * f * 2 * Math.PI) / p;
    let rtotal = psc / (Math.pow(isc, 2) * 3);
    let r2 = rtotal - re;
    let z = vsc / isc;
    let x = Math.sqrt(Math.pow(z, 2) - Math.pow(rtotal, 2));
    let startingTorque = (3 / statorSpeed) * r2 * (Math.pow(V1, 2) / (Math.pow(re + r2, 2) + Math.pow(x, 2)));
    setAnswer(startingTorque);
  }, [re, V1, f, isc, p, psc, vsc]);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Calculation of Starting Torque</Navbar.Brand>
      </Navbar>
      <Container>
        <Form>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>Enter Parameters</Card.Title>
                  <Card.Text>
                    <Alert variant="dark">
                      <small>Assumption: Turns of stator/rotor winding = 1</small>
                    </Alert>
                    <Form.Group as={Row} controlId="poles">
                      <Form.Label column>Poles</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={p} onChange={ev => setP(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="supplyFreq">
                      <Form.Label column>Supply Frequency</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={f} onChange={ev => setF(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">Hz</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="inputVolt">
                      <Form.Label column>Input Voltage</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={V1} onChange={ev => setV1(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">V</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>Enter Short Circuit Test Data</Card.Title>
                  <Card.Text>
                    <Alert variant="dark">
                      <small>Assumption : short circuit test results are taken
                        neglecting the shunt branch parameters</small>
                    </Alert>
                    <Form.Group as={Row} controlId="scv">
                      <Form.Label column>Short Circuit Voltage</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={vsc} onChange={ev => setVsc(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">V</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="scc">
                      <Form.Label column>Short Circuit Current</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={isc} onChange={ev => setIsc(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">A</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="wattread">
                      <Form.Label column>Wattmeter reading</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={psc} onChange={ev => setPsc(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">W</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>Enter Load Test Data</Card.Title>
                  <Card.Text>
                    <Form.Group as={Row} controlId="dcvolt">
                      <Form.Label column>dc Voltage</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={vdc} onChange={ev => setVdc(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">V</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="dcCurrent">
                      <Form.Label column>dc Current</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={idc} onChange={ev => setIdc(ev.target.valueAsNumber)} type="number" placeholder="0" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">A</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title>Effective resistance of stator:</Card.Title>
                  <Card.Text>
                    <Form.Group as={Row} controlId="dcvolt">
                      <Form.Label column>Measured Resistance: Vdc/Idc</Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control readOnly value={rm} type="number" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">Ω</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Form.Group>
                    <div className="mb-3">
                      <Form.Check name="windingtype" inline type="radio">
                        <Form.Check.Input checked={connection === "star"} onChange={ev => ev.target.checked && setConnection("star")} name="windingtype" type="radio" />
                        <Form.Check.Label>
                          <small>star connected stator winding</small>
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check name="windingtype" inline type="radio">
                        <Form.Check.Input checked={connection === "delta"} onChange={ev => ev.target.checked && setConnection("delta")} name="windingtype" type="radio" />
                        <Form.Check.Label>
                          <small>delta connected stator winding</small>
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  </Form.Group>
                  <Form.Group as={Row} controlId="dcvolt">
                    <Form.Label column>Rdc (per phase)</Form.Label>
                    <Col>
                      <InputGroup>
                        <Form.Control value={rdc} readOnly type="number" />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">Ω</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Group>
                  {re ? <Form.Group as={Row} controlId="dcvolt">
                    <Form.Label column>Effective Resistance = </Form.Label>
                    <Col>
                      <InputGroup>
                        <Form.Control value={re} readOnly type="number" />
                        <InputGroup.Append>
                          <InputGroup.Text id="basic-addon2">Ω</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Form.Group> : ""}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "20px", marginBottom: "10px" }}>
            <Col>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Text>
                    <Form.Group as={Row} controlId="dcvolt">
                      <Form.Label column>Starting Torque = </Form.Label>
                      <Col>
                        <InputGroup>
                          <Form.Control value={answer} readOnly type="number" />
                          <InputGroup.Append>
                            <InputGroup.Text id="basic-addon2">N-m</InputGroup.Text>
                          </InputGroup.Append>
                        </InputGroup>
                      </Col>
                    </Form.Group>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default App;
