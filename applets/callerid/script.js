$(function() {
	$('.callerid-applet tr.hide input').prop('disabled', true);

	$('.callerid-applet input.keypress').live('keyup', function(event) {
		var row = $(this).closest('tr');
		$('input[name^="keys"]', row).attr('name', 'keys[' + $(this).val() + ']');
		$('input[name^="responses"]', row).attr('name', 'responses[' + $(this).val() + ']');
	});
	
	$('.callerid-applet .action.add').live('click', function(event) {
		event.preventDefault();
		var row = $(this).closest('tr');
		var newRow = $('tfoot tr', $(this).parents('.callerid-applet')).html();
		newRow = $('<tr>' + newRow + '</tr>')			
			.show()
			.insertAfter(row);
		$('.flowline-item').droppable(Flows.events.drop.options);
		$('td', newRow).flicker();
		$('.flowline-item input', newRow).attr('name', 'responses[]');
		$('input.keypress', newRow).attr('name', 'keys[]');
		$('input', newRow).prop('disabled', false).focus();
		$(event.target).parents('.options-table').trigger('change');
		return false;
	});

	$('.callerid-applet .action.remove').live('click', function() {
		var row = $(this).closest('tr');
		row.animate({ backgroundColor : '#FEEEBD' }, 'fast')
			.fadeOut('fast', function() {
				row.remove();
			});

		return false;
	});

	$('.callerid-applet .options-table').live('change', function() {
		var first = $('tbody tr', this).first();
		$('.action.remove', first).hide();
	});

	$('.callerid-applet .options-table').trigger('change');
});
