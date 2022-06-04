import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard ({productProp}) {
	console.log(productProp)

	return (
		<Card>
			<Card.Body>
				<Card.Title>{productProp.name}</Card.Title>

				<Card.Subtitle>Description</Card.Subtitle>
				<Card.Text>{productProp.description}</Card.Text>

				<Card.Subtitle>Price:</Card.Subtitle>
				<Card.Text>₱ {productProp.price}</Card.Text>

				<Button as={Link} to={`/products/${productProp._id}`}>Details</Button>
			</Card.Body>
		</Card>
	);
};