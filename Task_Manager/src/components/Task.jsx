import { memo } from 'react'

function TaskItem({ onEdit, onArchive, onRemove,
    id, title, dueDate, label, priority, completed }) {

    return (
        <div className={
            `task ${priority ? 'prioritize' :''} ${completed ? 'completed' :''}`
        }>
            <div className="data main">
                <span>{title}</span>
            </div>
            <div className="data">{dueDate}</div>
            <div className="data">{label}</div>
            <div className="data">
                <button className={`task-btn ${completed ? 'restore' : 'complete'}`}
                    type="button" title={completed ? 'restore' : 'complete'}
                    onClick={() => onArchive(id)}>
                </button>
                <button className="task-btn edit-task" type="button" title="edit"
                    onClick={() => onEdit(id)}>
                </button>
                <button className="task-btn remove-task" type="button" title="delete"
                    onClick={() => onRemove(id)}>
                </button>
            </div>
        </div>
    );
} export default memo(TaskItem)