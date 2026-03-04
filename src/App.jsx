import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/usuarios")
      .then(response => {
          console.log("Dados:", response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  }, []);
const criarUsuario = () => {
  api.post("/usuarios", {
    nome: "Paulo",
    email: "paulo@email.com"
  })
  .then(response => {
    // adiciona o novo usuário na lista atual
    setUsers(prev => [...prev, response.data]);
  })
  .catch(error => {
    console.error("Erro ao criar usuário:", error);
  });
}
const deletarUsuario = (id) => {
       api.delete(`/usuarios/${id}`)
         .then(() => {
           setUsers(users.filter(user => user.id !== id));
         })
         .catch(error => {
           console.error("Erro ao deletar:", error);
         });
     }
return (
    <div>
      <h1>Usuários cadastrados</h1>
      <button onClick={criarUsuario}>
        Criar Usuário
      </button>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nome} - {user.email}
            <button onClick={()=> deletarUsuario(user.id)}>
                deletar
                </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
