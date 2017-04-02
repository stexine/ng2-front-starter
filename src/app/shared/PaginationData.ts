export class PaginationData {
	current_page: number;
	data: any[];
	from: number;
	to: number;
	last_page: number;
	per_page: number;
	total: number;

	constructor() {
		this.current_page = 1;
		this.from = 1;
		this.to = 1;
		this.last_page = 1;
		this.per_page = 20;
		this.total = 0
	}
}