import React, { ChangeEvent, FormEvent, useState } from "react";
import { categories } from "../assets/categoriesData";
import "./ParametersForm.css";

interface Props {
  startGame: () => void;
}

const ParametersForm = ({ startGame }: Props) => {
  // Initializing state for each form field
  const [formData, setFormData] = useState({
    numberOfQuestions: "10",
    category: "any",
    difficulty: "any",
    type: "multipleChoice",
  });

  // Handler for form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Why this is not working?");
    console.log(formData); // Process or send this data
    startGame();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Number of Questions:</label>
        <input
          type="number"
          name="numberOfQuestions"
          value={formData.numberOfQuestions}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Select Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Any Category</option>{" "}
          {/* Optional: Default option */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Select Difficulty:</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="form-group">
        <label>Select Type:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="multipleChoice">Multiple Choice</option>
          <option value="trueFalse">True/False</option>
        </select>
      </div>
      <div className="button-container">
        <button className="buttonStart" type="submit">
          Start
        </button>
      </div>
    </form>
  );
};

export default ParametersForm;
