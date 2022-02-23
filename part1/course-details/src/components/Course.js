import React from "react";
import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
	return (
		<>
			{course.map((e) => (
				<div key={e.id}>
					<Header header={e.name} />
					<Content content={e.parts} />
				</div>
			))}
		</>
	);
};

export default Course;
