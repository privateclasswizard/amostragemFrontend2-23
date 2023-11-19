import React from "react";
import Header from "../../component/Header/Header";
import Table from "../../component/Calendar/Calendar.js";

function Home() {
  return (
    <>
      <Header />
      <section>
        <div className="containerHomer">
          <h1 className="tituloPagina">Calendario Semanal</h1>
          <Table></Table>
          </div>
      </section>
    </>
  );
}

export default Home;
