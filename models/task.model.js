class Task{
	id;
	title;
	teacher;
	points;
	place;
	date;
	description;

	constructor(
		id,
		title,
		teacher,
		points,
		place,
		date,
		description,
	){
		this.id = id;
		this.title = title;
		this.teacher = teacher;
		this.points = points;
		this.place = place;
		this.date = date;
		this.description = description;
	}
}

export default Task