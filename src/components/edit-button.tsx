import { Edit2 } from "lucide-react";
import { Button } from "./ui/button";

interface EditButtonProps {
    onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
    const onClickHandler = onClick == undefined ? undefined : (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        onClick()
    }
    return (
        <Button
            className="p-2 rounded-full w-10 h-10 shadow-md"
            onClick={onClickHandler}
        >
            <Edit2 className="w-5 h-5" />
        </Button>
    )

}

export default EditButton