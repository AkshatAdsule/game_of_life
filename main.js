// create board
const rows = Math.floor(($(window).height() * 0.95) / 22);
const columns = Math.floor($(window).width() / 22);
for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
		$("#board").append(`<button class="btn" id="${`${i}-${j}`}"> </button>`);
	}
}

let tickInterval;

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
			return `<button class="btn enabled" id="${id}"> </button>`;
		} else {
			return `<button class="btn" id="${id}"> </button>`;
		}
	} else {
		if (alive_neighbors.length === 3) {
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
	drawBoard(newButtons);
}

// click handler
$(".btn").click(function (e) {
	toggleButton(e.target.id);
});

// game start
$("#start").click(function (e) {
	tickInterval = setInterval(start, 10);
});

$("#stop").click(function () {
	clearInterval(tickInterval);
});
