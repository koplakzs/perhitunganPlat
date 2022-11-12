import React, { useState, useEffect } from "react";
import { Container, Button, Table } from "react-bootstrap";
import Momen from "./Momen";
const Ultimit = (props) => {
  // Deklarasi Variabel
  const [berat, setBerat] = useState(0);
  const [pp, setPp] = useState(0);
  const [pd, setPd] = useState(0);
  const [aspal, setAspal] = useState(0);
  const [air, setAir] = useState(0);
  const [ultimit, setUltimit] = useState([]);
  const [life, setLife] = useState(0);
  const [show, setShow] = useState(false);
  const lifeInput = document.getElementById("life");
  let max = Math.max(...ultimit);
  // Use Effect
  useEffect(() => {
    ultimit.length !== 0 ? setShow(true) : setShow(false);
  }, [ultimit]);
  // Logic
  const resultUltimit = () => {
    if (berat && pp && pd && aspal && air && life !== 0) {
      if (air <= 20) {
        let totalD = berat + pp + pd + aspal;
        let newUltimit = 1.2 * totalD + 1.6 * life + 0.5 * air;
        setUltimit([...ultimit, newUltimit.toFixed(4)]);
        lifeInput.value = "";
      } else {
        alert(`Beban Air Hujan Maximal 20`);
      }
    } else {
      alert("Silahkan Isi Semua Nilai");
    }
  };

  return (
    <>
      <Container>
        <h2 className="text-center">Perhitungan Beban Ultimit</h2>
        <Table>
          <tbody>
            <tr>
              <td>Berat Sendiri</td>
              <td>
                <input onChange={(e) => setBerat(parseFloat(e.target.value))} />
              </td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Plafond + Penggantung</td>
              <td>
                <input onChange={(e) => setPp(parseFloat(e.target.value))} />
              </td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Plumbing + Ducting</td>
              <td>
                <input onChange={(e) => setPd(parseFloat(e.target.value))} />
              </td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Aspal</td>
              <td>
                <input onChange={(e) => setAspal(parseFloat(e.target.value))} />
              </td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Beban Air Hujan </td>
              <td>
                <input onChange={(e) => setAir(parseFloat(e.target.value))} />
              </td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Beban Hidup</td>
              <td>
                <input
                  id="life"
                  onChange={(e) => setLife(parseFloat(e.target.value))}
                />
              </td>
              <td>
                Kg/m<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td className="text-center" colSpan={3}>
                <Button onClick={() => resultUltimit()}>
                  Hitung Beban Ultimit
                </Button>
              </td>
            </tr>
            {ultimit.map((ultimits, key) => (
              <tr key={key}>
                <td>Beban Ultimit {key + 1}</td>
                <td>{ultimits}</td>
                <td>
                  Kg/m<sup>2</sup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {show ? (
        <Momen
          pmax={props.pmax}
          pmin={props.pmin}
          fy={props.fy}
          fc={props.fc}
          q={max}
        />
      ) : (
        ""
      )}
    </>
  );
};
export default Ultimit;
