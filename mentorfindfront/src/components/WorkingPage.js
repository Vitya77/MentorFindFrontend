import React, {useState} from 'react';
import AIHelperComponent from './AIHelperComponent';
import ConferentionsComponent from './ConferentionsComponent';
import TasksComponent from './TasksComponent';
import NotificationsComponent from './NotificationsComponent';

const navItems = [
    { icon: 'fa-regular fa-bell', label: 'Сповіщення' },
    { icon: 'fa-solid fa-list-check', label: 'Завдання' },
    { icon: 'fa-solid fa-robot', label: 'Помічник' },
    { icon: 'fa-solid fa-phone', label: 'Конференції' },
  ];

const Items = [
    <NotificationsComponent></NotificationsComponent>,
    <TasksComponent></TasksComponent>,
    <AIHelperComponent></AIHelperComponent>,
    <ConferentionsComponent></ConferentionsComponent>
]

function WorkingPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNavClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="working-page">
            <div className="working-nav">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className={`working-nav-child ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleNavClick(index)}
                  >
                    <i className={item.icon} />
                    <span>{item.label}</span>
                  </div>
                ))}
            </div>
            <div className="item-container">
                {Items[activeIndex]}
            </div>
        </div>
    );
}
    
export default WorkingPage;