window.timerAPI.onTimerUpdate((event, content) => {
	document.getElementById("demo").innerHTML = content;
})

document.getElementById('start_button').addEventListener('click', () => {
	const input = document.getElementById("input_time").value;
	window.timerAPI.processInput(input);
});

document.getElementById('input_time').addEventListener('keypress', (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("start_button").click();
	}
});
