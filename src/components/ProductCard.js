import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard ({productProp}) {
	console.log(productProp)

	return (
		<Container className="my-5">
			<Row>
				<Col xs={12} md={6}>
					<img 
						className="productImage"
						src={productProp.imageLink} 
						alt="product image" />
				</Col>

				<Col xs={12} md={6}>
					<Card className="cardHighlight">
						<Card.Body>
							<Card.Title>{productProp.name}</Card.Title>

							<Card.Subtitle>Description</Card.Subtitle>
							<Card.Text>{productProp.description}</Card.Text>

							<Card.Title>Price:</Card.Title>
							<Card.Title>₱ {productProp.price}</Card.Title>

							<style type="text/css">
							    {`
							    	.btn-flat {
							    		background-color: purple;
							    		color: white;
							    	}

							    	.btn-xxl {
							    		padding: 1rem 1.5rem;
							    		font-size: 1.5rem;
							    	}
							    `}
							</style>
							<Button variant="flat" as={Link} to={`/products/${productProp._id}`}>Add to Cart</Button>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};