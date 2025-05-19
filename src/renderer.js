let setting_toast_notification = document.getElementById('setting_toast_notification');
let setting_play_sound = document.getElementById('setting_play_sound');
let setting_always_on_top = document.getElementById('setting_always_on_top');

window.timerAPI.onTimerUpdate((event, content) => {
	document.getElementById("demo").innerHTML = content;
})

document.getElementById('start_button').addEventListener('click', () => {
	const input = document.getElementById("input_time").value;
	window.timerAPI.processInput(input);
});

setting_toast_notification.addEventListener('change', () => {
	let value = false;
	if (setting_toast_notification.checked)
	{
		value = true;
	}
	window.settingsAPI.onToggle_ToastNoticiation(value)
});

setting_play_sound.addEventListener('change', () => {
	let value = false;
	if (setting_play_sound.checked)
	{
		value = true;
	}
	window.settingsAPI.onToggle_PlaySound(value)
});

setting_always_on_top.addEventListener('change', () => {
	let value = false;
	if (setting_always_on_top.checked)
	{
		value = true;
	}
	window.settingsAPI.onToggle_AlwaysOnTop(value)
});

document.getElementById('input_time').addEventListener('keypress', (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("start_button").click();
	}
});
