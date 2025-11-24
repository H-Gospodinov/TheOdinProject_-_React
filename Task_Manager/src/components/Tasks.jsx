import TaskItem from './Task';

function TaskList({ tasks, filter, date, onEdit, onArchive, onRemove }) {

    const displayTasks = (() => {
        switch (filter.name) {
            case 'home': return tasks;
            case 'important': return tasks.filter(task => task.priority === true);
            case 'upcoming': return tasks.filter(task => task.dueDate >= date);
            case 'overdue': return tasks.filter(task => task.dueDate ? task.dueDate < date : false);
            case 'archive': return tasks.filter(task => task.completed === true);
            case 'label': return tasks.filter(task => task.label === filter.text);
            default: return tasks;
    }})();

    return (
        <div className="content">
            <div className="ghead">
                <span className="text">Description</span>
                <span className="text">Due date</span>
                <span className="text">Label</span>
                <span className="text">Actions</span>
            </div>
            <div className="grid">
                {displayTasks.map(task =>
                    <TaskItem key={task.id} {...task} task={task} onEdit={onEdit}
                        onArchive={onArchive} onRemove={onRemove}
                    />
                )}
            </div>
        </div>
    );
} export default TaskList