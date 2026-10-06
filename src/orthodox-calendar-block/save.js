/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Load components
 */
import OCButtonBar from "../components/OCButtonsBar";
import OCPopup from "../components/OCPopup";

/**
 * Static props
 */
import {
	msgLoading,
	containerClassName,
	filterArrayByArray,
	badStrings,
} from "../Statics";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see 	https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param 	{Object} 	root0
 * @param 	{Array} 	root0.attributes
 *
 * @return 	{Element} 	Element to render.
 */
export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: { containerClassName },
	});
	const className = blockProps?.className ?? "";

	const { text_close, text_close_acc} = attributes;

	const displayBoxBtnAtts = {
		'btn_close': true,
		'text_close': text_close,
		'text_close_acc': text_close_acc,
	};

	const parsedAtts = filterArrayByArray(attributes, badStrings);
	parsedAtts.lang = parsedAtts.dl;

	return (
		<div {...parsedAtts} className={className}>
			<OCButtonBar atts={attributes} />
			<div className="ocContainer">{msgLoading}</div>
			<OCPopup displayBoxBtnAtts={displayBoxBtnAtts}/>
		</div>
	);
}
