function NavList({ onFilter, active }) {

    const navItems = [
        {name: 'home', text: 'All tasks'},
        {name: 'important', text: 'High priority'},
        {name: 'upcoming', text: 'Upcoming'},
        {name: 'overdue', text: 'Overdue'},
        {name: 'archive', text: 'Archive'},
    ];
    return (
        <ul className="nav-list">
            {navItems.map(item =>
                <li key={item.name} className={`nav-item ${item.name}`}>
                    <button className="nav-link" type="button"
                        onClick={() => {
                            onFilter({name: item.name, text: item.text});
                            active(false); // mobile menu
                        }}>
                        {item.text}
                    </button>
                </li>
            )}
        </ul>
    );
} export default NavList