class Task{
	id;
	title;
	teacher;
	points;
	place;
	date;
	description;
	subject;

	constructor(
		id,
		title,
		teacher,
		points,
		place,
		date,
		description,
		subject,
	){
		this.id = id;
		this.title = title;
		this.teacher = teacher;
		this.points = points;
		this.place = place;
		this.date = date;
		this.description = description;
		this.subject = subject;
	}
}

export default Task