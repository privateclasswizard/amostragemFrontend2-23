import React, { useState, useEffect } from "react";
import Header from "../../component/Header/Header";
import "../../assets/css/FormMateria.css";

function FormMateria() {
  const [materias, setMaterias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [salas, setSalas] = useState([]);

  const [novaMateria, setNovaMateria] = useState({
    nomeMateria: "",
    periodoMateria: "",
    professorMateria: "",
    dataInicioMateria: "",
    dataFimMateria: "",
    diaSemanaMateria: "",
    horarioMateria: "",
    salaMateria: "",
  });

  const [materiaEditando, setMateriaEditando] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const storedMaterias = JSON.parse(localStorage.getItem("materia")) || [];
    setMaterias(storedMaterias);

    const storedSalas = JSON.parse(localStorage.getItem("salas")) || [];
    const storedPeriodos = JSON.parse(localStorage.getItem("periodos")) || [];
    const storedProfessores =
      JSON.parse(localStorage.getItem("professores")) || [];
    setProfessores(storedProfessores);
    setPeriodos(storedPeriodos);
    setSalas(storedSalas);
  }, []);

  const adicionarMateria = () => {
    try {
      if (
        novaMateria.nomeMateria &&
        novaMateria.periodoMateria &&
        novaMateria.professorMateria &&
        novaMateria.salaMateria &&
        novaMateria.dataInicioMateria &&
        novaMateria.dataFimMateria &&
        novaMateria.diaSemanaMateria &&
        novaMateria.horarioMateria
      ) {
        const novaMateriaComID = {
          ...novaMateria,
          id: new Date().getTime(), // Atribui um ID único à matéria
        };

        const updatedMaterias = [...materias, novaMateriaComID];
        setMaterias(updatedMaterias);

        // Salva a matéria no localStorage
        localStorage.setItem("materia", JSON.stringify(updatedMaterias));

        // Limpa o formulário após adicionar
        setNovaMateria({
          nomeMateria: "",
          periodoMateria: "",
          professorMateria: "",
          dataInicioMateria: "",
          dataFimMateria: "",
          diaSemanaMateria: "",
          horarioMateria: "",
          salaMateria: "",
        });
      } else {
        alert("Preencha todos os campos!");
      }
    } catch (error) {
      console.error("Erro ao adicionar matéria", error);
    }
  };

  const preencherCamposDeEdicao = (index) => {
    const materiaParaEditar = materias[index];
    setMateriaEditando(materiaParaEditar);
    setNovaMateria({
      nomeMateria: materiaParaEditar.nome,
      periodoMateria: materiaParaEditar.periodoMateria,
      professorMateria: materiaParaEditar.professorMateria,
      dataInicioMateria: materiaParaEditar.dataInicioMateria,
      dataFimMateria: materiaParaEditar.dataFimMateria,
      diaSemanaMateria: materiaParaEditar.diaSemanaMateria,
      horarioMateria: materiaParaEditar.horarioMateria,
      salaMateria: materiaParaEditar.salaMateria,
    });
    setEditando(true);
  };

  const confirmarEdicao = () => {
    try {
      const materiasAtualizadas = [...materias];
      materiasAtualizadas[materias.indexOf(materiaEditando)] = novaMateria;
      setMaterias(materiasAtualizadas);
      setMateriaEditando(null);
      setNovaMateria({
        nomeMateria: "",
        periodoMateria: "",
        professorMateria: "",
        dataInicioMateria: "",
        dataFimMateria: "",
        diaSemanaMateria: "",
        horarioMateria: "",
        salaMateria: "",
      });
      setEditando(false);
      localStorage.setItem("materia", JSON.stringify(materiasAtualizadas));
    } catch (error) {
      console.error("Erro ao confirmar edição", error);
    }
  };

  const cancelarEdicao = () => {
    setMateriaEditando(null);
    setNovaMateria({
      nomeMateria: "",
      periodoMateria: "",
      professorMateria: "",
      dataInicioMateria: "",
      dataFimMateria: "",
      diaSemanaMateria: "",
      horarioMateria: "",
      salaMateria: "",
    });
    setEditando(false);
  };

  const excluirMateria = (index) => {
    const novasMaterias = materias.filter((materia, i) => i !== index);
    setMaterias(novasMaterias);
    setMateriaEditando(null);
    setNovaMateria({
      nomeMateria: "",
      periodoMateria: "",
      professorMateria: "",
      dataInicioMateria: "",
      dataFimMateria: "",
      diaSemanaMateria: "",
      horarioMateria: "",
      salaMateria: "",
    });
    setEditando(false);
    localStorage.setItem("materia", JSON.stringify(novasMaterias));
  };

  return (
    <>
      <Header />
      <div className="section1FormMaterias">
        <h1 className="tituloPagina">Cadastro de Matérias</h1>
        <div className="containerFormMaterias">
          <div className="cadastroFormularioMaterias">
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Nome da Matéria:</label>
              <input
                className="inputCampoMateria"
                placeholder="Digite o nome da matéria"
                id="nomeMateria"
                value={novaMateria.nomeMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    nomeMateria: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Períodos:</label>
              <select
                className="selectCampoMateria"
                id="periodosMateria"
                value={novaMateria.periodosMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    periodoMateria: e.target.value,
                  })
                }
              >
                <option value="">Selecione um periodo</option>
                {periodos.map((periodo) => (
                  <option key={periodo.id} value={periodo.id}>
                    {periodo.numeroPeriodo}
                  </option>
                ))}
              </select>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Professor:</label>
              <select
                className="selectCampoMateria"
                id="professorMateria"
                value={novaMateria.professorMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    professorMateria: e.target.value,
                  })
                }
              >
                <option value="">Selecione um professor</option>
                {professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Sala:</label>
              <select
                className="selectCampoMateria"
                id="salaMateria"
                value={novaMateria.salaMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    salaMateria: e.target.value,
                  })
                }
              >
                <option value="">Selecione uma sala</option>
                {salas.map((sala) => (
                  <option key={sala.id} value={sala.id}>
                    {sala.numero}
                  </option>
                ))}
              </select>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Data de Início:</label>
              <input
                className="inputCampoMateria"
                placeholder="Digite a data de início"
                id="dataInicioMateria"
                type="date"
                value={novaMateria.dataInicioMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    dataInicioMateria: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Data de Fim:</label>
              <input
                className="inputCampoMateria"
                placeholder="Digite a data de fim"
                id="dataFimMateria"
                type="date"
                value={novaMateria.dataFimMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    dataFimMateria: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Dia da Semana:</label>
              <select
                className="selectCampoMateria"
                id="diaSemanaMateria"
                value={novaMateria.diaSemanaMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    diaSemanaMateria: e.target.value,
                  })
                }
              >
                <option value="">Selecione um dia da semana</option>
                <option value="Domigo">Domigo</option>
                <option value="Segunda">Segunda</option>
                <option value="Terça">Terça</option>
                <option value="Quarta">Quarta</option>
                <option value="Quinta">Quinta</option>
                <option value="Sexta">Sexta</option>
                <option value="Sabado">Sabado</option>
              </select>
            </div>
            <div className="divCampoMateria">
              <label className="labelCampoMateria">Horário:</label>

              <input
                className="inputCampoMateria"
                placeholder="Digite o horário"
                id="horarioMateria"
                value={novaMateria.horarioMateria}
                onChange={(e) =>
                  setNovaMateria({
                    ...novaMateria,
                    horarioMateria: e.target.value,
                  })
                }
              ></input>
            </div>
            {editando ? (
              <>
                <button
                  type="button"
                  onClick={confirmarEdicao}
                  className="btnEditarMateria"
                >
                  Confirmar Edição
                </button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="btnCancelarEdicaoMateria"
                >
                  Cancelar Edição
                </button>
              </>
            ) : (
              <button
              type="submit"
              className="btnSubmitFormMaterias"
              onClick={adicionarMateria}
            >
              Salvar
            </button>
            )}

          </div>
        </div>
        <div className="containerTabelaMaterias">
          <table>
            <thead>
              <tr>
                <th>Nome da Matéria</th>
                <th>Períodos</th>
                <th>Professor</th>
                <th>Data de Início</th>
                <th>Data de Fim</th>
                <th>Dia da Semana</th>
                <th>Horário</th>
                <th>Sala</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <tr key={materia.id}>
                  <td className="tdforms">{materia.nomeMateria}</td>
                  <td className="tdforms">{materia.periodoMateria}</td>
                  <td className="tdforms">{materia.professorMateria}</td>
                  <td className="tdforms">{materia.dataInicioMateria}</td>
                  <td className="tdforms">{materia.dataFimMateria}</td>
                  <td className="tdforms">{materia.diaSemanaMateria}</td>
                  <td className="tdforms">{materia.horarioMateria}</td>
                  <td className="tdforms">{materia.salaMateria}</td>
                  <td className="tdforms">
                    <button onClick={() => preencherCamposDeEdicao(index)}>
                      Editar
                    </button>
                  </td>
                  <td className="tdforms">
                    <button onClick={() => excluirMateria(index)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default FormMateria;
