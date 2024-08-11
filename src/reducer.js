import {
    ADD_GROUP,
    DELETE_GROUP,
    SET_GROUP_TITLE,
    ADD_TASK,
    DELETE_TASK,
    SET_TITLE_TASK,
    SET_DESCRIPTION_TASK,
} from "./models";

export default function reducer(state, action) {
    // Group Manager

    if (action.type === ADD_GROUP) {
        return [...state, { id: action.nextId, groupTitle: "", tasks: [] }];
    }

    if (action.type === DELETE_GROUP) {
        return state.filter(({ id }) => action.id !== id);
    }

    if (action.type === SET_GROUP_TITLE) {
        return state.map((group) =>
            group.id === action.id
                ? { ...group, groupTitle: action.groupTitle }
                : group
        );
    }

    // Task manager

    if (action.type === ADD_TASK) {
        return [
            ...state,
            {
                id: action.taskId,
                taskTitle: "Aggiungi titolo",
                taskDescription: "",
            },
        ];
    }

    if (action.type === DELETE_TASK) {
        return state.filter((task) => action.taskId !== task.id);
    }

    if (action.type === SET_TITLE_TASK) {
        return state.map((task) =>
            action.taskId === task.id
                ? { ...task, taskTitle: action.taskTitle }
                : task
        );
    }

    if (action.type === SET_DESCRIPTION_TASK) {
        return state.map((task) =>
            action.taskId === task.id
                ? {
                      ...task,
                      taskDescription: action.taskDescription,
                  }
                : task
        );
    }

    return state;
}
