import React, { useState, useReducer, useCallback, useMemo } from "react";
import reducer from "../reducer";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Task } from "./";

import {
    ADD_TASK,
    DELETE_TASK,
    SET_TITLE_TASK,
    SET_DESCRIPTION_TASK,
    RECORD_TASK,
} from "../models";

const Group = ({
    id,
    groupTitle,
    tasks,
    handleDeleteGroups,
    handleSetGroupTitle,
}) => {
    const [lastTaskId, setLastTaskId] = useState(1);
    const [tasksList, dispatch] = useReducer(reducer, tasks || []);
    const [titleGroupIsOpen, setTitleGroupIsOpen] = useState(false);
    const [titleGroupValue, setTitleGroupValue] = useState("");

    const handleTitleChange = (e) => {
        setTitleGroupValue(e.target.value);
    };

    const handleAddTask = useCallback(() => {
        setLastTaskId((lastId) => +lastId + 1);
        dispatch({
            type: ADD_TASK,
            taskId: lastTaskId,
        });
    }, [lastTaskId, dispatch]);

    const handleDeleteTask = useCallback(
        (id) => {
            dispatch({
                type: DELETE_TASK,
                taskId: id,
            });
        },
        [dispatch]
    );

    const handleSetTitleTask = useCallback(
        (id, title) => {
            dispatch({
                type: SET_TITLE_TASK,
                taskId: id,
                taskTitle: title || "Aggiungi titolo",
            });
        },
        [dispatch]
    );

    const handleSetDescriptionTask = useCallback(
        (id, description) => {
            dispatch({
                type: SET_DESCRIPTION_TASK,
                taskId: id,
                taskDescription: description || "",
            });
        },
        [dispatch]
    );

    const handleDragEnd = ({ active, over }) => {
        if (active.id !== over.id) {
            const oldIndex = tasksList.findIndex(
                (task) => task.id === active.id
            );
            const newIndex = tasksList.findIndex((task) => task.id === over.id);

            dispatch({
                type: RECORD_TASK,
                oldIndex,
                newIndex,
            });
        }
    };

    const memoizedTaskList = useMemo(() => {
        return tasksList;
    }, [tasksList]);

    console.log(memoizedTaskList);

    return (
        <article className="w-[300px] min-h-[380px] rounded-xl -bg--groups-color items-center flex-shrink-0 flex flex-col">
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
