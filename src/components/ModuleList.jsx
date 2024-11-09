import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchModules, deleteModule } from '../features/modules/moduleSlice';
import { Link } from 'react-router-dom';

const ModuleList = () => {
  const dispatch = useDispatch();
  const { modules, status } = useSelector((state) => state.modules);

  useEffect(() => {
    dispatch(fetchModules());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      dispatch(deleteModule(id));
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-6xl p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">LISTE DES MODULES</h1>

      {/* Links to navigate */}
      <div className="mb-6 flex justify-end">
        <Link
          to="/add-module"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Module
        </Link>
      </div>

      {/* Table for Displaying Modules */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Code Module</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Intitulé Module</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Masse Horaire</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Filière</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Niveau</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Compétences</th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id} className="bg-white hover:bg-gray-100">
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{module.code}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{module.name}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{module.hours}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{module.field}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{module.level}</td>
                <td className="py-3 px-6 text-sm text-gray-700 border-b">{module.skills}</td>
                <td className="py-3 px-6 text-sm font-medium text-gray-700 border-b flex space-x-2">
                  <Link
                    to={`/edit-module/${module.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(module.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModuleList;
