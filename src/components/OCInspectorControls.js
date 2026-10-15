/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";


import { InspectorControls } from "@wordpress/block-editor";

import {
    TextControl,
    ToggleControl,
    PanelBody,
    SelectControl,
} from "@wordpress/components";


import OCMultiCheckboxComponent from "../components/OCMultiCheckboxComponent";

/**
 * Static props
 */
import {
    languages
} from "../Statics";



const OCInspectorControls = ( { props }) => {

    const { attributes, setAttributes } = props;

	const { dp, dt, hh, ll, ss, tt, ln, dl, li } = attributes;
	const {
		text_prev,
		text_curr,
		text_next,
		text_prev_acc,
		text_curr_acc,
		text_next_acc,
		text_date,
		text_date_acc,
		text_language_acc,
	} = attributes;
	const { btn_today, btn_day } = attributes;
	const { text_close, text_close_acc } = attributes;


	const multipleLanguages = ln.length > 1;

    return (
        <InspectorControls>
            <PanelBody
                title={__("Settings", "orthodox-calendar-block")}
                initialOpen={true}
            >
                <ToggleControl
                    label={__("Edit with live info", "orthodox-calendar-block")}
                    checked={li}
                    onChange={(value) => setAttributes({ li: value ? 1 : 0 })}
                />
                <OCMultiCheckboxComponent
                    title="Languages"
                    options={languages}
                    values={ln}
                    onChange={(value) => setAttributes({ ln: value })}
                />
                {multipleLanguages && (
                    <SelectControl
                        label={__("Default Language", "orthodox-calendar-block")}
                        value={dl}
                        onChange={(value) => setAttributes({ dl: value })}
                        help={__(
                            "The language to show when first loaded",
                            "orthodox-calendar",
                        )}
                        options={[
                            {
                                value: "en",
                                label: __("English", "orthodox-calendar-block"),
                                disabled: !ln.includes("en"),
                            },
                            {
                                value: "ru",
                                label: __("Russian", "orthodox-calendar-block"),
                                disabled: !ln.includes("ru"),
                            },
                        ]}
                    />
                )}
                <ToggleControl
                    label={__("Show today button", "orthodox-calendar-block")}
                    checked={btn_today}
                    onChange={(value) => setAttributes({ btn_today: value ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show day button", "orthodox-calendar-block")}
                    checked={btn_day}
                    onChange={(value) => setAttributes({ btn_day: value ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show date picker", "orthodox-calendar-block")}
                    checked={dp}
                    onChange={(datepick) => setAttributes({ dp: datepick ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show date", "orthodox-calendar-block")}
                    checked={dt}
                    onChange={(value) => setAttributes({ dt: value ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show a heading before", "orthodox-calendar-block")}
                    help={
                        hh
                            ? __("Display header", "orthodox-calendar-block")
                            : __("No header", "orthodox-calendar-block")
                    }
                    checked={hh}
                    onChange={(value) => setAttributes({ hh: value ? 1 : 0 })}
                />
                <SelectControl
                    label={__("Display Lives of Saints", "orthodox-calendar-block")}
                    value={ll}
                    onChange={(value) => setAttributes({ ll: value })}
                    help={__(
                        "How to display the lives of the saints",
                        "orthodox-calendar",
                    )}
                    options={[
                        {
                            value: 0,
                            label: __("Do not display", "orthodox-calendar-block"),
                        },
                        {
                            value: 1,
                            label: __(
                                "all Saints in separate paragraphs",
                                "orthocalbl",
                            ),
                        },
                        {
                            value: 2,
                            label: __(
                                "all Saints in one paragraph",
                                "orthocalbl",
                            ),
                        },
                        {
                            value: 3,
                            label: __(
                                "major Saints in separate paragraphs",
                                "orthocalbl",
                            ),
                        },
                        {
                            value: 4,
                            label: __(
                                "major Saints in one paragraph",
                                "orthocalbl",
                            ),
                        },
                        {
                            value: 5,
                            label: __(
                                "major Saints and New Martyrs in separate paragraphs",
                                "orthocalbl",
                            ),
                        },
                        {
                            value: 6,
                            label: __(
                                "major Saints and New Martyrs in one paragraph",
                                "orthocalbl",
                            ),
                        },
                    ]}
                />
                <SelectControl
                    label={__("Scripture Readings", "orthodox-calendar-block")}
                    value={ss}
                    onChange={(value) => setAttributes({ ss: value })}
                    help={__(
                        "How to display the Scripture Readings",
                        "orthodox-calendar",
                    )}
                    options={[
                        {
                            value: 0,
                            label: __("Do not display", "orthodox-calendar-block"),
                        },
                        {
                            value: 1,
                            label: __("display with header", "orthodox-calendar-block"),
                        },
                        {
                            value: 2,
                            label: __("display without header", "orthodox-calendar-block"),
                        },
                        {
                            value: 3,
                            label: __(
                                "display with header and wtih verses",
                                "orthocalbl",
                            ),
                        },
                        {
                            value: 4,
                            label: __(
                                "display without header and with verses",
                                "orthocalbl",
                            ),
                        },
                    ]}
                />
                <SelectControl
                    label={__("Display Troparion", "orthodox-calendar-block")}
                    value={tt}
                    onChange={(value) => setAttributes({ tt: value })}
                    help={__("How to display the Troparion", "orthodox-calendar-block")}
                    options={[
                        {
                            value: 0,
                            label: __("Do not display", "orthodox-calendar-block"),
                        },
                        {
                            value: 1,
                            label: __("display with header", "orthodox-calendar-block"),
                        },
                        {
                            value: 2,
                            label: __("display without header", "orthodox-calendar-block"),
                        },
                    ]}
                />
            </PanelBody>
            <PanelBody
                title={__("Text", "orthodox-calendar-block")}
                initialOpen={false}
            >
                <TextControl
                    label={__("Previous Button Text", "orthodox-calendar-block")}
                    value={text_prev}
                    onChange={(value) => setAttributes({ text_prev: value })}
                />
                <TextControl
                    label={__(
                        "Previous Button Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_prev_acc}
                    onChange={(value) => setAttributes({ text_prev_acc: value })}
                />
                <TextControl
                    label={__("Current Button Text", "orthodox-calendar-block")}
                    value={text_curr}
                    onChange={(value) => setAttributes({ text_curr: value })}
                />
                <TextControl
                    label={__(
                        "Current Button Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_curr_acc}
                    onChange={(value) => setAttributes({ text_curr_acc: value })}
                />
                <TextControl
                    label={__("Next Button Text", "orthodox-calendar-block")}
                    value={text_next}
                    onChange={(value) => setAttributes({ text_next: value })}
                />
                <TextControl
                    label={__(
                        "Next Button Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_next_acc}
                    onChange={(value) => setAttributes({ text_next_acc: value })}
                />
                <TextControl
                    label={__("Date Picker Text", "orthodox-calendar-block")}
                    value={text_date}
                    onChange={(value) => setAttributes({ text_date: value })}
                />
                <TextControl
                    label={__("Date Picker Text", "orthodox-calendar-block")}
                    value={text_date}
                    onChange={(value) => setAttributes({ text_date: value })}
                />
                <TextControl
                    label={__(
                        "Date Picker Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_date_acc}
                    onChange={(value) => setAttributes({ text_date_acc: value })}
                />
                <TextControl
                    label={__(
                        "Language Toggle Button Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_language_acc}
                    onChange={(value) => setAttributes({ text_language_acc: value })}
                />
                <TextControl
                    label={__(
                        "Close Button Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_close}
                    onChange={(value) => setAttributes({ text_close: value })}
                />
                <TextControl
                    label={__(
                        "Close Button Accessibility Text",
                        "orthocalbl",
                    )}
                    value={text_close_acc}
                    onChange={(value) => setAttributes({ text_close_acc: value })}
                />
            </PanelBody>
        </InspectorControls>
    );
};


export default OCInspectorControls;