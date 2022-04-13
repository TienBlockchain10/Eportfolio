import React, { useEffect, useState } from 'react';
import { Accordion, Alert, Button, Col, Container, Image, Row } from "react-bootstrap";
import { buyNFT, getMaxSupply, getTotalSupply } from "../../network/ethereum";
import { style } from "./Home.styles";

// Images
import Logo from '../../images/Logo.jpg';

type Props = {
    currentAccount?: string;
}

const Home: React.FC<Props> = ({ currentAccount }) => {
    const [tokenLeft, setTokenLeft] = useState<number | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSupply = async () => {
            const totalSupply = await getTotalSupply();
            const maxSupply = await getMaxSupply();
            setTokenLeft(maxSupply - totalSupply);
        }
        fetchSupply();
    }, []);

    const onBuyClick = async (e: React.MouseEvent<HTMLElement>) => {
        setError(false);
        if (!currentAccount) {
            alert("You haven't connect your wallet yet!")
        } else {
            try {
                await buyNFT();
            } catch (err) {
                setError(true);
            }
        }
    }

    return (
        <div>
            {style}
            <Container className="mt-5">
                <Row className="align-items-center">
                    <Col lg={6} md={12}>
                        <Row>
                            <Image
                                src={Logo}
                            />
                        </Row>
                    </Col>
                    <Col lg={6} md={12} className="text-center">
                        <Row>
                            <h1 className="text-black">Tien Nguyen</h1>
                        </Row>
                        <Row className="mt-3">
                            <h5 className="text-body">
                                Aspiring Web 3.0 Developer. Discover more about me in the FAQs below!
                            </h5>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Col lg={6} md={12}>
                        <Row>
                            <Col className="d-flex justify-content-md-center">
                                {tokenLeft && tokenLeft === 0 &&
                                <h1>Sold out!</h1>
                                }
                                {tokenLeft && tokenLeft > 0 &&
                                <h1>{tokenLeft} token{tokenLeft > 1 && 's'} left!</h1>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-md-center"
                                 lg={12}>
                                <Button
                                    className="buy-button"
                                    variant="flat"
                                    onClick={onBuyClick}>
                                    Buy now!
                                </Button>
                            </Col>
                            {error &&
                            <Col className="mt-3 d-flex justify-content-md-center"
                                 lg={12}>
                                <Alert variant="danger">
                                    Transaction failed!
                                </Alert>
                            </Col>
                            }
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <h1 id="faq">Frequently Asked Questions (FAQ)</h1>
                    <Accordion flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Who is Tien Nguyen?</Accordion.Header>
                            <Accordion.Body>
                               I am an Honors Computer Science Student at Lamar University. Also, I am the Co-Founder/Vice President of 
                               Blockchain Student Society (BSS) and an aspiring Full-Stack Smart Contract Developer! 
                            
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>What technologies/languages do you know?</Accordion.Header>
                            <Accordion.Body>
                                 I have experience in JavaScript, Java, React, and Solidity, with a strong grasp of Solidity and Java.
                                  I aim to be a Full-Stack Smart Contract Developer for Ethereum and Layer 2's
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>What is Blockchain Student Society?</Accordion.Header>
                            <Accordion.Body>
                            BSS is a non-profit organization focused on bringing primarily students, but also professors 
                                 and anyone crypto-curious into the space safely and efficiently. We aim to be a "sandbox-like"
                                 environment for blockchain/crypto enthusiast as well as introducing Blockchain Tech to 
                                 education institutions.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>What is this "Connect Wallet" and "buy" button?</Accordion.Header>
                            <Accordion.Body>
                            I've included a cool little feature for minting a FREE NFT on the Ethereum Test-Net with my NFT Smart Contract.
                                 To mint this NFT you must...
                                <ul>
                                    <li>Install Metamask wallet to your browser first.</li>
                                    <li>Click "connect wallet" and approve withing the Metamask Popup.</li>
                                    <li>Then you may mint an NFT for the price of 0.1 Test-Net Ether (make sure to save some for gas).</li>
                                    <li>Finally, you can view the NFT in the "Your Token" section.</li>
                                </ul>
                                To find more info on this NFT Smart Contract, please go to the "Projects" Section.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            </Container>
        </div>
    )
}

export default Home;