import { useState } from "react";

const useTask = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [descriptionIsOpen, setDescriptionIsOpen] = useState(false);
    const [titleIsOpen, setTitleIsOpen] = useState(true);
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");

    const openTitleInput = (e) => {
        e.stopPropagation();

        setTitleIsOpen(!titleIsOpen);
    };

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };

    const openDescriptionInput = (e) => {
        e.stopPropagation();

        setDescriptionIsOpen(!descriptionIsOpen);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    };

    return {
        isOpen,
        setIsOpen,
        openTitleInput,
        titleIsOpen,
        setTitleIsOpen,
        descriptionIsOpen,
        openDescriptionInput,
        setDescriptionIsOpen,
        titleValue,
        handleTitleChange,
        descriptionValue,
        handleDescriptionChange,
    };
};

export default useTask;
