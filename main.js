// create board
const rows = Math.floor($(window).height() / 22);
const columns = Math.floor($(window).width() / 22);
for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
		$("#board").append(`<button class="btn" id="${`${i}-${j}`}"> </button>`);
	}
}

// methods
function toggleButton(id) {
	$(`#${id}`).toggleClass("enabled");
}

// returns a new button based on previous state
function tick(id) {
	const alive = $(`#${id}`).hasClass("enabled");
	const [rowStr, colStr] = id.split("-");
	const row = parseInt(rowStr);
	const col = parseInt(colStr);
	const neighbors = [
		$(`#${row}-${col - 1}`),
		$(`#${row}-${col + 1}`),
		$(`#${row + 1}-${col - 1}`),
		$(`#${row + 1}-${col}`),
		$(`#${row + 1}-${col + 1}`),
		$(`#${row - 1}-${col - 1}`),
		$(`#${row - 1}-${col}`),
		$(`#${row - 1}-${col + 1}`),
	];
	const alive_neighbors = neighbors.filter((neighbhor) => {
		try {
			return neighbhor[0].className === "btn enabled";
		} catch (error) {
			return false;
		}
	});
	// rules
	if (alive) {
		if (alive_neighbors.length === 2 || alive_neighbors.length === 3) {
			console.log(id + " will be alive");
			return `<button class="btn enabled" id="${id}"> </button>`;
		} else {
			console.log(id + " will be dead");
			return `<button class="btn" id="${id}"> </button>`;
		}
	} else {
		if (alive_neighbors.length === 3) {
			console.log(id + " will be alive");
			return `<button class="btn enabled" id="${id}"> </button>`;
		} else {
			return `<button class="btn" id="${id}"> </button>`;
		}
	}
}

function drawBoard(buttons) {
	$("#board").empty();
	for (let i = 0; i < rows * columns; i++) {
		$("#board").append(buttons[i]);
	}
}

function start() {
	let newButtons = [];
	$(".btn").each(function (i, obj) {
		newButtons.push(tick(obj.id));
	});
	console.log(newButtons);
	drawBoard(newButtons);
}

// click handler
$(".btn").click(function (e) {
	toggleButton(e.target.id);
});

// game start
$(window).keydown(function (e) {
	e.keyCode === 13 && start();
});
