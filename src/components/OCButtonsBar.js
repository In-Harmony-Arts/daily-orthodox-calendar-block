/**
 * Load components
 */
import OCButton from "../components/OCButton";
import OCDatePicker from "./OCDatePicker";



const OCButtonBar = ({atts}) => {
	const { dp, ln, dl } = atts;
	const { text_prev, text_curr, text_next, text_prev_acc, text_curr_acc, text_next_acc, text_date, text_date_acc } = atts;
	const { text_week_prev, text_week_prev_acc, text_week_next, text_week_next_acc, text_language_acc} = atts;
	const { btn_today, btn_day, btn_week } = atts;
	const { btn_close, text_close, text_close_acc } = atts;


	const dpShow = !!dp;
	const showTodayBtn = !!btn_today;
	const showDayBtn = !!btn_day;
	const showWeekBtn = !!btn_week;
	const showLangBtn = ln?.length > 1;
	const showCloseBtn = !!btn_close;


	return (
        <div className="ocButtonsBar">
            <OCButton show={showWeekBtn} css="week-previous" text={text_week_prev} text_acc={text_week_prev_acc} />
            <OCButton show={showDayBtn} css="day-previous" text={text_prev} text_acc={text_prev_acc} />
            <OCButton show={showTodayBtn} css="day-current" text={text_curr} text_acc={text_curr_acc} />
            <OCButton show={showDayBtn} css="day-next" text={text_next} text_acc={text_next_acc} />
            <OCButton show={showWeekBtn} css="week-next" text={text_week_next} text_acc={text_week_next_acc} />
            <OCDatePicker show={dpShow} css="day-picker" text={text_date} text_acc={text_date_acc} />
			<OCButton show={showLangBtn} css="lang-toggle" text={dl} text_acc={text_language_acc} />
			<OCButton show={showCloseBtn} css="ocBtnClose" text={text_close} text_acc={text_close_acc} />
        </div>
	);
};

export default OCButtonBar;
