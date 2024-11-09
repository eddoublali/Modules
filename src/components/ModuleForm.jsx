import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addModule, updateModule } from '../features/modules/moduleSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ModuleForm = () => {
  const { id } = useParams();  // To get the id from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modules } = useSelector((state) => state.modules);
  
  // Form state
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    hours: '',
    field: '',
    level: '',
    skills: '',
  });

  // Error state
  const [errors, setErrors] = useState({
    code: '',
    name: '',
    hours: '',
    field: '',
    level: '',
    skills: '',
  });

  // Pre-populate form for editing
  useEffect(() => {
    if (id) {
      const moduleToEdit = modules.find((module) => module.id === id);
      if (moduleToEdit) {
        setFormData(moduleToEdit);
      }
    }
  }, [id, modules]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Check if fields are empty
    if (!formData.code) {
      newErrors.code = 'Code is required';
      valid = false;
    }
    if (!formData.name) {
      newErrors.name = 'Module name is required';
      valid = false;
    }
    if (!formData.hours || isNaN(formData.hours) || formData.hours <= 0) {
      newErrors.hours = 'Valid hours are required';
      valid = false;
    }
    if (!formData.field) {
      newErrors.field = 'Field is required';
      valid = false;
    }
    if (!formData.level) {
      newErrors.level = 'Level is required';
      valid = false;
    }
    if (!formData.skills) {
      newErrors.skills = 'Skills are required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        // Update existing module
        dispatch(updateModule({ ...formData, id: id }));

      } else {
        // Add a new module
        dispatch(addModule(formData));
      }
      navigate('/'); // Redirect to the main module list page after submission
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-4xl p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {id ? 'Modify Module' : 'Add New Module'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Code Module
            </label>
            <input
              type="text"
              name="code"
              placeholder="Code Module"
              value={formData.code}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md border ${errors.code ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Intitule Module
            </label>
            <input
              type="text"
              name="name"
              placeholder="Intitule Module"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
              Masse Horaire
            </label>
            <input
              type="number"
              name="hours"
              placeholder="Masse Horaire"
              value={formData.hours}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md border ${errors.hours ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.hours && <p className="text-red-500 text-sm">{errors.hours}</p>}
          </div>
          <div>
            <label htmlFor="field" className="block text-sm font-medium text-gray-700">
              Filiere
            </label>
            <input
              type="text"
              name="field"
              placeholder="Filiere"
              value={formData.field}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md border ${errors.field ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.field && <p className="text-red-500 text-sm">{errors.field}</p>}
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Niveau
            </label>
            <input
              type="text"
              name="level"
              placeholder="Niveau"
              value={formData.level}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md border ${errors.level ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
          </div>
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
              Compétences
            </label>
            <input
              type="text"
              name="skills"
              placeholder="Compétences"
              value={formData.skills}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md border ${errors.skills ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {id ? 'Modify Module' : 'Add Module'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModuleForm;
