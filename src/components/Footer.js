import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
	return (
		<div className="bg-dark text-white">
			<Container>
				<Row>
					<Col xs={12} md={3} className="my-5">	
						<h5 className="text-info">Shop</h5>
						<h6>GLUStore</h6>
						<h6>GLUCafe</h6>
						<h6>Store Locator</h6>
						<h6>Purchase Programs</h6>
						<h6>Education</h6>
						<h6>Exclusives</h6>
						<h6>GLUStore Rewards</h6>
						<h6>Newsletter</h6>
					</Col>
				
					<Col xs={12} md={3} className="my-5">	
						<h5 className="text-info">Explore</h5>
						<h6>Technology</h6>
						<h6>Chroma RGB</h6>
						<h6>Concepts</h6>
						<h6>Esports</h6>
						<h6>Collabs</h6>
					</Col>
				
					<Col xs={12} md={3} className="my-5">	
						<h5 className="text-info">Support</h5>
						<h6>Get Help</h6>
						<h6>Registration & Warranty</h6>
						<h6>Online Store</h6>
						<h6>GLUCare</h6>
						<h6>Manage GLU ID</h6>
						<h6>Support Videos</h6>
						<h6>Accessibility Statement</h6>
					</Col>
				
					<Col xs={12} md={3} className="my-5">	
						<h5 className="text-info">Company</h5>
						<h6>About Us</h6>
						<h6>Careers</h6>
						<h6>Press Room</h6>
						<h6>Investor Relations</h6>
						<h6>Ventures</h6>
						<h6>Contact Us</h6>
					</Col>
				</Row>
			</Container>

			<Container className="my-4">
				<Col className="text-center">
					<a href="https://facebook.com" target="_blank">
						<img className="mx-2" src="https://imgur.com/wD8g1sh.png" alt="facebook" title="Facebook" />
					</a>

					<a href="https://instagram.com" target="_blank">
						<img className="mx-2" src="https://imgur.com/r0XiYuu.png" alt="instagram" title="Instagram" />
					</a>

					<a href="https://twitter.com" target="_blank">
						<img className="mx-2" src="https://imgur.com/WLYY8bC.png" alt="twitter" title="Twitter" />
					</a>
				</Col>
			</Container>

			<h6 className="ms-auto text-center">Copyright @ 2022 Carlo Cruz. All rights reserved.</h6>
		</div>
	);
};