import { useMemo, useState } from 'react'

function useActions(taskData, labelData) {

    const [tasks, setTasks] = useState(taskData);
    const [labels, setLabels] = useState(labelData.filter(Boolean));

    // ACTIONS (tasks & labels)

    const actions = useMemo(() => ({

        createTask: (create) => {
            create.id = crypto.randomUUID();
            setTasks(prev => [...prev, create]);
        },

        updateTask: (update) => {
            setTasks(prev => prev.map(task => task.id === update.id ? update : task));
        },

        archiveTask: (archive) => {
            setTasks(prev => prev.map(task => task.id === archive ?
                { ...task, completed: !task.completed } : task));
        },

        removeTask: (remove) => {
            setTasks(prev => prev.filter(task => task.id !== remove));
        },

        createLabel: (create) => {
            setLabels(prev => [...prev, create]);
        },

        updateLabel: (update) => {
            const [get, set] = update;
            setLabels(prev => prev.map(label => label === get ? set : label));
            setTasks(prev => prev.map(task => task.label === get ? { ...task, label: set } : task));
        },

        removeLabel: (remove) => {
            setLabels(prev => prev.filter(label => label !== remove));
            setTasks(prev => prev.map(task => task.label === remove ? { ...task, label: null } : task));
        },

    }), [setTasks, setLabels]);

    return { tasks, labels, ...actions };
}
export default useActions;