import { useReducer, useMemo } from "react";
import reducer from "../reducer";

import { ADD_GROUP, DELETE_GROUP, SET_GROUP_TITLE } from "../models";

const useGroups = () => {
    const [groups, dispatch] = useReducer(reducer, [
        {
            id: 1,
            groupTitle: "Gruppo 1",
            tasks: [],
        },
    ]);

    const handleAddGroups = () => {
        dispatch({
            type: ADD_GROUP,
            nextId:
                groups.length > 0
                    ? Number(groups[groups.length - 1].id) + 1
                    : 1,
        });
    };

    const handleDeleteGroups = (id) => {
        dispatch({
            type: DELETE_GROUP,
            id: id,
        });
    };

    const handleSetGroupTitle = (id, title) => {
        dispatch({
            type: SET_GROUP_TITLE,
            id: id,
            groupTitle: title,
        });
    };

    const memoizedGroups = useMemo(() => {
        return groups;
    }, [groups]);

    return {
        memoizedGroups,
        handleAddGroups,
        handleDeleteGroups,
        handleSetGroupTitle,
    };
};

export default useGroups;
