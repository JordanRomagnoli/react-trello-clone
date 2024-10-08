import React from "react";
import { useTaskList } from "../utils";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Task } from "./";

const Group = ({
    id,
    groupTitle,
    tasks,
    handleDeleteGroups,
    handleSetGroupTitle,
}) => {
    const {
        handleAddTask,
        handleDeleteTask,
        handleSetTitleTask,
        handleSetDescriptionTask,
        handleDragEnd,
        memoizedTaskList,
        titleGroupIsOpen,
        setTitleGroupIsOpen,
        titleGroupValue,
        handleTitleChange,
    } = useTaskList(tasks);

    return (
        <article className="w-[300px] min-h-[380px] max-h-[800px] overflow-auto text-area-no-scroll rounded-xl -bg--groups-color items-center flex-shrink-0 flex flex-col">
            <header className="w-full mb-3 py-3 flex justify-between px-3 font-semibold text-lg -text--add-group-color">
                {titleGroupIsOpen ? (
                    <>
                        <input
                            type="text"
                            placeholder={groupTitle || "Aggiungi titolo"}
                            className="w-full bg-transparent text-sm -text--text-colort outline-none placeholder:-text--add-group-color"
                            value={titleGroupValue}
                            onChange={handleTitleChange}
                        ></input>

                        <button
                            className="hover:-text--text-color"
                            onClick={() => {
                                handleSetGroupTitle(id, titleGroupValue);
                                setTitleGroupIsOpen(!titleGroupIsOpen);
                            }}
                        >
                            <FaCheck className="text-xl" />
                        </button>
                    </>
                ) : (
                    <>
                        <h3
                            onClick={() =>
                                setTitleGroupIsOpen(!titleGroupIsOpen)
                            }
                        >
                            {groupTitle || "Aggiungi un titolo"}
                        </h3>

                        <button
                            className="hover:-text--text-color"
                            onClick={() => handleDeleteGroups(id)}
                        >
                            <IoClose className="text-xl" />
                        </button>
                    </>
                )}
            </header>
            <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
            >
                <ul className="px-3 pb-5 w-full flex flex-col-reverse gap-2 flex-grow justify-end">
                    <SortableContext
                        items={memoizedTaskList}
                        strategy={verticalListSortingStrategy}
                    >
                        {memoizedTaskList.map((task) => (
                            <Task
                                key={task.id}
                                {...task}
                                handleDeleteTask={() =>
                                    handleDeleteTask(task.id)
                                }
                                handleSetTitleTask={(title) =>
                                    handleSetTitleTask(task.id, title)
                                }
                                handleSetDescriptionTask={(description) =>
                                    handleSetDescriptionTask(
                                        task.id,
                                        description
                                    )
                                }
                            />
                        ))}
                    </SortableContext>
                    <li
                        className="w-full py-4 px-2 rounded-md text-center border-2 -text--add-group-color -border--tasks-color cursor-pointer hover:-border--text-color hover:-text--text-color transition-colors"
                        onClick={handleAddTask}
                    >
                        <span>+</span>
                    </li>
                </ul>
            </DndContext>
        </article>
    );
};

export default Group;
