import { Carousel } from 'react-bootstrap';

export default function Slides() {
	return (
		<Carousel className="my-5">
			<Carousel.Item>
			    <img
			    	className="d-block w-100"
			    	style={{ height: 500 }}
			    	src="https://imgur.com/ikG6CtT.jpg"
			    	alt="First slide"
			    />
			</Carousel.Item>

			<Carousel.Item>
			    <img
			    	className="d-block w-100"
			    	style={{ height: 500 }}
			    	src="https://imgur.com/J2sYQBj.jpg"
			    	alt="Second slide"
			    />
			</Carousel.Item>

			<Carousel.Item>
			    <img
			    	className="d-block w-100"
			    	style={{ height: 500 }}
			    	src="https://imgur.com/QPJuIFL.jpg"
			    	alt="Third slide"
			    />
			</Carousel.Item>

			<Carousel.Item>
			    <img
			    	className="d-block w-100"
			    	style={{ height: 500 }}
			    	src="https://imgur.com/G4TH0wM.jpg"
			    	alt="Fourth slide"
			    />
			</Carousel.Item>

			<Carousel.Item>
			    <img
			    	className="d-block w-100"
			    	style={{ height: 500 }}
			    	src="https://imgur.com/FZpHg8Q.jpg"
			    	alt="Fifth slide"
			    />
			</Carousel.Item>
		</Carousel>
	);
};