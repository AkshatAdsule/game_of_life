// methods
function toggleButton(id) {
	$(`#${id}`).toggleClass("enabled");
}

// create board
const rows = Math.floor($(window).height() / 22);
const columns = Math.floor($(window).width() / 22);
for (let i = 0; i < rows; i++) {
	for (let j = 0; j < columns; j++) {
		$("#board").append(`<button class="btn" id="${`${i}-${j}`}"> </button>`);
	}
}

// click handler
$(".btn").click(function (e) {
	toggleButton(e.target.id);
});
