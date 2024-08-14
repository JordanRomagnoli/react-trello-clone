import { useCallback, useState, useReducer, useMemo } from "react";
import reducer from "../reducer";

import {
    ADD_TASK,
    DELETE_TASK,
    SET_TITLE_TASK,
    SET_DESCRIPTION_TASK,
    RECORD_TASK,
} from "../models";

const useTasks = (tasks) => {
    const [lastTaskId, setLastTaskId] = useState(1);
    const [tasksList, dispatch] = useReducer(reducer, tasks || []);
    const [titleGroupIsOpen, setTitleGroupIsOpen] = useState(false);
    const [titleGroupValue, setTitleGroupValue] = useState("");

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

    const handleTitleChange = (e) => {
        setTitleGroupValue(e.target.value);
    };

    return {
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
    };
};

export default useTasks;
