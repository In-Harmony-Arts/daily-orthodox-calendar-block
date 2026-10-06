/**
 * Button Calendar icon
 */
import OCIconCalendar from "./OCIconCalendar";


const OCDatePicker = ({show, css, text, text_acc}) => {
    if (!show) return null;

    const classes = ["ocButton", css].join(" ");

	return (
        <div className="date-picker-container">
            <button type="button" className={classes}>
                <OCIconCalendar title={text}  />
            </button>
            <input className="ocDatePicker" aria-label={text_acc} type="date" hidden />
        </div>
	);
};

export default OCDatePicker;
