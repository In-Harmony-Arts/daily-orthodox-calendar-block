<?php
// This file is generated. Do not modify it manually.
return array(
	'daily-calendar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'orthodox-resources/daily-calendar',
		'version' => '1.0.0',
		'title' => 'Daily Orthodox Calendar',
		'category' => 'widgets',
		'icon' => 'calendar-alt',
		'description' => 'Displays the daily Orthodox Calendar information from https://www.holytrinityorthodox.com/calendar',
		'example' => array(
			
		),
		'attributes' => array(
			'dp' => array(
				'type' => 'integer',
				'default' => 0
			),
			'dt' => array(
				'type' => 'integer',
				'default' => 1
			),
			'hh' => array(
				'type' => 'integer',
				'default' => 1
			),
			'll' => array(
				'type' => 'integer',
				'default' => 3
			),
			'ss' => array(
				'type' => 'integer',
				'default' => 1
			),
			'tt' => array(
				'type' => 'integer',
				'default' => 1
			),
			'ln' => array(
				'type' => 'array',
				'default' => array(
					'en',
					'ru'
				)
			),
			'dl' => array(
				'type' => 'string',
				'default' => 'en'
			),
			'lang' => array(
				'type' => 'string',
				'default' => 'en'
			),
			'li' => array(
				'type' => 'integer',
				'default' => 0
			),
			'btn_language' => array(
				'type' => 'integer',
				'default' => '0'
			),
			'btn_today' => array(
				'type' => 'integer',
				'default' => '1'
			),
			'btn_day' => array(
				'type' => 'integer',
				'default' => '1'
			),
			'text_prev' => array(
				'type' => 'string',
				'default' => '❰'
			),
			'text_prev_acc' => array(
				'type' => 'string',
				'default' => 'Previous Day'
			),
			'text_curr' => array(
				'type' => 'string',
				'default' => '⬤'
			),
			'text_curr_acc' => array(
				'type' => 'string',
				'default' => 'Today'
			),
			'text_next' => array(
				'type' => 'string',
				'default' => '❱'
			),
			'text_next_acc' => array(
				'type' => 'string',
				'default' => 'Next Day'
			),
			'text_date' => array(
				'type' => 'string',
				'default' => 'Show Date Picker'
			),
			'text_date_acc' => array(
				'type' => 'string',
				'default' => 'Pick Date'
			),
			'text_language' => array(
				'type' => 'string',
				'default' => '”'
			),
			'text_language_acc' => array(
				'type' => 'string',
				'default' => 'Switch Language'
			),
			'text_close' => array(
				'type' => 'string',
				'default' => 'X'
			),
			'text_close_acc' => array(
				'type' => 'string',
				'default' => 'Close popup'
			)
		),
		'supports' => array(
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => false
			),
			'interactivity' => true
		),
		'textdomain' => 'iha-orthodox-resources',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js',
		'styles' => array(
			array(
				'name' => 'none',
				'label' => 'None',
				'isDefault' => true
			),
			array(
				'name' => 'blue',
				'label' => 'Blue'
			),
			array(
				'name' => 'grey',
				'label' => 'Grey'
			),
			array(
				'name' => 'red',
				'label' => 'Red'
			)
		)
	)
);
