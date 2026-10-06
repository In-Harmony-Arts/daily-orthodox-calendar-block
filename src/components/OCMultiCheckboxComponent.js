
import { CheckboxControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

const OCMulitChekboxes = ({options, values, onChange }) => {

    return (
        <ul>
            {options.map((opt) => (
                <li>
                    <CheckboxControl
                        className="check_items"
                        label={opt.label}
                        checked={values.includes(opt.value)}
                        onChange={(check) => {
                            onChange(opt, check);
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};


const OCMultiCheckboxComponent = ({ title, options, values, onChange }) => {
    const [choices, setChoices] = useState(values);

    function mcOnChange(opt, check) {
        // copy values so that we are not directly mutating original to trigger render
        const newVals = choices.splice(0);
        check ? newVals.push(opt.value) : newVals.splice(newVals.indexOf(opt.value), 1) ;
        onChange( newVals );
        setChoices( newVals );
    }


	return (
        <>
            <h3>{title}</h3>
            <OCMulitChekboxes options={options} values={choices} onChange={mcOnChange} />
        </>
	);
};

export default OCMultiCheckboxComponent
