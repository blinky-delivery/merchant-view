import { Button } from "../ui/button";
import SpinnerIcon from "../ui/spinner";

const FormSubmitButtons: React.FC<{
    isLoading: boolean;
    isDisabled: boolean;
    showCancel: boolean;
    onCancel: () => void;
    onSubmit?: () => void,
    submitTitle?: string
}> = ({ isLoading, isDisabled, showCancel, onCancel, onSubmit, submitTitle }) => {
    return (
        <div className="flex items-end justify-end gap-2">

            {showCancel && (
                <Button
                    type="button"
                    variant='outline'
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            )}
            <Button
                type="submit"
                disabled={isDisabled}
                onClick={onSubmit}
            >
                {isLoading && <SpinnerIcon />}
                {submitTitle !== undefined ? submitTitle : 'Save changes'}
            </Button>
        </div>
    );
};

export default FormSubmitButtons