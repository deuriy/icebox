// Timeline
function timeLineInit ($timelineSelector) {
	var	countPrevSiblings	= $timelineSelector.find('.Timeline_item-current').prevAll().length,
			fillLineStep			= 100 / ($timelineSelector.find('.Timeline_item').length - 1),
			fillLineWidth			= fillLineStep * countPrevSiblings;

	$timelineSelector.find('.Timeline_item-current').prevAll().addClass('Timeline_item-previous');

	$timelineSelector.find('.Timeline_fillLine').animate({
		'width': fillLineWidth + '%'},	250
	);
}
function timeLineFill ($timelineItem) {
	var	countPrevSiblings	= $timelineItem.prevAll().length,
			fillLineStep			= 100 / $timelineItem.siblings().length,
			fillLineWidth			= fillLineStep * countPrevSiblings;

	$timelineItem.parent().children().removeClass('Timeline_item-current Timeline_item-previous Timeline_item-nextHover');
	$timelineItem.addClass('Timeline_item-current').prevAll().addClass('Timeline_item-previous');

	$timelineItem.parents('.Timeline').find('.Timeline_fillLine').animate({
		'width': fillLineWidth + '%'},	250
	);
}

// Number format
function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

var tariffPricesArr = [];

$('.TariffsSection_basicTariffs .Tariff_price').each(function(index, el) {
	var currentPrice = parseInt($(this).text().replace(/ /g, ''));
	tariffPricesArr.push(currentPrice);
});

timeLineInit($('.Timeline'));

$('.Timeline_link').click(function(e) {
	e.preventDefault();
	timeLineFill($(this).parent());
	tariffsCalculator($(this).parent());
});

// Tariffs calculator
function tariffsCalculator ($timelineItem) {
	var coefficient = parseFloat($timelineItem.data('coefficient'));
	$('.TariffsSection_basicTariffs .Tariff_price').each(function(index, el) {
		var result = parseInt(tariffPricesArr[index] * coefficient);
		$(this).text(numberWithSpaces(result));
	});
}