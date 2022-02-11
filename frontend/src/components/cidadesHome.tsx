import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./cidadesHome.css";

import bc from "../pages/assets/bc.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import json from "../components/jsonFile";

function CardCidades() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [cidades, setcidades] = useState([]);
  const [fotos, setFotos] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      let fotos = await json.getHomeCityList();
      setFotos(fotos);
    };
    loadAll();
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/cidadesdisponiveis")
      .then((response) => {
        setcidades(response.data.lista);
      })
      .catch(() => {
        console.log("Deu errado");
      });
  }, []);

  return (
    <>
      <Container>
        <h2 className="h2">Descubra novas cidades</h2>
        <Carousel
          responsive={responsive}
          keyBoardControl={false}
          showDots={false}
          arrows={true}
          autoPlay={true}
        >
          {
          cidades != null &&
          cidades.map((cidade, key) => {
           var test = fotos.find((element) => {
            return element.codigo === cidade.codigo;
          })
          if(test != null){
            console.log("rest",test.url)
            return (
              <>
                <div key={key}>
                  <a href="#">
                    <div className="card_1">
                  <img className="img-fluid" src={test.url} alt="" key={key}/>
                      <div className="card_1__name">
                        <a href={cidade.codigo}>
                          <p>{cidade.nome}</p>
                        </a>
                      </div>
                    </div>
                  </a>
                </div>
              </>
            );
          }
          })}
        </Carousel>
      </Container>
    </>
  );
}

export default CardCidades;
