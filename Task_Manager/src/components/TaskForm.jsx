import { useRef } from 'react'

function TaskDialog({ labels, update, setUpdate, onCreate, onUpdate, setModal }) {

    const taskForm = useRef();

    const TextInput = ({ label, isRequired, children }) => (
        <div className="input-group">
            <label className="label">
                {label} {isRequired && <strong className="required">*</strong>}
            </label> {children}
        </div>
    );
    function setTask() {

        const form = taskForm.current;
        const inputs = form.querySelectorAll('.input');
        const task = {}; // set values

        for (const input of [...inputs]) {
            if (input.type !== 'checkbox') {
                task[input.id] = input.value.trim() || null;
            } else {
                task[input.id] = input.checked || null;
            } // get values
        }
        if (update) {
            task.id = update.id;
            onUpdate(task); setUpdate(null);
        } else {
            onCreate(task);
        }
        setModal(null);
    }
    return (
        <div className="box">
            <h3 className="title">{update ? 'Edit task' : 'Add new task'}</h3>
            <p className="hint">Data fileds marked with <strong className="required">*</strong> are mandatory.</p>
            <form ref={taskForm} onSubmit={(e) => {e.preventDefault(); setTask()}}>
                <div className="form-input">

                    <TextInput label="Title" isRequired>
                        <input className="input" id="title" type="text" required
                            defaultValue={update ? update.title : ''} />
                    </TextInput>

                    <TextInput label="Due date">
                        <input className="input" id="dueDate" type="date"
                            defaultValue={update ? update.dueDate : ''} />
                    </TextInput>

                    <div className="input-group select">
                        <label className="label">Label</label>
                        <select className="input" id="label" defaultValue={update ? update.label : ''}>
                            <option value="">none</option>
                            {labels.map(label => <option key={label} value={label}>{label}</option>)}
                        </select>
                    </div>

                    <div className="input-group priority">
                        <input className="input checkbox" id="priority" type="checkbox"
                            defaultChecked={update ? update.priority : null} />
                        <label htmlFor="priority">Mark as high priority</label>
                    </div>
                </div>
                <div className="form-action">
                    <button className="submit" id="submit_task" type="submit">
                        {update ? 'Edit task' : 'Add new task'}
                    </button>
                </div>
            </form>
            <button className="close" type="button" aria-label="close"
                onClick={() => {setModal(null); setUpdate(null)}}>
            </button>
        </div>
    );
}
export default TaskDialog