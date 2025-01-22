import { Edit2 } from "lucide-react";
import { Button } from "./ui/button";

interface EditButtonProps {
    onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
    <Button
        className="p-2 rounded-full w-10 h-10 shadow-md"
        onClick={onClick}
    >
        <Edit2 className="w-5 h-5" />
    </Button>
);

export default EditButton