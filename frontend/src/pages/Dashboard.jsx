import { TaskBoard } from "../components/TaskBoard.jsx";

function Dashboard() {
  return (
    <>
      <nav className="bg-blue-800 p-2">
        <h1 className="text-3xl text-white font-medium mx-4">Dashboard</h1>
      </nav>
      <TaskBoard />
    </>
  );
}

export default Dashboard;
