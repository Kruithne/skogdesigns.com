var slider = {
	_speed: 400,
	_index: 0,
	slides: {
		heroes: {
			title: 'Heroes of the Storm Business Cards',
			text: 'Heroes of the Storm themed business cards I created for TBKzord.',
			slides: ['heroes-1.png']
		}
	}
};
slider.next = function() {
	slider._index++;
	if (slider._index >= slider._selected.slides.length)
		slider._index = 0;

	slider.update();
};

slider.previous = function() {
	slider._index--;
	if (slider._index < 0)
		slider._index = slider._selected.slides.length - 1;

	slider.update();
};

slider.update = function() {
	var image = slider._container;
	var loader = slider._loader;
	var slide = slider._selected;
	var resource = 'images/work/' + slide.slides[slider._index];

	image.stop().fadeOut(slider._speed, function() {
		loader.attr('src', resource).on('load', function() {
			image.css('background-image', 'url(' + resource + ')').fadeIn(slider._speed);
		});
	});
};

slider.updateButtons = function() {
	var slides = slider._selected.slides;
	if (slides.length > 1)
		slider._arrowButtons.show();
	else
		slider._arrowButtons.hide();
};

slider.open = function(index) {
	var slide = slider.slides[index];
	if (slide) {
		slider._selected = slide;
		slider._index = 0;

		slider._title.text(slide.title);
		slider._info.text(slide.text);

		slider.updateButtons();
		slider.update();

		slider._element.fadeIn();
	}
};

slider.close = function() {
	slider._element.fadeOut();
};

$(function() {
	$('.link').on('click', function() { window.location = $(this).attr('data-link'); });
	$('.tile').on('click', function() { slider.open($(this).attr('data-slide')); });

	// Initiate slider objects/elements.
	var leftArrow = $('#slide-left').on('click', slider.previous);
	var rightArrow = $('#slide-right').on('click', slider.next);
	slider._arrowButtons = leftArrow.add(rightArrow);

	slider._element = $('#slide-cover');
	slider._container = $('#slide-image').on('click', slider.close);
	slider._loader = $('<img/>').appendTo(slider._container);
	slider._title = $('#slide-title');
	slider._info = $('#slide-info');
});