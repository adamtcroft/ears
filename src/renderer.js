let start_button = document.getElementById('start_button');
let start_button_color_class = "bg-lime-500";
let start_button_color_class_hover = "hover:bg-lime-400";
let stop_button_color_class = "bg-red-500";
let stop_button_color_class_hover = "hover:bg-red-400";
let setting_toast_notification = document.getElementById('setting_toast_notification');
let setting_play_sound = document.getElementById('setting_play_sound');
let setting_always_on_top = document.getElementById('setting_always_on_top');
let setting_custom_sound_path = document.getElementById('custom_sound_path');
let setting_custom_sound_path_label = document.getElementById('custom_sound_path_label');
let update_dialog = document.getElementById("updateDialog");

window.timerAPI.onTimerUpdate((event, content) => {
	document.getElementById("demo").innerHTML = content;
});

window.updateAPI.onUpdateAvailable((event, value) => {
	console.log("renderer update function");
	//update_dialog.showModal();
});

window.settingsAPI.loadSettings((event, settings) => {
	if (settings.toast_notification)
	{
		setting_toast_notification.checked = true;
	}
	if (settings.play_sound)
	{
		setting_play_sound.checked = true;
	}
	if (settings.always_on_top)
	{
		setting_always_on_top.checked = true;
	}
	if (settings.custom_sound_path != null)
	{
		//custom_sound_path_label.innerHTML = settings.custom_sound_path;
		custom_sound_path_label.innerHTML = "Custom Sound is Set";
	}
});

start_button.addEventListener('click', () => {
	const input = document.getElementById("input_time").value;
	if (start_button.innerHTML === "Start")
	{
		if (isNaN(input))
		{
			window.timerAPI.processInput(input);
			start_button.innerHTML = "Stop"
			start_button.classList.remove(start_button_color_class);
			start_button.classList.remove(start_button_color_class_hover);
			start_button.classList.add(stop_button_color_class);
			start_button.classList.add(stop_button_color_class_hover);
		}
	}
	else if (start_button.innerHTML === "Stop")
	{
		window.timerAPI.onTimerStop();
		start_button.innerHTML = "Start"
		start_button.classList.remove(stop_button_color_class);
		start_button.classList.remove(stop_button_color_class_hover);
		start_button.classList.add(start_button_color_class);
		start_button.classList.add(start_button_color_class_hover);
	}

});

setting_toast_notification.addEventListener('change', () => {
	console.log("toast!");
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

setting_custom_sound_path.addEventListener('change', () => {
	if (setting_custom_sound_path.files.length === 1)
	{
		console.log(setting_custom_sound_path.files[0]);
		window.settingsAPI.onSet_CustomSound(setting_custom_sound_path.files[0]);
	}
});

document.getElementById('input_time').addEventListener('keypress', (event) => {
	if (event.key === "Enter") {
		event.preventDefault();
		document.getElementById("start_button").click();
	}
});
