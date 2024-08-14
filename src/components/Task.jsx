import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "./";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { useTask } from "../utils";

const Task = ({
    id,
    taskTitle,
    taskDescription,
    handleDeleteTask,
    handleSetTitleTask,
    handleSetDescriptionTask,
}) => {
    const {
        isOpen,
        setIsOpen,
        titleIsOpen,
        setTitleIsOpen,
        openTitleInput,
        descriptionIsOpen,
        setDescriptionIsOpen,
        openDescriptionInput,
        titleValue,
        descriptionValue,
        handleTitleChange,
        handleDescriptionChange,
    } = useTask();

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <li
            className={`w-full py-4 px-4 rounded-md shrink-0 flex transition-all -bg--tasks-color shadow-md ${
                isOpen
                    ? "flex-col gap-5"
                    : "flex-row justify-between hover:bg-[#444444] cursor-pointer whitespace-nowrap overflow-hidden"
            }`}
            onClick={() => {
                if (!titleIsOpen) {
                    setIsOpen(true);
                }
            }}
            ref={setNodeRef}
            style={style}
        >
            {isOpen ? (
                <>
                    {titleIsOpen ? (
                        <div className="">
                            <input
                                type="text"
                                value={titleValue || ""}
                                placeholder={taskTitle || "Aggiungi titolo"}
                                className="w-full bg-transparent -text--text-color text-sm outline-none"
                                onChange={handleTitleChange}
                            />
                        </div>
                    ) : (
                        <h4
                            className=" font-semibold text-wrap overflow-ellipsis overflow-hidden"
                            onClick={setTitleIsOpen}
                        >
                            {taskTitle}
                        </h4>
                    )}

                    {!descriptionIsOpen ? (
                        <p
                            className={` min-h-14 cursor-text w-full text-wrap overflow-auto break-words ${
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
                            value={descriptionValue || ""}
                            rows={5}
                            className="text-area-no-scroll scrol w-full bg-transparent -text--text-color text-sm outline-none p-2 rounded-md border -border--add-group-color"
                            placeholder={
                                taskDescription || "Aggiungi descrizione"
                            }
                        ></textarea>
                    )}
                    <div className="flex justify-between">
                        <Button
                            bgColor="-bg--add-group-color"
                            hoverBgColor="-bg--groups-color"
                            handleFunction={handleDeleteTask}
                            Icon={FaTrashAlt}
                        />

                        <div className="flex items-center gap-3">
                            <Button
                                bgColor="-bg--add-group-color"
                                hoverBgColor="-bg--groups-color"
                                handleFunction={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    if (titleIsOpen) {
                                        setTitleIsOpen();
                                    }
                                    if (descriptionIsOpen) {
                                        setDescriptionIsOpen();
                                    }
                                }}
                                Icon={
                                    descriptionIsOpen || titleIsOpen
                                        ? IoClose
                                        : IoIosArrowUp
                                }
                                iconClass={
                                    (descriptionIsOpen || titleIsOpen) &&
                                    "-text--null-button"
                                }
                            />

                            {(taskTitle !== titleValue ||
                                taskDescription !== descriptionValue) && (
                                <Button
                                    bgColor="-bg--add-group-color"
                                    hoverBgColor="-bg--groups-color"
                                    handleFunction={() => {
                                        handleSetTitleTask(titleValue);
                                        handleSetDescriptionTask(
                                            descriptionValue
                                        );
                                        setTitleIsOpen();
                                        setDescriptionIsOpen();
                                    }}
                                    Icon={FaCheck}
                                    iconClass="-text--save-button"
                                />
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
                                className="w-[85%] bg-transparent -text--text-color text-sm outline-none"
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
                                className="text-ellipsis cursor-text w-auto max-w-[90%] overflow-hidden overflow-ellipsis"
                                onClick={openTitleInput}
                            >
                                {taskTitle}
                            </span>
                            <MdDragIndicator
                                className="text-xl -text--add-group-color ml-2 cursor-grab active:cursor-grabbing outline-none"
                                {...(!isOpen && !titleIsOpen
                                    ? { ...attributes, ...listeners }
                                    : {})}
                            />
                        </>
                    )}
                </>
            )}
        </li>
    );
};

export default Task;
