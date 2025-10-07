import TaskItem from './TaskItem.jsx';
import PropTypes from 'prop-types';

const styles = {
  empty: { textAlign: 'center', color: '#6b7280', fontSize: 14 },
  list: { display: 'flex', flexDirection: 'column', gap: 12 }
};

function TaskList({ tasks, onTaskCompleted }) {
  if (!tasks || tasks.length === 0) {
    return <p style={styles.empty}>No tasks to display</p>;
  }

  return (
    <div style={styles.list}>
      {tasks.map((task) => {
        if (typeof task !== 'object' || task === null) {
          return null; 
        }
        return <TaskItem key={task.id} task={task} onTaskCompleted={onTaskCompleted} />;
      })}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
};

export default TaskList;
