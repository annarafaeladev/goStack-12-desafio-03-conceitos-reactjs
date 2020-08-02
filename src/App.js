import React, { useEffect, useState } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const result = await api.get("repositories");

    if (result.status) {
      setData(result.data);
    }
  }
  async function handleAddRepository() {
    const result = await api.post("repositories", {
      title: `Repository ${Date.now()}`,
      url: "https://github.com/Anna18921",
      techs: ["teste1", "teste2"],
    });

    if (result.status) {
      setData([...data, result.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const result = await api.delete(`repositories/${id}`);

    if (result.status) {
      const repositories = data.filter((repository) => repository.id !== id);
      setData(repositories);
    }
  }

  return (
    <div>
      <h1>Lista de Repositorios </h1>
      <ul data-testid="repository-list">
        {data.map((repository) => (
          <li key={repository.id}>
            {repository.title}{" "}
            <a href={repository.url} target="blank">
              url
            </a>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
