
<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


$iha_orthodox_resources_date = getdate();
$iha_orthodox_resources_str_date = $iha_orthodox_resources_date['mon'] . "/" . $iha_orthodox_resources_date['mday'] . "/" . $iha_orthodox_resources_date['year'];
$iha_orthodox_resources_dp_date = $iha_orthodox_resources_date['year'] . "-" . $iha_orthodox_resources_date['mon'] . "-" . $iha_orthodox_resources_date['mday'];


$iha_orthodox_resources_cal_props = array(
    'dt'		=> iha_orthodox_resources_validate_var_int(intval($attributes['dt'] ?? 1), 1, 0, 1),
    'hh'		=> iha_orthodox_resources_validate_var_int(intval($attributes['hh'] ?? 1), 1, 0, 1),
    'll'		=> iha_orthodox_resources_validate_var_int(intval($attributes['ll']), 3, 0, 6),
    'ss'		=> iha_orthodox_resources_validate_var_int(intval($attributes['ss']), 1, 0, 4),
    'tt'		=> iha_orthodox_resources_validate_var_int(intval($attributes['tt']), 0, 0, 2),
    'ln'        => iha_orthodox_resources_validate_var_array($attributes['ln'], iha_orthodox_resources_get_language_codes()),
    'lang'		=> iha_orthodox_resources_get_language_default($attributes),
);

// instance context
$iha_orthodox_resources_context = array_merge(
    $iha_orthodox_resources_cal_props,
    array(
        'currentDate'           => $iha_orthodox_resources_str_date,
        'dpDate'                => $iha_orthodox_resources_dp_date,
        'showDatePicker'        => false,
        'popupUrl'              => "",
        'content'               => iha_orthodox_resources_get_fetch_context(),
        'popup'                 => iha_orthodox_resources_get_fetch_context(),
    ),
);

if ( iha_orthodox_resources_is_editor() ) {
    $iha_orthodox_resources_props = array_merge(
        $iha_orthodox_resources_cal_props,
        array(
            'month'			=> $iha_orthodox_resources_date['mon'],
            'today'			=> $iha_orthodox_resources_date['mday'],
            'year'			=> $iha_orthodox_resources_date['year'],
            'editor'		=> 1,
            'li'		    => iha_orthodox_resources_validate_var_int(intval($attributes['li']), 1, 0, 1),
        )
    );

    $iha_orthodox_resources_resp = iha_orthodox_resources_get_request_content($iha_orthodox_resources_props);

    if ($iha_orthodox_resources_resp['success'] == true) {
        $iha_orthodox_resources_context['content']['contentHtml'] = $iha_orthodox_resources_resp['data'];
        $iha_orthodox_resources_context['cb'] = 0;
    }
}

?>
<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="orthores/daily-calendar"
    <?php echo wp_interactivity_data_wp_context( $iha_orthodox_resources_context ); ?>
>
    <div
        class="ordc-info"
        data-wp-watch="callbacks.fetchCalendarInfo"
    >
        <div
            class="ordc-buttons-bar"
        >
            <?php // button -- previous day
            if (intval($attributes['btn_day']) === 1) { ?>
                <button
                    type="button"
                    class="ordc-button day-previous"
                    data-wp-bind--disabled="context.content.isLoading"
                    data-wp-on--click="actions.datePrevious"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_prev_acc']); ?></span><?php echo esc_html($attributes['text_prev']); ?></button>
            <?php } ?>
            <?php // button -- today
            if (intval($attributes['btn_today']) === 1) { ?>
                <button
                    type="button"
                    class="ordc-button day-current"
                    data-wp-bind--disabled="context.content.isLoading"
                    data-wp-on--click="actions.dateToday"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_curr_acc']); ?></span><?php echo esc_html($attributes['text_curr']); ?></button>
            <?php } ?>
            <?php // button -- next day
            if (intval($attributes['btn_day']) === 1) { ?>
                <button
                    type="button"
                    class="ordc-button day-next"
                    data-wp-bind--disabled="context.content.isLoading"
                    data-wp-on--click="actions.dateNext"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_next_acc']); ?></span><?php echo esc_html($attributes['text_next']); ?></button>
            <?php } ?>
            <?php // button -- day picker
            if (intval($attributes['dp']) === 1) { ?>
                <div
                    class="ordc-dp-container"
                    data-wp-watch="callbacks.setDatePickerFormatedDate"
                >
                    <button
                        type="button"
                        class="ordc-button ordc-button-dp ordc-button--svg"
                        data-wp-bind--disabled="context.content.isLoading"
                        data-wp-bind--aria-expanded="context.showDatePickers"
                        data-wp-on--click="actions.toggleDatePicker"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><title><?php echo esc_html($attributes['text_date']); ?></title><path fill="currentColor" d="M9 4v1H5v22h22V5h-4V4h-2v1H11V4zM7 7h2v1h2V7h10v1h2V7h2v2H7zm0 4h18v14H7zm6 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 17v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 21v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"></path>
                        </svg>
                    </button>
                    <input
                        class="ordc-dp-input"
                        aria-label="<?php echo esc_html($attributes['text_date_acc']); ?>"
                        type="date"
                        data-wp-bind--hidden="!context.showDatePicker"
                        data-wp-bind--disabled="context.content.isLoading"
                        data-wp-bind--value="context.datePickerFormatedDate"
                        data-wp-on--change="actions.datepickerOnChange"
                    />
                </div>
            <?php } ?>
            <?php // button -- language toggle
            if (iha_orthodox_resources_get_multiple_languages($attributes)) { ?>
                <button
                    type="button"
                    class="ordc-button lang-toggle"
                    data-wp-on--click="actions.toggleLanguage"
                ><span class="screen-reader-text"><?php echo esc_html($attributes['text_language_acc']); ?></span><span class="display-text" data-wp-text="context.lang"><?php echo esc_html(iha_orthodox_resources_get_language_default($attributes)); ?></span></button>
            <?php } ?>
        </div>
        <div class="ordc-info-container fetch-container">
            <div
                class="ordc-info-loading loading"
                data-wp-bind--hidden="!context.content.isLoading"
                data-wp-text="state.loadingText"
            ></div>
            <div
                class="ordc-info-error error"
                data-wp-bind--hidden="!state.hasError"
                data-wp-text="context.content.errorHtml"
            ></div>
            <div
                class="ordc-info-content content"
                data-wp-html="context.content.contentHtml"
                data-wp-bind--hidden="<?php echo iha_orthodox_resources_is_editor() ? "false" : "!state.showContent"; ?>"
                data-wp-on--click="actions.handleLinkClick"
            ><?php echo wp_kses( $iha_orthodox_resources_context['content']['contentHtml'], iha_orthodox_resources_get_allowed_html() ); ?></div>
        </div>
    </div>
    <div
        class="ordc-popup fade-in"
        data-wp-class--hidden="!state.showPopup"
        data-wp-watch="callbacks.fetchPopupInfo"
    >
        <div class="ordc-buttons-bar">
            <button
                type="button"
                class="ordc-button ordc-button-close"
                data-wp-bind--disabled="context.popup.isLoading"
                data-wp-on--click="actions.closePopup"
            ><span class="screen-reader-text"><?php echo esc_html($attributes['text_close_acc']); ?></span><?php echo esc_html($attributes['text_close']); ?></button>
        </div>
        <div class="ordc-popup-container fetch-container" >
            <div
                class="ordc-popup-loading loading"
                data-wp-bind--hidden="!context.popup.isLoading"
                data-wp-text="context.popup.loadingText"
            ></div>
            <div
                class="ordc-popup-error error"
                data-wp-bind--hidden="!state.hasError"
                data-wp-text="context.popup.errorHtml"
            ></div>
            <div
                class="ordc-popup-content content"
                data-wp-class--hidden="!state.showContent"
                data-wp-html="context.popup.contentHtml"
            ></div>
        </div>
    </div>
</div>