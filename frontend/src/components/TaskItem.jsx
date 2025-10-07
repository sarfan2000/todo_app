import PropTypes from 'prop-types';

function TaskItem({ task, onTaskCompleted }) {
  const handleComplete = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/tasks/${task.id}/complete`, { method: 'PUT' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to complete task');
      onTaskCompleted(task.id);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 rounded-lg border border-gray-300 bg-gray-300">
      <div>
        <div className="font-semibold">{task.title}</div>
        <div>{task.description}</div>
      </div>
      {!task.completed && (
        <button
          className="mt-4 px-3 py-1.5 rounded-md bg-gray-200 text-gray-900 border-none cursor-pointer"
          onClick={handleComplete}
        >
          Done
        </button>
      )}
    </div>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool,
  }).isRequired,
  onTaskCompleted: PropTypes.func.isRequired,
};

export default TaskItem;
