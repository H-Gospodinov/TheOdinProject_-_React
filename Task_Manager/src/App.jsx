import { useCallback, useEffect, useRef, useState } from 'react'

import NavList from './components/Filters'
import LabelList from './components/Labels'
import TaskList from './components/Tasks'
import LabelDialog from './components/LabelForm'
import TaskDialog from './components/TaskForm'
import useActions from './components/actions'

import logo from './assets/logo.png'
import data from './data.json'

const taskData = Array.isArray(data) ? data.map(task => (
    {...task, id: crypto.randomUUID()}
)) : [];
const labelData = [...new Set(taskData.map(task => task.label))];

const currentTime = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // same format as in data.json
    return `${year}-${month}-${day}`;
})();

function App() {

    const [filter, setFilter] = useState({ name:'home', text:'All tasks' });
    const [toggle, setToggle] = useState(false);
    const [update, setUpdate] = useState(null);
    const [modal, setModal] = useState(null);

    const filters = useRef(null);

    const {tasks, createTask, updateTask, archiveTask, removeTask,
        labels, createLabel, updateLabel, removeLabel} =
        useActions(taskData, labelData);

    const editTask = useCallback((edit) => {
        setUpdate(edit); setModal('task')
    }, []);

    const editLabel = useCallback((edit) => {
        setUpdate(edit); setModal('label');
    }, []);

    useEffect(() => {
        const screenSize = window
            .matchMedia('(min-width: 901px)');
        const handleResize = (e) => {
            e.matches && setToggle(false);
        }
        screenSize.addEventListener('change', handleResize);
        return () => {
            screenSize.removeEventListener('change', handleResize);
        };
    }, [setToggle]);

    return (<>
        <header className="sidebar" ref={filters}>
            <div className="logo">
                <img src={logo} title="Task Manager" width="170" height="185" />
                <span>Task Manager</span>
            </div>
            <button className="menu-button" aria-label="Menu"
                onClick={() => setToggle(prev => !prev)}>
            </button>
            <nav className={`menu ${toggle ? 'active' :''}`}>
                <NavList onFilter={setFilter} active={setToggle} />
                <LabelList 
                    labels={labels} onFilter={setFilter} active={setToggle}
                    onEdit={editLabel} onRemove={removeLabel} />
            </nav>
        </header>
        <main className="board">
            <div className="header">
                <div className="display">
                    <h1 className="title">{filter.text}</h1>
                    <span className="date">{currentTime}</span>
                </div>
                <div className="action">
                    <button className="create add-task" type="button"
                        onClick={() => setModal('task')}>Create task
                    </button>
                    <button className="create add-label" type="button"
                        onClick={() => setModal('label')}>Create label
                    </button>
                </div>
            </div>
            <TaskList
                tasks={tasks} onEdit={editTask}
                onArchive={archiveTask} onRemove={removeTask}
                filter={filter} date={currentTime}
            />
            <div className={`modal ${modal ? 'active' :''}`}>
                {modal === 'task' &&
                <TaskDialog 
                    setModal={setModal} labels={labels} onCreate={createTask}
                    update={update ? tasks.find(task => task.id === update) : null} setUpdate={setUpdate}
                    onUpdate={(New) => updateTask(New)}
                />}
                {modal === 'label' &&
                <LabelDialog
                    setModal={setModal} labels={labels}
                    onCreate={createLabel} update={update} setUpdate={setUpdate}
                    onUpdate={(New) => updateLabel(New)}
                />}
            </div>
        </main>
        <footer className="footer">
            <span>Check source code on <a href="https://h-gospodinov.github.io/H-Gospodinov/" target="_blank" rel="noopener">GitHub</a></span>
        </footer>
    </>);
}
export default App