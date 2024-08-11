import React from "react";
import { useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";

const Task = ({
    id,
    taskTitle,
    taskDescription,
    handleDeleteTask,
    handleSetTitleTask,
    handleSetDescriptionTask,
}) => {
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

    return (
        <li
            className={`w-full py-4 px-4 rounded-md flex transition-all -bg--tasks-color shadow-md ${
                isOpen
                    ? "flex-col gap-5"
                    : "flex-row justify-between hover:bg-[#444444] whitespace-nowrap overflow-x-hidden cursor-pointer"
            }`}
            onClick={() => {
                if (!titleIsOpen) {
                    setIsOpen(true);
                }
            }}
        >
            {isOpen ? (
                <>
                    {titleIsOpen ? (
                        <div className="">
                            <input
                                type="text"
                                value={titleValue}
                                placeholder={taskTitle || "Aggiungi titolo"}
                                className="w-full bg-transparent -text--text-color text-sm outline-none"
                                onChange={handleTitleChange}
                            />
                        </div>
                    ) : (
                        <h4
                            className="text-center font-semibold"
                            onClick={setTitleIsOpen}
                        >
                            {taskTitle}
                        </h4>
                    )}

                    {!descriptionIsOpen ? (
                        <p
                            className={` min-h-14 cursor-text ${
                                !taskDescription && "-text--add-group-color"
                            }`}
                            onClick={openDescriptionInput}
                        >
                            {taskDescription || "Aggiungi descrizione"}
                        </p>
                    ) : (
                        <textarea
                            onClick={(e) => e.stopPropagation()}
                            onChange={handleDescriptionChange}
                            value={descriptionValue}
                            rows={5}
                            className="w-full bg-transparent -text--text-color text-sm outline-none p-2 rounded-md border -border--add-group-color"
                            placeholder={
                                taskDescription || "Aggiungi descrizione"
                            }
                        ></textarea>
                    )}
                    <div className="flex justify-between">
                        <button
                            className="h-9 w-9 rounded-full -bg--add-group-color leading-7 hover:-bg--groups-color transition-colors active:scale-90"
                            onClick={handleDeleteTask}
                        >
                            <FaTrashAlt className="mx-auto text-sm" />
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                className="h-9 w-9 leading-7 text-center rounded-full -bg--add-group-color hover:-bg--groups-color transition-colors active:scale-90"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    if (titleIsOpen) {
                                        setTitleIsOpen();
                                    }
                                    if (descriptionIsOpen) {
                                        setDescriptionIsOpen();
                                    }
                                }}
                            >
                                {descriptionIsOpen || titleIsOpen ? (
                                    <IoClose className="text-2xl -text--null-button mx-auto" />
                                ) : (
                                    <IoIosArrowUp className="text-2xl -text--text-color mx-auto" />
                                )}
                            </button>
                            {(taskTitle !== titleValue ||
                                taskDescription !== descriptionValue) && (
                                <button
                                    className="h-9 w-9 leading-7 text-center rounded-full -bg--add-group-color hover:-bg--groups-color transition-colors active:scale-90"
                                    onClick={() => {
                                        handleSetTitleTask(titleValue);
                                        handleSetDescriptionTask(
                                            descriptionValue
                                        );
                                        setTitleIsOpen();
                                        setDescriptionIsOpen();
                                    }}
                                >
                                    <FaCheck className="text-xl -text--save-button mx-auto" />
                                </button>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {titleIsOpen ? (
                        <>
                            <input
                                type="text"
                                value={titleValue}
                                placeholder={taskTitle || "Aggiungi titolo"}
                                className="w-full bg-transparent -text--text-color text-sm outline-none"
                                onClick={(e) => e.stopPropagation()}
                                onChange={handleTitleChange}
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSetTitleTask(titleValue);
                                    setTitleIsOpen();
                                }}
                            >
                                <FaCheck className="text-xl hover:-text--save-button" />
                            </button>
                        </>
                    ) : (
                        <>
                            <span
                                className="text-ellipsis cursor-text"
                                onClick={openTitleInput}
                            >
                                {taskTitle}
                            </span>
                            <MdDragIndicator className="text-xl -text--add-group-color ml-2 cursor-grab active:cursor-grabbing" />
                        </>
                    )}
                </>
            )}
        </li>
    );
};

export default Task;
