import React from "react";
import api from "../../services/api";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Content, Card } from "./styles";
import { FaSpinner } from "react-icons/fa";

const FirstList = () => {
  const [clientsOrderedByPurchase, setClientsOrdered] = useState([]);
  const [loading, setLoading] = useState(false);
  const link = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    api.get("clientsOrderedByPurchase").then((response) => {
      setClientsOrdered(response.data);
      setLoading(false);
    });
  };
  return (
    <Container>
      <h1>Clientes com maior valor em compras em 2016</h1>
      <Content>
        {loading && (
          <div className="overlay">
            <FaSpinner id="spinner" color="#FFF" size={100} />
          </div>
        )}
        {clientsOrderedByPurchase.map((client) => (
          <Card>
            <p>Cliente: {client.nome}</p>
            <p>
              Valor total gasto:{" "}
              {client.valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </Card>
        ))}
      </Content>
      <button
        onClick={(e) => {
          e.preventDefault();
          link.push("/");
        }}
      >
        Voltar
      </button>
    </Container>
  );
};

export default FirstList;
