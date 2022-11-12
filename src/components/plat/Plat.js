import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Ultimit from "./Ultimit";
const Plat = () => {
  // Deklarasi State Inputan
  const [fy, setFy] = useState(0);
  const [fc, setFc] = useState(0);
  const [b1, setB1] = useState(0);
  const [pb, setPb] = useState(0);
  const [pmax, setPmax] = useState(0);
  const [pmin, setPmin] = useState(0);
  // boolean
  const [show, setShow] = useState(false);
  // effect
  useEffect(() => {
    pb !== 0 ? setShow(true) : setShow(false);
  }, [pb]);
  // Logic
  const keseimbangan = () => {
    if (b1 > 0.85 || b1 < 0.65) {
      alert("Nilai β1 harus di antara 0,65 dan 0.85");
    } else {
      if (fy && fc && b1 !== 0) {
        let newPb = ((0.85 * fc * b1) / fy) * (600 / (600 + fy));
        let newPmax = newPb * 0.75;
        let newPmin = 1.4 / fy;
        setPmax(newPmax.toFixed(4));
        setPmin(newPmin.toFixed(4));
        setPb(newPb.toFixed(4));
      } else {
        alert("Silahkan Isi Semua Nilai");
      }
    }
  };

  return (
    <>
      <h2 className="text-center">Perhitungan Keseimbangan</h2>
      <Container>
        <Table>
          <tbody>
            <tr>
              <td>Mutu Beton (fc)</td>
              <td>
                <input onChange={(e) => setFc(parseFloat(e.target.value))} />
              </td>
              <td>MPa</td>
            </tr>
            <tr>
              <td>Mutu Baja (fy)</td>
              <td>
                <input onChange={(e) => setFy(parseFloat(e.target.value))} />
              </td>
              <td>MPa</td>
            </tr>
            <tr>
              <td>Faktor Pembebanan Lentur dan Aksial (β1)</td>
              <td>
                <input onChange={(e) => setB1(parseFloat(e.target.value))} />
              </td>
            </tr>
            <tr className="text-center">
              <td colSpan={3}>
                <Button onClick={() => keseimbangan()}>
                  Hitung Keseimbangan
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <Table>
          <tbody>
            <tr>
              <td>
                Perbandingan Luas Baja / Luas Beton Keseimbangan (ρ)
                <sub>balance</sub>)
              </td>
              <td>{pb}</td>
            </tr>
            <tr>
              <td>
                Perbandingan Luas Baja / Luas Beton Maximal (ρ <sub>max</sub>)
              </td>
              <td>{pmax}</td>
            </tr>
            <tr>
              <td>
                Perbandingan Luas Baja / Luas Beton Minimal (ρ <sub>min</sub>)
              </td>
              <td>{pmin}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      {show ? <Ultimit pmax={pmax} pmin={pmin} fy={fy} fc={fc} /> : ""}
    </>
  );
};
export default Plat;
