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
                title={__("Settings", "orthores")}
                initialOpen={true}
            >
                <ToggleControl
                    label={__("Edit with live info", "orthores")}
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
                        label={__("Default Language", "orthores")}
                        value={dl}
                        onChange={(value) => setAttributes({ dl: value })}
                        help={__(
                            "The language to show when first loaded",
                            "orthodox-calendar",
                        )}
                        options={[
                            {
                                value: "en",
                                label: __("English", "orthores"),
                                disabled: !ln.includes("en"),
                            },
                            {
                                value: "ru",
                                label: __("Russian", "orthores"),
                                disabled: !ln.includes("ru"),
                            },
                        ]}
                    />
                )}
                <h3>Control Buttons</h3>
                <ToggleControl
                    label={__("Show today button", "orthores")}
                    checked={btn_today}
                    onChange={(value) => setAttributes({ btn_today: value ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show day button", "orthores")}
                    checked={btn_day}
                    onChange={(value) => setAttributes({ btn_day: value ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show date picker", "orthores")}
                    checked={dp}
                    onChange={(datepick) => setAttributes({ dp: datepick ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show date", "orthores")}
                    checked={dt}
                    onChange={(value) => setAttributes({ dt: value ? 1 : 0 })}
                />
                <ToggleControl
                    label={__("Show a heading before", "orthores")}
                    help={
                        hh
                            ? __("Display header", "orthores")
                            : __("No header", "orthores")
                    }
                    checked={hh}
                    onChange={(value) => setAttributes({ hh: value ? 1 : 0 })}
                />
                <h3>Content options</h3>
                <SelectControl
                    label={__("Display Lives of Saints", "orthores")}
                    value={ll}
                    onChange={(value) => setAttributes({ ll: value })}
                    help={__(
                        "How to display the lives of the saints",
                        "orthodox-calendar",
                    )}
                    options={[
                        {
                            value: 0,
                            label: __("Do not display", "orthores"),
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
                    label={__("Scripture Readings", "orthores")}
                    value={ss}
                    onChange={(value) => setAttributes({ ss: value })}
                    help={__(
                        "How to display the Scripture Readings",
                        "orthodox-calendar",
                    )}
                    options={[
                        {
                            value: 0,
                            label: __("Do not display", "orthores"),
                        },
                        {
                            value: 1,
                            label: __("display with header", "orthores"),
                        },
                        {
                            value: 2,
                            label: __("display without header", "orthores"),
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
                    label={__("Display Troparion", "orthores")}
                    value={tt}
                    onChange={(value) => setAttributes({ tt: value })}
                    help={__("How to display the Troparion", "orthores")}
                    options={[
                        {
                            value: 0,
                            label: __("Do not display", "orthores"),
                        },
                        {
                            value: 1,
                            label: __("display with header", "orthores"),
                        },
                        {
                            value: 2,
                            label: __("display without header", "orthores"),
                        },
                    ]}
                />
            </PanelBody>
            <PanelBody
                title={__("Text", "orthores")}
                initialOpen={false}
            >
                <TextControl
                    label={__("Previous Button Text", "orthores")}
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
                    label={__("Current Button Text", "orthores")}
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
                    label={__("Next Button Text", "orthores")}
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
                    label={__("Date Picker Text", "orthores")}
                    value={text_date}
                    onChange={(value) => setAttributes({ text_date: value })}
                />
                <TextControl
                    label={__("Date Picker Text", "orthores")}
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