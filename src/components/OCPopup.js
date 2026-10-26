import { msgLoading } from '../Statics';
import OCButtonBar from './OCButtonsBar';

const OCPopup = ( { displayBoxBtnAtts } ) => {
	return (
		<div className={ 'display-box hidden fade-in ' }>
			<OCButtonBar atts={ displayBoxBtnAtts } />
			<div className={ 'display-box-loading' }>{ msgLoading }</div>
			<div className={ 'display-box-content hidden fade-in' }></div>
		</div>
	);
};

export default OCPopup;
