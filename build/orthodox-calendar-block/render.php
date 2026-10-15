
<?php
    $date = getdate();
    $str_date = $date['mon'] . "/" . $date['mday'] . "/" . $date['year'];
    $dp_date = $date['year'] . "-" . $date['mon'] . "-" . $date['mday'];

    $is_editor = (defined('REST_REQUEST') && REST_REQUEST && isset($_REQUEST['context']) && ('edit' === $_REQUEST['context']));
    $liveinfo = orthocalbl_validate_var_int($attributes['li'], 1, 0, 1);

    $dt = orthocalbl_validate_var_int($attributes['dt'], 1, 0, 1);
	$header = orthocalbl_validate_var_int($attributes['hh'], 1, 0, 1);
	$lives = orthocalbl_validate_var_int($attributes['ll'], 3, 0, 6);
	$scripture = orthocalbl_validate_var_int($attributes['ss'], 1, 0, 4);
	$trp = orthocalbl_validate_var_int($attributes['tt'], 0, 0, 2);
	$default_lang = orthocalbl_validate_var_string($attributes['dl'], 'en');
	$langs = orthocalbl_validate_var_array($attributes['ln'], array($default_lang));
    $lang_toggle = count($langs) > 1;
    $lang = orthocalbl_validate_var_string($attributes['lang'], $default_lang);

    // fetching context props
    $fetch_context = array(
        'isLoading'         => false,
        'contentHtml'       => "",
        'errorHtml'         => "",
        'oldQsps'           => "",
        'loadingText'       => "Loading...",
    );

    // instance context
    $context = array(
        'currentDate'           => $str_date,
        'dpDate'                => $dp_date,
        'showDatePicker'        => false,
        'popupUrl'              => false,
        'dt'			        => $dt,
        'hh'			        => $header,
        'll'			        => $lives,
        'ss'			        => $scripture,
        'tt'			        => $trp,
        'ln'                    => $langs,
        'lang'			        => $lang,
    );

    $props = array(
		'month'			=> $date['mon'],
		'day'			=> $date['mday'],
		'year'			=> $date['year'],
		'editor'		=> $is_editor ? 1 : 0,
		'liveinfo'		=> $liveinfo ? 1 : 0,
        'dt'			        => $dt,
        'hh'			        => $header,
        'll'			        => $lives,
        'ss'			        => $scripture,
        'tt'			        => $trp,
        'ln'                    => $langs,
        'lang'			        => $lang,
	);

    $editor_context = array_slice($fetch_context, 0);

    if ( $is_editor ) {
       $resp = orthocalbl_get_request_content($props);
       if ($resp['success'] === true) {
            $editor_context['contentHtml'] = $resp['data'];
            $editor_context['cachebuster'] = 0;
       }
    }

?>
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="orthocalbl"
    <?php echo wp_interactivity_data_wp_context( $context ); ?>
>
    <div
        class="ocb-info"
        data-wp-watch="callbacks.fetchCalendarInfo"
        <?php echo wp_interactivity_data_wp_context( $editor_context ); ?>
    >
        <div
            class="ocb-buttons-bar"
        >
            <?php // button -- previous day
            if ($attributes['btn_day'] === 1) { ?>
                <button
                    type="button"
                    class="ocb-button day-previous"
                    data-wp-bind--disabled="context.isLoadingDay"
                    data-wp-on--click="actions.datePrevious"
                ><span class="screen-reader-text"><?php echo $attributes['text_prev_acc']; ?></span><?php echo $attributes['text_prev']; ?></button>
            <?php } ?>
            <?php // button -- today
            if ($attributes['btn_today'] === 1) { ?>
                <button
                    type="button"
                    class="ocb-button day-current"
                    data-wp-bind--disabled="context.isLoadingDay"
                    data-wp-on--click="actions.dateToday"
                ><span class="screen-reader-text"><?php echo $attributes['text_curr_acc']; ?></span><?php echo $attributes['text_curr']; ?></button>
            <?php } ?>
            <?php // button -- next day
            if ($attributes['btn_day'] === 1) { ?>
                <button
                    type="button"
                    class="ocb-button day-next"
                    data-wp-bind--disabled="context.isLoadingDay"
                    data-wp-on--click="actions.dateNext"
                ><span class="screen-reader-text"><?php echo $attributes['text_next_acc']; ?></span><?php echo $attributes['text_next']; ?></button>
            <?php } ?>
            <?php // button -- day picker
            if ($attributes['dp'] === 1) { ?>
                <div
                    class="ocb-dp-container"
                    data-wp-watch="callbacks.setDatePickerFormatedDate"
                >
                    <button
                        type="button"
                        class="ocb-button ocb-button-dp ocb-button--svg"
                        data-wp-bind--disabled="context.isLoadingDay"
                        data-wp-bind--aria-expanded="context.showDatePickers"
                        data-wp-on--click="actions.toggleDatePicker"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><title><?php echo $attributes['text_date']; ?></title><path fill="currentColor" d="M9 4v1H5v22h22V5h-4V4h-2v1H11V4zM7 7h2v1h2V7h10v1h2V7h2v2H7zm0 4h18v14H7zm6 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 17v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 21v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"></path>
                        </svg>
                    </button>
                    <input
                        class="ocb-dp-input"
                        aria-label="<?php echo $attributes['text_date_acc']; ?>"
                        type="date"
                        data-wp-bind--hidden="!context.showDatePicker"
                        data-wp-bind--disabled="context.isLoadingDay"
                        data-wp-bind--value="context.datePickerFormatedDate"
                        data-wp-on--change="actions.datepickerOnChange"
                    />
                </div>
            <?php } ?>
            <?php // button -- language toggle
            if ($lang_toggle) { ?>
                <button
                    type="button"
                    class="ocb-button lang-toggle"
                    data-wp-on--click="actions.toggleLanguage"
                ><span class="screen-reader-text"><?php echo $attributes['text_language_acc']; ?></span><span class="display-text" data-wp-text="context.lang"></span></button>
            <?php } ?>
        </div>
        <div class="ocb-info-container fetch-container">
            <div
                class="ocb-info-loading loading"
                data-wp-bind--hidden="!context.isLoading"
                data-wp-text="context.loadingText"
            ></div>
            <div
                class="ocb-info-error error"
                data-wp-bind--hidden="!state.hasError"
                data-wp-text="context.errorHtml"
            ></div>
            <div
                class="ocb-info-content content"
                data-wp-html="context.contentHtml"
                data-wp-bind--hidden="<?php echo $is_editor ? "false" : "!state.hasContent"; ?>"
                data-wp-on--click="actions.handleLinkClick"
            ><?php echo $editor_context['contentHtml']; ?></div>
        </div>
    </div>
    <div
        class="ocb-popup fade-in"
        data-wp-class--hidden="!state.showPopup"
        data-wp-watch="callbacks.fetchPopupInfo"
        <?php echo wp_interactivity_data_wp_context( $fetch_context ); ?>
    >
        <div class="ocb-buttons-bar">
            <button
                type="button"
                class="ocb-button ocb-button-close"
                data-wp-bind--disabled="context.isLoading"
                data-wp-on--click="actions.closePopup"
            ><span class="screen-reader-text"><?php echo $attributes['text_close_acc']; ?></span><?php echo $attributes['text_close']; ?></button>
        </div>
        <div class="ocb-popup-container fetch-container" >
            <div
                class="ocb-popup-loading loading"
                data-wp-bind--hidden="!context.isLoading"
                data-wp-text="context.loadingText"
            ></div>
            <div
                class="ocb-popup-error error"
                data-wp-bind--hidden="!state.hasError"
                data-wp-text="context.errorHtml"
            ></div>
            <div
                class="ocb-popup-content content"
                data-wp-html="context.contentHtml"
                data-wp-bind--hidden="!state.hasContent"
            ></div>
        </div>
    </div>
</div>