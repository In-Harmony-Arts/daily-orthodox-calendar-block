
<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


$date = getdate();
$str_date = $date['mon'] . "/" . $date['mday'] . "/" . $date['year'];
$dp_date = $date['year'] . "-" . $date['mon'] . "-" . $date['mday'];

$is_editor = (defined('REST_REQUEST') && REST_REQUEST && isset($_REQUEST['context']) && ('edit' === $_REQUEST['context']));
$liveinfo = orthodox_calendar_block_validate_var_int(intval($attributes['li']), 1, 0, 1);

$dt = orthodox_calendar_block_validate_var_int(intval($attributes['dt']), 1, 0, 1);
$header = orthodox_calendar_block_validate_var_int(intval($attributes['hh']), 1, 0, 1);
$lives = orthodox_calendar_block_validate_var_int(intval($attributes['ll']), 3, 0, 6);
$scripture = orthodox_calendar_block_validate_var_int(intval($attributes['ss']), 1, 0, 4);
$trp = orthodox_calendar_block_validate_var_int(intval($attributes['tt']), 0, 0, 2);
$langs = orthodox_calendar_block_validate_var_array($attributes['ln'], array($default_lang));
$multi_langs = isset($langs[1]); // just need to know that more than 1 value is set
$default_lang = !$multi_langs ? $langs[0] : orthodox_calendar_block_validate_var_string(esc_html($attributes['dl']), 'en');
$lang = !$multi_langs ? $langs[0] : orthodox_calendar_block_validate_var_string(esc_html($attributes['lang']), $default_lang);

// fetching context props
$fetch_context = array(
    'isLoading'         => false,
    'contentHtml'       => "",
    'errorHtml'         => "",
    'oldQsps'           => "",
    'loadingText'       => __("Loading...", 'orthodox-calendar-block'),
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
    'dt'			=> $dt,
    'hh'			=> $header,
    'll'			=> $lives,
    'ss'			=> $scripture,
    'tt'			=> $trp,
    'ln'            => $langs,
    'lang'			=> $lang,
    'dl'			=> $default_lang,
);

$editor_context = array_slice($fetch_context, 0);

if ( $is_editor ) {
    $resp = orthodox_calendar_block_get_request_content($props);
    if ($resp['success'] === true) {
        $editor_context['contentHtml'] = $resp['data'];
        $editor_context['cachebuster'] = 0;
    }
}

?>
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="orthodox-calendar-block"
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
            if (intval($attributes['btn_day']) === 1) { ?>
                <button
                    type="button"
                    class="ocb-button day-previous"
                    data-wp-bind--disabled="context.isLoadingDay"
                    data-wp-on--click="actions.datePrevious"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_prev_acc']); ?></span><?php echo esc_html($attributes['text_prev']); ?></button>
            <?php } ?>
            <?php // button -- today
            if (intval($attributes['btn_today']) === 1) { ?>
                <button
                    type="button"
                    class="ocb-button day-current"
                    data-wp-bind--disabled="context.isLoadingDay"
                    data-wp-on--click="actions.dateToday"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_curr_acc']); ?></span><?php echo esc_html($attributes['text_curr']); ?></button>
            <?php } ?>
            <?php // button -- next day
            if (intval($attributes['btn_day']) === 1) { ?>
                <button
                    type="button"
                    class="ocb-button day-next"
                    data-wp-bind--disabled="context.isLoadingDay"
                    data-wp-on--click="actions.dateNext"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_next_acc']); ?></span><?php echo esc_html($attributes['text_next']); ?></button>
            <?php } ?>
            <?php // button -- day picker
            if (intval($attributes['dp']) === 1) { ?>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><title><?php echo esc_html($attributes['text_date']); ?></title><path fill="currentColor" d="M9 4v1H5v22h22V5h-4V4h-2v1H11V4zM7 7h2v1h2V7h10v1h2V7h2v2H7zm0 4h18v14H7zm6 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 17v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 21v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"></path>
                        </svg>
                    </button>
                    <input
                        class="ocb-dp-input"
                        aria-label="<?php echo esc_html($attributes['text_date_acc']); ?>"
                        type="date"
                        data-wp-bind--hidden="!context.showDatePicker"
                        data-wp-bind--disabled="context.isLoadingDay"
                        data-wp-bind--value="context.datePickerFormatedDate"
                        data-wp-on--change="actions.datepickerOnChange"
                    />
                </div>
            <?php } ?>
            <?php // button -- language toggle
            if ($multi_langs) { ?>
                <button
                    type="button"
                    class="ocb-button lang-toggle"
                    data-wp-on--click="actions.toggleLanguage"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_language_acc']); ?></span><span class="display-text" data-wp-text="context.lang"></span></button>
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
            ><span class="screen-reader-text"><?php echo esc_html($attributes['text_close_acc']); ?></span><?php echo esc_html($attributes['text_close']); ?></button>
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