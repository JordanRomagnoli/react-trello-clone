import React, { useReducer, useState } from "react";
import reducer from "../reducer";
import { Group } from "../components";
import { ADD_GROUP, DELETE_GROUP, SET_GROUP_TITLE } from "../models";

const Groups = () => {
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

    return (
        <div className="flex gap-6 items-start">
            <article
                className="w-[300px] min-h-[380px] rounded-xl border-2 -border--add-group-color flex-col p-6 flex items-center justify-center -text--add-group-color cursor-pointer flex-shrink-0 hover:-border--text-color hover:-text--text-color transition-colors"
                onClick={handleAddGroups}
            >
                <h3 className="text-5xl">+</h3>
            </article>
            {groups.map((group, idx) => {
                return (
                    <Group
                        key={group.id}
                        {...group}
                        handleDeleteGroups={handleDeleteGroups}
                        handleSetGroupTitle={handleSetGroupTitle}
                    />
                );
            })}
        </div>
    );
};

export default Groups;
