import React from "react";
import { Group } from "../components";
import { useGroups } from "../utils";

const Groups = () => {
    const {
        memoizedGroups,
        handleAddGroups,
        handleDeleteGroups,
        handleSetGroupTitle,
    } = useGroups();

    return (
        <div className="flex gap-6 items-start">
            <article
                className="w-[300px] min-h-[380px] rounded-xl border-2 -border--add-group-color flex-col p-6 flex items-center justify-center -text--add-group-color cursor-pointer flex-shrink-0 hover:-border--text-color hover:-text--text-color transition-colors"
                onClick={handleAddGroups}
            >
                <h3 className="text-5xl">+</h3>
            </article>
            {memoizedGroups.map((group) => {
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
