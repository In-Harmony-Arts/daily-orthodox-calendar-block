
<?php
    $context = [
    'currentDate' => null,
    'language'    => 'en',
    'popupUrl'    => '',
    ];

    $is_editor = (defined('REST_REQUEST') && REST_REQUEST && isset($_REQUEST['context']) && ('edit' === $_REQUEST['context']));

    $info_content = ORTHODOX_CALENDAR_BLOCK_DEFAULT_MESSAGE;

    // dp="0" dt="1" hh="1" ll="3" ss="1" tt="1" ln="en,ru" dl="en"  lang="en"

    $dt = orthocalbl_validate_var_int($attributes['dt'], 1, 0, 1);
	$header = orthocalbl_validate_var_int($attributes['hh'], 1, 0, 1);
	$lives = orthocalbl_validate_var_int($attributes['ll'], 3, 0, 6);
	$scripture = orthocalbl_validate_var_int($attributes['ss'], 1, 0, 4);
	$trp = orthocalbl_validate_var_int($attributes['tt'], 0, 0, 2);
	$default_lang = orthocalbl_validate_var_string($attributes['dl'], 'en');
	$langs = orthocalbl_validate_var_array($attributes['ln'], array($default_lang));
    $lang_toggle = count($langs) > 1;
    $lang = orthocalbl_validate_var_string($attributes['lang'], $default_lang);

    if ( ! $is_editor ) {
        $liveinfo = 1;
        $disp_lang = $lang;
    } else {
        $liveinfo = orthocalbl_validate_var_int($attributes['li'], 1, 0, 1);
        $disp_lang = $default_lang;
    }

    if ( $liveinfo ) {
        $date = getdate();
            
        $props = array(
            'month'			=> $_REQUEST['month'] ?? $date['mon'],
            'day'			=> $_REQUEST['today'] ?? $date['mday'],
            'year'			=> $_REQUEST['year'] ?? $date['year'],
            'editor'		=> $_REQUEST['editor'] ?? 0,
            'liveinfo'		=> $_REQUEST['liveinfo'] ?? 1,
            'cachebuster'	=> $_REQUEST['cachebuster'] ?? 0,
            'dt'			=> $dt,
            'hh'			=> $header,
            'll'			=> $lives,
            'ss'			=> $scripture,
            'tt'			=> $trp,
            'lang'			=> $lang,
        );
        debug_log(array(
            'props' => $props,
        ));
        // [success, data, code]
        $resp = orthocalbl_get_request_content($props);
        debug_log(array(
            'resp' => $resp,
        ));
        if ( empty($resp['data']) ) {
            $info_content = ORTHODOX_CALENDAR_BLOCK_ERROR_MESSAGE;
        } else {
            $info_content = $resp['data'];
        }
    } else {
        $info_content = orthocalbl_get_static_text($dt, $header, $lives, $scripture, $trp);
    }
    

?>
<div <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="orthocalbl"
>
    <div class="ocb-buttons-bar">
        <?php if ($attributes['btn_day'] === 1) { ?><button type="button" class="ocb-button day-previous"><span class="screen-reader-text"><?php echo $attributes['text_prev_acc']; ?></span><?php echo $attributes['text_prev']; ?></button><?php } ?>
        <?php if ($attributes['btn_today'] === 1) { ?><button type="button" class="ocb-button day-current"><span class="screen-reader-text"><?php echo $attributes['text_curr_acc']; ?></span><?php echo $attributes['text_curr']; ?></button><?php } ?>
        <?php if ($attributes['btn_day'] === 1) { ?><button type="button" class="ocb-button day-next"><span class="screen-reader-text"><?php echo $attributes['text_next_acc']; ?></span><?php echo $attributes['text_next']; ?></button><?php } ?>
        <?php if ($attributes['dp'] === 1) { ?>
            <div class="ocb-dp-container">
                <button type="button" class="ocb-button ocb-button-dp ocb-button--svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><title><?php echo $attributes['text_date']; ?></title><path fill="currentColor" d="M9 4v1H5v22h22V5h-4V4h-2v1H11V4zM7 7h2v1h2V7h10v1h2V7h2v2H7zm0 4h18v14H7zm6 2v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 17v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2zM9 21v2h2v-2zm4 0v2h2v-2zm4 0v2h2v-2z"></path>
                    </svg>
                </button>
                <input class="ocb-dp-input" aria-label="<?php echo $attributes['text_date_acc']; ?>" type="date" hidden/>
            </div>
        <?php } ?>
        <?php if ($lang_toggle) { ?><button type="button" class="ocb-button lang-toggle"><span class="screen-reader-text"><?php echo $attributes['text_language_acc']; ?></span><?php echo $disp_lang; ?></button><?php } ?>
    </div>
    <div class="ocb-info-container">
        <div class="ocb-info-loading">Loading...</div>
        <div class="ocb-info-content"
            data-wp-context='{ "currentDate": 0 }'
            data-wp-watch="callbacks.logCounter"
        >
            <?php
                echo $info_content;
            ?>
        </div>
    </div>
    <div class="ocb-popup hidden fade-in ">
        <div class="ocb-buttons-bar">
            <button type="button" class="ocb-button ocb-button-close"><span class="screen-reader-text"><?php echo $attributes['text_close_acc']; ?></span><?php echo $attributes['text_close']; ?></button>
        </div>
        <div class="ocb-popup-loading">Loading...</div>
        <div class="ocb-popup-content hidden fade-in"></div>
    </div>
</div>