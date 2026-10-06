import { msgLoading } from "../Statics";


const OCLoading = ({ isLoading }) => {
    
    if ( ! isLoading ) {
        return null;
    }

    return (
        <div className="ocContainer">{msgLoading}</div>
    );
};

export default OCLoading
